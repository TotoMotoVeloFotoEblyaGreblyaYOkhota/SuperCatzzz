import { CatId } from './types';
import { getCurrentLang, Lang } from './i18n';
import { soundEngine } from './audio';

export type VoiceSpeaker = CatId | 'dog' | 'system';

const audioBlobUrlCache = new Map<string, string>();
let currentToken = 0;
let currentAudio: HTMLAudioElement | null = null;
let currentAbort: AbortController | null = null;
let speakingListener: ((isSpeaking: boolean) => void) | null = null;
let voiceMuted = false;
let voiceEnabled = true;

function notifySpeaking(active: boolean) {
  speakingListener?.(active);
}

function cleanSpeechText(raw: string): string {
  return raw.replace(/[«»]/g, '').replace(/\s+/g, ' ').trim();
}

function playFallbackGoblinChatter(who: VoiceSpeaker, text: string, token: number) {
  const ctx = soundEngine.ensureContext();
  if (!ctx || voiceMuted || !voiceEnabled) {
    notifySpeaking(false);
    return;
  }

  const baseFreq =
    who === 'thomas' ? 285 : who === 'torquemada' ? 470 : who === 'dog' ? 145 : 340;
  const syllables = Math.max(4, Math.min(10, Math.round(text.length / 10)));
  const start = ctx.currentTime;
  const stepDur = who === 'torquemada' ? 0.075 : who === 'dog' ? 0.11 : 0.09;

  for (let i = 0; i < syllables; i++) {
    const t = start + i * stepDur;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = who === 'dog' ? 'sawtooth' : who === 'thomas' ? 'triangle' : 'sine';
    const inflection = (i % 3 === 1 ? 1.16 : i % 2 === 0 ? 0.92 : 1.05);
    const f1 = baseFreq * inflection;
    const f2 = f1 * (i === syllables - 1 ? 0.85 : 1.08);
    osc.frequency.setValueAtTime(f1, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, f2), t + stepDur * 0.85);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(who === 'dog' ? 0.07 : 0.065, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + stepDur * 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + stepDur);
  }

  notifySpeaking(true);
  window.setTimeout(() => {
    if (currentToken === token) {
      notifySpeaking(false);
    }
  }, syllables * stepDur * 1000 + 80);
}

const SPEECH_LOCALE_TAG: Record<Lang, string> = {
  ru: 'ru-RU',
  en: 'en-US',
  es: 'es-ES',
};

function tryBrowserSpeech(
  who: VoiceSpeaker,
  text: string,
  lang: Lang,
  token: number
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(lang));
  if (!matchedVoice) {
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = matchedVoice;
    utter.lang = SPEECH_LOCALE_TAG[lang];
    utter.pitch = who === 'thomas' ? 0.92 : who === 'torquemada' ? 1.2 : who === 'dog' ? 0.72 : 1.0;
    utter.rate = who === 'torquemada' ? 1.08 : who === 'dog' ? 0.92 : 1.0;
    utter.volume = 0.92;
    utter.onstart = () => {
      if (currentToken === token) notifySpeaking(true);
    };
    utter.onend = () => {
      if (currentToken === token) notifySpeaking(false);
    };
    utter.onerror = () => {
      if (currentToken === token) notifySpeaking(false);
    };
    window.speechSynthesis.speak(utter);
    return true;
  } catch {
    return false;
  }
}

export const voiceEngine = {
  setMuted(muted: boolean) {
    voiceMuted = muted;
    if (muted) {
      this.stop();
    }
  },

  setEnabled(enabled: boolean) {
    voiceEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  },

  isEnabled(): boolean {
    return voiceEnabled;
  },

  onSpeakingChange(cb: ((speaking: boolean) => void) | null) {
    speakingListener = cb;
  },

  stop() {
    currentToken++;
    if (currentAbort) {
      currentAbort.abort();
      currentAbort = null;
    }
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = '';
      currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore speechSynthesis errors
      }
    }
    notifySpeaking(false);
  },

  async speak(who: VoiceSpeaker, rawText: string, lang: Lang = getCurrentLang()) {
    if (voiceMuted || !voiceEnabled) return;
    const text = cleanSpeechText(rawText);
    if (!text) return;

    this.stop();
    const token = ++currentToken;

    const cacheKey = `${lang}::${who}::${text}`;
    const cachedUrl = audioBlobUrlCache.get(cacheKey);
    if (cachedUrl) {
      this.playAudioUrl(cachedUrl, token);
      return;
    }

    const controller = new AbortController();
    currentAbort = controller;

    try {
      const resp = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ who, text, lang }),
        signal: controller.signal,
      });

      if (token !== currentToken || voiceMuted || !voiceEnabled) return;

      if (!resp.ok) {
        if (!tryBrowserSpeech(who, text, lang, token)) {
          playFallbackGoblinChatter(who, text, token);
        }
        return;
      }

      const blob = await resp.blob();
      if (token !== currentToken || voiceMuted || !voiceEnabled) return;

      const url = URL.createObjectURL(blob);
      audioBlobUrlCache.set(cacheKey, url);
      this.playAudioUrl(url, token);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      if (token !== currentToken || voiceMuted || !voiceEnabled) return;
      if (!tryBrowserSpeech(who, text, lang, token)) {
        playFallbackGoblinChatter(who, text, token);
      }
    }
  },

  playAudioUrl(url: string, token: number) {
    if (token !== currentToken || voiceMuted || !voiceEnabled) return;
    const audio = new Audio(url);
    audio.volume = 0.94;
    currentAudio = audio;

    audio.onplay = () => {
      if (currentToken === token) notifySpeaking(true);
    };
    audio.onended = () => {
      if (currentToken === token) {
        currentAudio = null;
        notifySpeaking(false);
      }
    };
    audio.onerror = () => {
      if (currentToken === token) {
        currentAudio = null;
        notifySpeaking(false);
      }
    };

    audio.play().catch(() => {
      // Browser autoplay restriction before first user gesture
      if (currentToken === token) {
        currentAudio = null;
        notifySpeaking(false);
      }
    });
  },
};
