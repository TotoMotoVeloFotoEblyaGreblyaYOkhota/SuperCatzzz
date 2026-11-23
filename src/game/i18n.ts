import { GAME_TRANSLATIONS } from './levels_loc';

export type Lang = 'ru' | 'en' | 'es';

export const LANG_STORAGE_KEY = 'tower_cats_lang_v1';

export const LANG_OPTIONS: ReadonlyArray<{ id: Lang; short: string; native: string }> = [
  { id: 'ru', short: 'RU', native: 'Русский' },
  { id: 'en', short: 'EN', native: 'English' },
  { id: 'es', short: 'ES', native: 'Español' },
];

export function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'ru';
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'ru' || saved === 'en' || saved === 'es') {
      return saved;
    }
  } catch {
    // ignore storage errors
  }
  return 'ru';
}

let activeLang: Lang = detectInitialLang();

export function getCurrentLang(): Lang {
  return activeLang;
}

export function setCurrentLang(lang: Lang) {
  activeLang = lang;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore storage errors
    }
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
    document.title = UI_STRINGS[lang].pageTitle;
  }
}

export function nextLang(lang: Lang): Lang {
  if (lang === 'ru') return 'en';
  if (lang === 'en') return 'es';
  return 'ru';
}

export function t3(lang: Lang, ru: string, en: string, es: string): string {
  if (lang === 'en') return en;
  if (lang === 'es') return es;
  return ru;
}

export function translateGameText(ruText: string, lang: Lang = activeLang): string {
  if (!ruText || lang === 'ru') return ruText;
  return GAME_TRANSLATIONS[lang][ruText] ?? ruText;
}

export interface UiStrings {
  pageTitle: string;
  titleAlt: string;
  eyebrow: string;
  svgTitleTop: string;
  svgTitleSub: string;
  heroBeforeThomas: string;
  heroThomasName: string;
  heroMid: string;
  heroTorqName: string;
  heroAfterTorq: string;
  startEscape: string;
  continueChapter: (n: number) => string;
  chooseChapterBtn: string;
  chaptersHeading: string;
  startFromCh1: string;
  chapterWord: string;
  musicOnLabel: string;
  musicOffLabel: string;
  musicEnableTip: string;
  musicDisableTip: string;
  soundOnLabel: string;
  soundOffLabel: string;
  soundEnableTip: string;
  soundDisableTip: string;
  controlsHintLine: string;

  // HUD
  thomasSpeaker: string;
  torqSpeaker: string;
  dogSpeaker: string;
  hintWord: string;
  stepPlanWord: string;
  speakHintTip: string;
  closeHintTip: string;
  replaySpeechTip: string;
  dismissSpeechTip: string;
  thomasDockTip: string;
  torqDockTip: string;
  emptyPackTip: string;
  hintShowTip: string;
  hintPlanTip: string;
  hintHideTip: string;
  restartRoomTip: string;
  musicLoopEnableTip: string;
  musicLoopDisableTip: string;
  pauseTip: (levelId: number, title: string) => string;
  pauseAria: string;
  languageTip: (native: string, short: string) => string;
  spells: {
    telekinesis: string;
    enlarge: string;
    shrink: string;
    shadow: string;
  };
  skills: {
    paws: string;
    hack: string;
  };

  // Modals
  caughtDefaultTitle: string;
  retryRoom: string;
  toTitleScreen: string;
  chapterCleared: (levelId: number, timeStr: string) => string;
  nextChapter: string;
  replayRoom: string;
  allClearedBadge: string;
  victoryHeading: string;
  pauseHeading: string;
  pauseChapterLine: (levelId: number, title: string) => string;
  resumeGame: string;
  exitToMenu: string;
  languageLabel: string;

  // Runtime errors & renderer
  blockedPathError: string;
  unreachableMagicHint: string;
  barkText: string;
}

