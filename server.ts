import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type SpeakerId = 'thomas' | 'torquemada' | 'dog' | 'system';

interface VoiceProfile {
  voiceName: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  style: string;
}

const VOICE_PROFILES: Record<SpeakerId, VoiceProfile> = {
  thomas: {
    voiceName: 'Charon',
    style:
      'Expressive, calm, velvet-voiced Russian cartoon wizard cat speaking with slight theatrical mystique and playful wit',
  },
  torquemada: {
    voiceName: 'Puck',
    style:
      'Lively, energetic, witty young Russian cartoon gadget-hacker cat speaking briskly and cheerfully',
  },
  dog: {
    voiceName: 'Fenrir',
    style:
      'Deep, gruff, comical Russian cartoon watchdog hound speaking in a gravelly, exaggerated voice',
  },
  system: {
    voiceName: 'Zephyr',
    style:
      'Warm, expressive Russian fairytale narrator reading with theatrical storytelling clarity',
  },
};

const MAX_CACHE_ITEMS = 220;
const ttsCache = new Map<string, Buffer>();
const inFlight = new Map<string, Promise<Buffer>>();

let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

function setCachedWav(key: string, buf: Buffer) {
  if (ttsCache.size >= MAX_CACHE_ITEMS) {
    const oldestKey = ttsCache.keys().next().value;
    if (oldestKey) ttsCache.delete(oldestKey);
  }
  ttsCache.set(key, buf);
}

async function synthesizeSpeech(who: SpeakerId, text: string): Promise<Buffer> {
  const cacheKey = `${who}::${text}`;
  const cached = ttsCache.get(cacheKey);
  if (cached) return cached;

  const existing = inFlight.get(cacheKey);
  if (existing) return existing;

  const task = (async () => {
    const ai = getAiClient();
    if (!ai) {
      throw new Error('GEMINI_API_KEY_NOT_CONFIGURED');
    }

    const profile = VOICE_PROFILES[who] || VOICE_PROFILES.system;
    let lastError: unknown = null;

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash-lite-tts',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text,
                  speechMetadata: {
                    style: profile.style,
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: profile.voiceName },
              },
            },
          },
        });

        const base64Audio =
          response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
          throw new Error('EMPTY_AUDIO_RESPONSE');
        }
        const wavBuffer = Buffer.from(base64Audio, 'base64');
        setCachedWav(cacheKey, wavBuffer);
        return wavBuffer;
      } catch (err) {
        lastError = err;
        if (attempt === 0) {
          await new Promise((r) => setTimeout(r, 250));
        }
      }
    }

    throw lastError instanceof Error ? lastError : new Error('TTS_SYNTHESIS_FAILED');
  })();

  inFlight.set(cacheKey, task);
  try {
    return await task;
  } finally {
    inFlight.delete(cacheKey);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '16kb' }));

  app.post('/api/tts', async (req: Request, res: Response) => {
    try {
      const rawText = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
      if (!rawText) {
        res.status(400).json({ error: 'Текст для озвучки не задан.' });
        return;
      }
      const text = rawText.slice(0, 600);
      const rawWho = req.body?.who;
      const who: SpeakerId =
        rawWho === 'thomas' ||
        rawWho === 'torquemada' ||
        rawWho === 'dog' ||
        rawWho === 'system'
          ? rawWho
          : 'system';

      const wav = await synthesizeSpeech(who, text);
      res.setHeader('Content-Type', 'audio/wav');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(wav);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'TTS_ERROR';
      const status = msg === 'GEMINI_API_KEY_NOT_CONFIGURED' ? 503 : 502;
      res.status(status).json({ error: msg });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*path}', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
