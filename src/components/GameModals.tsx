import React, { useEffect, useRef } from 'react';
import { RotateCcw, ArrowRight, Home, Play, Trophy, AlertTriangle } from 'lucide-react';
import { GameScreen } from '../game/types';
import { getSprite } from '../game/sprites';

interface GameModalsProps {
  screen: GameScreen;
  levelId: number;
  levelTitle: string;
  modalTitle: string;
  modalMessage: string;
  elapsedSeconds: number;
  onResume: () => void;
  onRetryLevel: () => void;
  onNextLevel: () => void;
  onGoTitle: () => void;
}

const AngryDogPortrait: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const sp = getSprite('dog_angry');
    const c = canvasRef.current;
    if (!sp || !c) return;
    const ctx = c.getContext('2d')!;
    ctx.clearRect(0, 0, c.width, c.height);
    const scale = Math.min(c.width / sp.width, c.height / sp.height);
    const dw = sp.width * scale;
    const dh = sp.height * scale;
    ctx.drawImage(sp, (c.width - dw) * 0.5, (c.height - dh) * 0.5, dw, dh);
  }, []);

  if (!getSprite('dog_angry')) {
    return (
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#451423] border border-[#F43F5E]/60 flex items-center justify-center">
        <AlertTriangle className="w-7 h-7 text-[#FB7185]" />
      </div>
    );
  }
  return <canvas ref={canvasRef} width={160} height={115} className="mx-auto mb-3" />;
};

export const GameModals: React.FC<GameModalsProps> = ({
  screen,
  levelId,
  levelTitle,
  modalTitle,
  modalMessage,
  elapsedSeconds,
  onResume,
  onRetryLevel,
  onNextLevel,
  onGoTitle,
}) => {
  if (screen === 'TITLE' || screen === 'PLAYING') return null;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#040814]/82 p-4">
      <div className="w-full max-w-md bg-[#0E162E] border border-[#2D3E6E] rounded-2xl p-7 shadow-2xl text-center">
        {screen === 'CAUGHT' && (
          <>
            <AngryDogPortrait />
            <h2 className="font-display text-3xl font-bold text-[#FB7185] mb-2">
              {modalTitle || 'Ой, кусь!'}
            </h2>
            <p className="text-sm leading-relaxed text-[#CBD5E1] mb-6">{modalMessage}</p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={onRetryLevel}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#F5B82E] hover:bg-[#FDE047] text-[#070D1F] font-bold rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Попробовать комнату заново</span>
              </button>
              <button
                onClick={onGoTitle}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-5 bg-[#162140] hover:bg-[#1F2E57] text-[#CBD5E1] text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>На главный экран</span>
              </button>
            </div>
          </>
        )}

        {screen === 'LEVEL_WIN' && (
          <>
            <div className="text-xs font-mono-tabular font-bold text-[#00E5FF] mb-1">
              Глава {String(levelId).padStart(2, '0')} пройдена · Время {formatTime(elapsedSeconds)}
            </div>
            <h2 className="font-display text-3xl font-bold text-[#F5B82E] mb-3">{levelTitle}</h2>
            <p className="text-sm leading-relaxed text-[#E2E8F0] mb-6">{modalMessage}</p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={onNextLevel}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#F5B82E] hover:bg-[#FDE047] text-[#070D1F] font-bold rounded-lg transition-colors cursor-pointer"
              >
                <span>Следующая глава</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onRetryLevel}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-5 bg-[#162140] hover:bg-[#1F2E57] text-[#CBD5E1] text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Переиграть комнату</span>
              </button>
            </div>
          </>
        )}

        {screen === 'GAME_VICTORY' && (
          <>
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#36280B] border border-[#F5B82E]/70 flex items-center justify-center">
              <Trophy className="w-7 h-7 text-[#FDE047]" />
            </div>
            <div className="text-xs font-mono-tabular text-[#00E5FF] mb-1">
              Все 10 глав башни пройдены!
            </div>
            <h2 className="font-display text-4xl font-bold text-[#F5B82E] mb-3">
              Свобода под Звёздной Ночью!
            </h2>
            <p className="text-sm leading-relaxed text-[#E2E8F0] mb-6">{modalMessage}</p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={onGoTitle}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#F5B82E] hover:bg-[#FDE047] text-[#070D1F] font-bold rounded-lg transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>На главный экран</span>
              </button>
            </div>
          </>
        )}

        {screen === 'PAUSED' && (
          <>
            <h2 className="font-display text-3xl font-bold text-[#F5B82E] mb-2">Пауза</h2>
            <p className="text-xs text-[#94A3B8] mb-6">
              Глава {levelId}: {levelTitle}
            </p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={onResume}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#F5B82E] hover:bg-[#FDE047] text-[#070D1F] font-bold rounded-lg transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Продолжить игру</span>
              </button>
              <button
                onClick={onRetryLevel}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-5 bg-[#162140] hover:bg-[#1F2E57] text-[#E2E8F0] text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Начать комнату заново</span>
              </button>
              <button
                onClick={onGoTitle}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-5 bg-[#162140] hover:bg-[#1F2E57] text-[#CBD5E1] text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Выйти в меню</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