export const UI_STRINGS: Record<Lang, UiStrings> = {
  ru: {
    pageTitle: 'Коты Башни: Тень и Искра',
    titleAlt: 'Томас, Торквемада и спящий пёс Баскервиль в башне',
    eyebrow: 'Интерактивная сказка-головоломка · 10 глав',
    svgTitleTop: 'КОТЫ БАШНИ',
    svgTitleSub: 'ТЕНЬ И ИСКРА',
    heroBeforeThomas: 'Двое чёрных котов — маг ',
    heroThomasName: 'Томас',
    heroMid: ' и хакер ',
    heroTorqName: 'Торквемада',
    heroAfterTorq:
      ' — заперты на вершине древней башни, а у выхода храпит огромный кибер-пёс. Спуститесь на свободу через десять запутанных комнат!',
    startEscape: 'Начать побег',
    continueChapter: (n) => `Продолжить (Глава ${n})`,
    chooseChapterBtn: 'Выбор главы (1–10)',
    chaptersHeading: 'Главы башни (можно начать с любой)',
    startFromCh1: 'Начать с 1-й главы',
    chapterWord: 'Глава',
    musicOnLabel: 'Музыка 20 мин',
    musicOffLabel: 'Музыка выкл.',
    musicEnableTip: 'Включить музыку',
    musicDisableTip: 'Выключить музыку',
    soundOnLabel: 'Звук вкл.',
    soundOffLabel: 'Без звука',
    soundEnableTip: 'Включить звук',
    soundDisableTip: 'Выключить звук',
    controlsHintLine:
      'ЛКМ — идти и действовать · 1 / 2 или Tab — сменить кота · Q W E R — заклинания и навыки · H — подсказка',

    thomasSpeaker: 'Томас',
    torqSpeaker: 'Торквемада',
    dogSpeaker: 'Баскервиль',
    hintWord: 'Подсказка',
    stepPlanWord: 'Пошаговый план',
    speakHintTip: 'Озвучить подсказку',
    closeHintTip: 'Закрыть подсказку',
    replaySpeechTip: 'Повторить озвучку',
    dismissSpeechTip: 'Скрыть сообщение',
    thomasDockTip: 'Томас — Кот-маг (клавиша 1)',
    torqDockTip: 'Торквемада — Кот-хакер (клавиша 2)',
    emptyPackTip: 'Рюкзак пуст',
    hintShowTip: 'Подсказка (H)',
    hintPlanTip: 'Показать точный план (H)',
    hintHideTip: 'Скрыть подсказку (H)',
    restartRoomTip: 'Начать комнату заново',
    musicLoopEnableTip: 'Включить музыку (20-мин луп)',
    musicLoopDisableTip: 'Выключить музыку (20-мин луп)',
    pauseTip: (id, title) => `Пауза · Глава ${id}: ${title} (Esc)`,
    pauseAria: 'Пауза',
    languageTip: (native, short) => `Язык: ${native} (${short}) — нажми для смены`,
    spells: {
      telekinesis: 'Телекинез — двигает и поворачивает предметы магией (Q)',
      enlarge: 'Увеличить — делает предмет большим и тяжёлым (W)',
      shrink: 'Уменьшить — сжимает предметы и проходы (E)',
      shadow: 'Тень-прыжок — телепорт между теневыми пятнами (R)',
    },
    skills: {
      paws: 'Лапки — берёт и применяет предметы вручную (Q)',
      hack: 'Хакер-ток — чинит щитки и не боится электричества (W)',
    },

    caughtDefaultTitle: 'Ой, кусь!',
    retryRoom: 'Попробовать комнату заново',
    toTitleScreen: 'На главный экран',
    chapterCleared: (id, timeStr) =>
      `Глава ${String(id).padStart(2, '0')} пройдена · Время ${timeStr}`,
    nextChapter: 'Следующая глава',
    replayRoom: 'Переиграть комнату',
    allClearedBadge: 'Все 10 глав башни пройдены!',
    victoryHeading: 'Свобода под Звёздной Ночью!',
    pauseHeading: 'Пауза',
    pauseChapterLine: (id, title) => `Глава ${id}: ${title}`,
    resumeGame: 'Продолжить игру',
    exitToMenu: 'Выйти в меню',
    languageLabel: 'Язык игры',

    blockedPathError: 'Туда сейчас не пройти — дорогу перекрывает опасность или пропасть!',
    unreachableMagicHint: 'Мне туда не добраться! Может, Томас поможет магией?',
    barkText: '!! ГАВ !!',
  },

  en: {
    pageTitle: 'Tower Cats: Shadow & Spark',
    titleAlt: 'Thomas, Torquemada and the sleeping hound Baskerville in the tower',
    eyebrow: 'Interactive Fairytale Puzzle · 10 Chapters',
    svgTitleTop: 'TOWER CATS',
    svgTitleSub: 'SHADOW & SPARK',
    heroBeforeThomas: 'Two black cats — wizard ',
    heroThomasName: 'Thomas',
    heroMid: ' and hacker ',
    heroTorqName: 'Torquemada',
    heroAfterTorq:
      ' — are locked atop an ancient tower while a colossal cyber-hound snores by the gate. Escape to freedom through ten tricky rooms!',
    startEscape: 'Start Escape',
    continueChapter: (n) => `Continue (Chapter ${n})`,
    chooseChapterBtn: 'Select Chapter (1–10)',
    chaptersHeading: 'Tower Chapters (play any chapter)',
    startFromCh1: 'Start from Chapter 1',
    chapterWord: 'Chapter',
    musicOnLabel: 'Music 20 min',
    musicOffLabel: 'Music Off',
    musicEnableTip: 'Enable Music',
    musicDisableTip: 'Mute Music',
    soundOnLabel: 'Sound On',
    soundOffLabel: 'Muted',
    soundEnableTip: 'Unmute Sound',
    soundDisableTip: 'Mute Sound',
    controlsHintLine:
      'Left Click — move & interact · 1 / 2 or Tab — switch cat · Q W E R — spells & skills · H — hint',

    thomasSpeaker: 'Thomas',
    torqSpeaker: 'Torquemada',
    dogSpeaker: 'Baskerville',
    hintWord: 'Hint',
    stepPlanWord: 'Step-by-Step Plan',
    speakHintTip: 'Read hint aloud',
    closeHintTip: 'Close hint',
    replaySpeechTip: 'Replay voiceover',
    dismissSpeechTip: 'Hide message',
    thomasDockTip: 'Thomas — Mage Cat (key 1)',
    torqDockTip: 'Torquemada — Hacker Cat (key 2)',
    emptyPackTip: 'Backpack is empty',
    hintShowTip: 'Hint (H)',
    hintPlanTip: 'Show full walkthrough (H)',
    hintHideTip: 'Hide hint (H)',
    restartRoomTip: 'Restart room',
    musicLoopEnableTip: 'Enable music (20-min loop)',
    musicLoopDisableTip: 'Mute music (20-min loop)',
    pauseTip: (id, title) => `Pause · Chapter ${id}: ${title} (Esc)`,
    pauseAria: 'Pause',
    languageTip: (native, short) => `Language: ${native} (${short}) — click to switch`,
    spells: {
      telekinesis: 'Telekinesis — moves and turns objects with magic (Q)',
      enlarge: 'Enlarge — makes objects huge and heavy (W)',
      shrink: 'Shrink — compresses objects and blockers (E)',
      shadow: 'Shadow Hop — teleport between dark shadow spots (R)',
    },
    skills: {
      paws: 'Paws — pick up and use items by paw (Q)',
      hack: 'Hacker Spark — fix panels and harness live voltage (W)',
    },

    caughtDefaultTitle: 'Oops, Chomp!',
    retryRoom: 'Retry This Room',
    toTitleScreen: 'Main Menu',
    chapterCleared: (id, timeStr) =>
      `Chapter ${String(id).padStart(2, '0')} Cleared · Time ${timeStr}`,
    nextChapter: 'Next Chapter',
    replayRoom: 'Replay Room',
    allClearedBadge: 'All 10 tower chapters completed!',
    victoryHeading: 'Freedom Under the Starry Night!',
    pauseHeading: 'Paused',
    pauseChapterLine: (id, title) => `Chapter ${id}: ${title}`,
    resumeGame: 'Resume Game',
    exitToMenu: 'Back to Title',
    languageLabel: 'Language',

    blockedPathError: "Can't get over there yet — a hazard or chasm blocks the way!",
    unreachableMagicHint: "I can't reach that spot! Maybe Thomas can help with magic?",
    barkText: '!! WOOF !!',
  },

  es: {
    pageTitle: 'Gatos de la Torre: Sombra y Chispa',
    titleAlt: 'Tomás, Torquemada y el sabueso dormido Baskerville en la torre',
    eyebrow: 'Aventura de Puzles Interactiva · 10 Capítulos',
    svgTitleTop: 'GATOS DE LA TORRE',
    svgTitleSub: 'SOMBRA Y CHISPA',
    heroBeforeThomas: 'Dos gatos negros — el mago ',
    heroThomasName: 'Tomás',
    heroMid: ' y el hacker ',
    heroTorqName: 'Torquemada',
    heroAfterTorq:
      ' — están encerrados en lo alto de una torre antigua mientras un ciber-sabueso gigante ronca en la salida. ¡Escapa hacia la libertad por diez salas enrevesadas!',
    startEscape: 'Iniciar Fuga',
    continueChapter: (n) => `Continuar (Capítulo ${n})`,
    chooseChapterBtn: 'Elegir Capítulo (1–10)',
    chaptersHeading: 'Capítulos de la Torre (empieza cualquiera)',
    startFromCh1: 'Empezar en el Capítulo 1',
    chapterWord: 'Capítulo',
    musicOnLabel: 'Música 20 min',
    musicOffLabel: 'Música Apagada',
    musicEnableTip: 'Activar Música',
    musicDisableTip: 'Silenciar Música',
    soundOnLabel: 'Sonido Activo',
    soundOffLabel: 'Silenciado',
    soundEnableTip: 'Activar Sonido',
    soundDisableTip: 'Silenciar Sonido',
    controlsHintLine:
      'Clic izq. — moverse y actuar · 1 / 2 o Tab — cambiar de gato · Q W E R — hechizos y habilidades · H — pista',

    thomasSpeaker: 'Tomás',
    torqSpeaker: 'Torquemada',
    dogSpeaker: 'Baskerville',
    hintWord: 'Pista',
    stepPlanWord: 'Plan Paso a Paso',
    speakHintTip: 'Leer pista en voz alta',
    closeHintTip: 'Cerrar pista',
    replaySpeechTip: 'Repetir voz',
    dismissSpeechTip: 'Ocultar mensaje',
    thomasDockTip: 'Tomás — Gato Mago (tecla 1)',
    torqDockTip: 'Torquemada — Gato Hacker (tecla 2)',
    emptyPackTip: 'Mochila vacía',
    hintShowTip: 'Pista (H)',
    hintPlanTip: 'Ver solución paso a paso (H)',
    hintHideTip: 'Ocultar pista (H)',
    restartRoomTip: 'Reiniciar sala',
    musicLoopEnableTip: 'Activar música (bucle de 20 min)',
    musicLoopDisableTip: 'Silenciar música (bucle de 20 min)',
    pauseTip: (id, title) => `Pausa · Capítulo ${id}: ${title} (Esc)`,
    pauseAria: 'Pausa',
    languageTip: (native, short) => `Idioma: ${native} (${short}) — pulsa para cambiar`,
    spells: {
      telekinesis: 'Telequinesis — mueve y gira objetos con magia (Q)',
      enlarge: 'Agrandar — hace los objetos enormes y pesados (W)',
      shrink: 'Encoger — reduce objetos y obstáculos (E)',
      shadow: 'Salto Sombrío — teletransporte entre sombras oscuras (R)',
    },
    skills: {
      paws: 'Patitas — recoge y usa objetos manualmente (Q)',
      hack: 'Chispazo Hacker — repara paneles y domina la corriente (W)',
    },

    caughtDefaultTitle: '¡Uy, Mordisco!',
    retryRoom: 'Reintentar esta Sala',
    toTitleScreen: 'Menú Principal',
    chapterCleared: (id, timeStr) =>
      `Capítulo ${String(id).padStart(2, '0')} Superado · Tiempo ${timeStr}`,
    nextChapter: 'Siguiente Capítulo',
    replayRoom: 'Repetir Sala',
    allClearedBadge: '¡Los 10 capítulos de la torre superados!',
    victoryHeading: '¡Libertad Bajo la Noche Estrellada!',
    pauseHeading: 'Pausa',
    pauseChapterLine: (id, title) => `Capítulo ${id}: ${title}`,
    resumeGame: 'Continuar',
    exitToMenu: 'Volver al Menú',
    languageLabel: 'Idioma',

    blockedPathError: '¡No puedo pasar aún — un peligro o un abismo bloquea el camino!',
    unreachableMagicHint: '¡No llego hasta allí! ¿Quizá Tomás pueda ayudar con magia?',
    barkText: '!! GUAU !!',
  },
};
