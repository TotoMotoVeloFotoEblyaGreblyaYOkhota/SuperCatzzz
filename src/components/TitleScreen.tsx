import React, { useEffect, useState } from 'react';
import { Play, Layers, Volume2, VolumeX, Music, ChevronRight, Lock } from 'lucide-react';
import { LEVELS } from '../game/levels';

interface TitleScreenProps {
  unlockedLevel: number;
  isMuted: boolean;
  isMusicMuted?: boolean;
  onToggleMute: () => void;
  onToggleMusic?: () => void;
  onStartLevel: (levelId: number) => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  unlockedLevel,
  isMuted,
  isMusicMuted = false,
  onToggleMute,
  onToggleMusic,
  onStartLevel,
}) => {
  const [showChapters, setShowChapters] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onStartLevel(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onStartLevel]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070D1F] text-[#F4EFE6]">
      {/* Animated Key-Art Backdrop with Van Gogh + Gaudí + Cyberpunk fallback */}
      {!imgError ? (
        <img
          src="/src/assets/images/title_tower_cats_1795460610108.jpg"
          alt="Томас, Торквемада и спящий пёс Баскервиль в башне"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover animate-slow-pan pointer-events-none"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 75% 40%, #1C3F82 0%, #0B1538 45%, #070D1F 100%)',
          }}
        />
      )}

      {/* Measured contrast scrim on left 45% for calm negative space */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060B1A]/95 via-[#070E23]/78 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050916]/90 to-transparent pointer-events-none" />

      {/* Top right audio & music toggles */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2.5">
        {onToggleMusic && (
          <button
            onClick={onToggleMusic}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#E2E8F0] bg-[#0F172A]/80 border border-[#334155] rounded-lg hover:border-[#C084FC] transition-colors cursor-pointer"
            title={isMusicMuted ? 'Включить музыку' : 'Выключить музыку'}
          >
            <Music className={`w-4 h-4 ${isMusicMuted || isMuted ? 'text-[#94A3B8] opacity-60' : 'text-[#C084FC]'}`} />
            <span className="whitespace-nowrap">{isMusicMuted ? 'Музыка выкл.' : 'Музыка 20 мин'}</span>
          </button>
        )}
        <button
          onClick={onToggleMute}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#E2E8F0] bg-[#0F172A]/80 border border-[#334155] rounded-lg hover:border-[#F5B82E] transition-colors cursor-pointer"
          title={isMuted ? 'Включить звук' : 'Выключить звук'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#94A3B8]" /> : <Volume2 className="w-4 h-4 text-[#F5B82E]" />}
          <span className="whitespace-nowrap">{isMuted ? 'Без звука' : 'Звук вкл.'}</span>
        </button>
      </div>

      {/* Main Hero Lockup */}
      <div className="relative z-10 h-full flex flex-col justify-between px-8 md:px-14 py-10 max-w-2xl">
        <div className="pt-4">
          <p className="text-xs tracking-widest text-[#F5B82E] font-semibold uppercase mb-4">
            Интерактивная сказка-головоломка · 10 глав
          </p>

          {/* Bespoke inline SVG Title Lockup */}
          <svg
            viewBox="0 0 540 165"
            className="w-full max-w-[500px] h-auto mb-5 drop-shadow-[0_6px_24px_rgba(0,0,0,0.75)]"
            aria-label="Коты Башни: Тень и Искра"
          >
            <defs>
              <linearGradient id="goldTitle" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="55%" stopColor="#F5B82E" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
              <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#F5B82E" />
              </linearGradient>
            </defs>
            {/* Gaudí organic arch ornament */}
            <path
              d="M12 24 Q 140 -6, 270 18 T 515 16"
              fill="none"
              stroke="url(#cyanLine)"
              strokeWidth="2.5"
              opacity="0.75"
            />
            <text
              x="8"
              y="88"
              fill="url(#goldTitle)"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontWeight="700"
              fontSize="68"
              letterSpacing="1"
            >
              КОТЫ БАШНИ
            </text>
            <text
              x="12"
              y="134"
              fill="#E2E8F0"
              fontFamily="Manrope, sans-serif"
              fontWeight="600"
              fontSize="24"
              letterSpacing="4"
            >
              ТЕНЬ И ИСКРА
            </text>
            <path
              d="M10 152 Q 170 162, 340 150"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="2"
              opacity="0.6"
            />
          </svg>

          <p className="text-[15px] leading-relaxed text-[#CBD5E1] max-w-lg mb-8">
            Двое чёрных котов — маг <span className="text-[#C084FC] font-semibold">Томас</span> и хакер{' '}
            <span className="text-[#38BDF8] font-semibold">Торквемада</span> — заперты на вершине
            древней башни, а у выхода храпит огромный кибер-пёс. Спуститесь на свободу через
            десять запутанных комнат!
          </p>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onStartLevel(unlockedLevel > 1 ? unlockedLevel : 1)}
              className="flex items-center gap-3 px-7 py-3.5 text-base font-bold text-[#070D1F] bg-[#F5B82E] hover:bg-[#FDE047] rounded-lg shadow-[0_0_28px_rgba(245,184,46,0.35)] transition-all cursor-pointer whitespace-nowrap"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{unlockedLevel > 1 ? `Продолжить (Глава ${unlockedLevel})` : 'Начать побег'}</span>
            </button>

            <button
              onClick={() => setShowChapters((v) => !v)}
              className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#E2E8F0] bg-[#0F172A]/85 hover:bg-[#1E293B] border border-[#334155] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Layers className="w-4 h-4 text-[#00E5FF]" />
              <span>Выбор главы (1–10)</span>
            </button>
          </div>

          {/* Chapter Selector Drawer */}
          {showChapters && (
            <div className="mt-5 p-4 bg-[#0B1226]/95 border border-[#2A3B66] rounded-xl max-w-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#94A3B8]">
                  Главы башни (можно начать с любой)
                </span>
                {unlockedLevel > 1 && (
                  <button
                    onClick={() => onStartLevel(1)}
                    className="text-xs text-[#F5B82E] hover:underline cursor-pointer"
                  >
                    Начать с 1-й главы
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {LEVELS.map((lvl) => {
                  const isUnlocked = lvl.id <= unlockedLevel;
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => onStartLevel(lvl.id)}
                      className="flex items-center justify-between gap-2 px-3 py-2 text-left rounded-lg bg-[#131E3A] hover:bg-[#1D2D54] border border-[#283863] hover:border-[#F5B82E]/60 transition-colors cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="text-[11px] font-mono-tabular text-[#00E5FF]">
                          Глава {String(lvl.id).padStart(2, '0')}
                        </div>
                        <div className="text-xs font-semibold text-[#F1F5F9] truncate">
                          {lvl.title}
                        </div>
                      </div>
                      {isUnlocked ? (
                        <ChevronRight className="w-4 h-4 text-[#F5B82E] shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Single flat control-hint line */}
        <div className="text-xs text-[#94A3B8] tracking-wide">
          ЛКМ — идти и действовать · 1 / 2 или Tab — сменить кота · Q W E R — заклинания и навыки · H — подсказка
        </div>
      </div>
    </div>
  );
};
