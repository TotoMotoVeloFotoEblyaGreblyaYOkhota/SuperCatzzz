import { getCurrentLang, t3, translateGameText } from './i18n';
import { ActionContext, LevelDefinition } from './types';

function defaultWrongReaction(ctx: ActionContext) {
  const { cat, spell, skill, itemId, hotspot, say, playSound } = ctx;
  const lang = getCurrentLang();
  const hsName = translateGameText(hotspot.name, lang);

  if (cat === 'thomas') {
    if (spell === 'shadow') {
      playSound('error');
      say('thomas', 'Туда через тень не прыгнуть — мне нужна тёмная тень-портал!');
      return;
    }
    if (!hotspot.remoteMagic && hotspot.zoneId !== ctx.state.thomas.zoneId) {
      playSound('error');
      say('thomas', 'Свинцовая преграда мешает магии! Надо прыгнуть в тень поближе.');
      return;
    }
    if (spell === 'enlarge') {
      playSound('error');
      say(
        'thomas',
        t3(
          lang,
          `Увеличивать «${hsName}» сейчас ни к чему — только место займёт.`,
          `No point enlarging “${hsName}” right now — it’ll only hog space.`,
          `No tiene sentido agrandar «${hsName}» ahora — solo ocupará espacio.`
        )
      );
    } else if (spell === 'shrink') {
      playSound('error');
      say(
        'thomas',
        t3(
          lang,
          `Не думаю, что сжатый «${hsName}» нам поможет.`,
          `I doubt a tiny “${hsName}” will do us any good.`,
          `No creo que encoger «${hsName}» nos ayude ahora.`
        )
      );
    } else {
      playSound('error');
      say(
        'thomas',
        t3(
          lang,
          'Телекинез тут бессилен. Может, стоит попробовать другое заклинание или позвать Торквемаду?',
          'Telekinesis won’t help here. Maybe try another spell or call Torquemada?',
          'La telequinesis no basta aquí. ¿Probamos otro hechizo o llamamos a Torquemada?'
        )
      );
    }
  } else {
    if (itemId) {
      playSound('error');
      say(
        'torquemada',
        t3(
          lang,
          `Этот предмет к «${hsName}» явно не подходит!`,
          `That item clearly doesn’t fit “${hsName}”!`,
          `¡Ese objeto claramente no encaja con «${hsName}»!`
        )
      );
      return;
    }
    if (skill === 'hack') {
      playSound('error');
      say(
        'torquemada',
        t3(
          lang,
          'Здесь нет электроники — мой хакер-разряд тут без дела.',
          'No electronics in here — my Hacker Spark has nothing to zap.',
          'Aquí no hay electrónica — mi Chispazo Hacker no sirve de nada.'
        )
      );
    } else {
      playSound('error');
      say(
        'torquemada',
        t3(
          lang,
          `Трогаю «${hsName}» лапками... Ничего не происходит, мур.`,
          `Poking “${hsName}” with my paws... Nothing happens, purr.`,
          `Toco «${hsName}» con mis patitas... No pasa nada, miau.`
        )
      );
    }
  }
}

export const LEVELS: LevelDefinition[] = [
  // ============================================================================
  // LEVEL 1: Самая верхняя камера («Сон сторожевого пса»)
  // ============================================================================
  {
    id: 1,
    title: 'Камера под крышей',
    subtitle: 'Уровень 1 · Сон сторожевого пса',
    introQuote: '«Мы в самой верхней камере башни! У двери храпит кибер-пёс Баскервиль — один лишний звон, и он откусит нам хвосты!»',
    winQuote: 'Ключ провернулся бесшумно! Баскервиль сладко спит в наушниках, а коты проскальзывают на лестницу.',
    theme: {
      skyTop: '#081233',
      skyMid: '#18346E',
      wallBase: '#1C223B',
      wallStroke: '#2E3B63',
      mosaicColors: ['#E5A93B', '#257996', '#D45D3A', '#41A37B'],
      neonPrimary: '#00E5FF',
      neonSecondary: '#F5B82E',
      floorColor: '#252B45',
      archStyle: 'tower',
    },
    walkZones: [
      { id: 'main', minX: 90, maxX: 835, y: 638, minY: 595, maxY: 675 },
      { id: 'cage', minX: 95, maxX: 245, y: 268, minY: 260, maxY: 278 },
      { id: 'door_zone', minX: 835, maxX: 1150, y: 638, minY: 595, maxY: 675, requiresFlag: 'dog_lullaby' },
    ],
    zoneLinks: [{ from: 'main', to: 'door_zone', flag: 'dog_lullaby' }],
    thomasStart: { x: 255, y: 638, zoneId: 'main' },
    torqStart: { x: 465, y: 638, zoneId: 'main' },
    initialFlags: {
      pillow_big: false,
      key_dropped: false,
      dog_lullaby: false,
      key_inserted: false,
    },
    initialHotspots: [
      {
        id: 'shadow_left',
        name: 'Глубокая тень под аркой',
        visual: 'shadow_pad',
        x: 115,
        y: 575,
        w: 110,
        h: 75,
        zoneId: 'main',
        remoteMagic: true,
        shadowDest: { zoneId: 'cage', x: 155, y: 268 },
      },
      {
        id: 'shadow_cage',
        name: 'Тень за решёткой',
        visual: 'shadow_pad',
        x: 100,
        y: 205,
        w: 95,
        h: 75,
        zoneId: 'cage',
        remoteMagic: true,
        shadowDest: { zoneId: 'main', x: 170, y: 638 },
      },
      {
        id: 'key_ledge',
        name: 'Тяжёлый ключ за решёткой',
        visual: 'key',
        x: 185,
        y: 205,
        w: 70,
        h: 65,
        zoneId: 'cage',
        remoteMagic: false,
      },
      {
        id: 'pillow',
        name: 'Маленькая подушка',
        visual: 'pillow',
        x: 345,
        y: 585,
        w: 95,
        h: 65,
        zoneId: 'main',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'key_floor',
        name: 'Ключ на подушке',
        visual: 'key',
        x: 360,
        y: 565,
        w: 70,
        h: 65,
        zoneId: 'main',
        hidden: true,
        remoteMagic: true,
      },
      {
        id: 'panel',
        name: 'Неоновый аудио-щиток',
        visual: 'panel',
        x: 735,
        y: 435,
        w: 85,
        h: 105,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'dog',
        name: 'Спящий пёс Баскервиль',
        visual: 'dog',
        x: 845,
        y: 540,
        w: 175,
        h: 115,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'door',
        name: 'Тяжёлая дверь с замком',
        visual: 'door',
        x: 1085,
        y: 335,
        w: 120,
        h: 270,
        zoneId: 'door_zone',
        remoteMagic: true,
      },
    ],
    hints: [
      'Томас может увеличить подушку, прыгнуть в тень за решётку и сбросить ключ без шума. А Торквемада не боится тока в аудио-щитке!',
      '1) Томас: «Увеличение» на Подушку. 2) Томас: «Тень-прыжок» в левую тень, затем «Телекинез» на Ключ. 3) Томас: «Тень-прыжок» обратно. 4) Торквемада: «Лапки» на Ключ, затем «Хакер-ток» на Аудио-щиток. 5) Торквемада вставляет Ключ в Дверь, а Томас крутит его «Телекинезом»!',
    ],
    onInteract: (ctx) => {
      const { cat, spell, skill, itemId, hotspot, state, addItem, removeItem, say, spawnParticles, spawnBeam, spawnFlight, triggerCaught, triggerWin, playSound } = ctx;
      const thomas = state.thomas;

      // Shadow teleport
      if (cat === 'thomas' && spell === 'shadow' && hotspot.shadowDest) {
        playSound('shadow');
        spawnParticles(thomas.x, thomas.y - 30, '#A855F7', 'star', 16);
        thomas.zoneId = hotspot.shadowDest.zoneId;
        thomas.x = hotspot.shadowDest.x;
        thomas.y = hotspot.shadowDest.y;
        thomas.targetX = thomas.x;
        thomas.targetY = thomas.y;
        thomas.state = 'shadow_in';
        thomas.stateTimer = 0.45;
        spawnParticles(thomas.x, thomas.y - 30, '#A855F7', 'star', 18);
        say('thomas', thomas.zoneId === 'cage' ? 'Шмыг из тени в тень — и я за решёткой!' : 'Обратно в главный зал!');
        return;
      }

      // Pillow enlarge/shrink
      if (hotspot.id === 'pillow') {
        if (cat === 'thomas' && spell === 'enlarge') {
          if (hotspot.sizeState === 'large') {
            say('thomas', 'Подушка уже размером с королевскую перину!');
            return;
          }
          hotspot.sizeState = 'large';
          hotspot.name = 'Огромная мягкая перина';
          state.flags.pillow_big = true;
          playSound('enlarge');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 30, '#F5B82E');
          spawnParticles(hotspot.x + 45, hotspot.y + 30, '#F5B82E', 'star', 18);
          say('thomas', 'Пух-магия! Теперь даже наковальня упадёт бесшумно!');
          return;
        }
        if (cat === 'thomas' && spell === 'shrink') {
          hotspot.sizeState = 'small';
          state.flags.pillow_big = false;
          playSound('shrink');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 30, '#38BDF8');
          say('thomas', 'Ой, скукожилась до мышиной подушечки.');
          return;
        }
      }

      // Key on ledge inside cage
      if (hotspot.id === 'key_ledge') {
        if (cat === 'thomas') {
          if (thomas.zoneId !== 'cage') {
            playSound('error');
            say('thomas', 'Свинцовая решётка глушит чары! Надо попасть внутрь через тень.');
            return;
          }
          if (spell === 'telekinesis') {
            playSound('telekinesis');
            spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 35, hotspot.y + 35, '#C084FC');
            if (!state.flags.pillow_big) {
              playSound('dog_wake');
              say('dog', 'БРЯК!! ГАВ-ТРЕВОГА! КТО ГРЕМИТ?!');
              triggerCaught('Бряк! Пёс проснулся!', 'Тяжёлый ключ с грохотом упал на каменный пол! Надо было сначала увеличить подушку внизу.');
              return;
            }
            hotspot.hidden = true;
            const kf = state.hotspots.find((h) => h.id === 'key_floor');
            state.flags.key_dropped = true;
            spawnFlight({
              spriteKey: 'prop_key',
              fromX: hotspot.x + 35,
              fromY: hotspot.y + 35,
              toX: 395,
              toY: 595,
              duration: 0.72,
              arcHeight: 45,
              scaleFrom: 0.9,
              scaleTo: 1.0,
              spin: 5,
              onArrive: () => {
                if (kf) kf.hidden = false;
                spawnParticles(395, 600, '#F5B82E', 'dust', 16);
              },
            });
            say('thomas', 'Мягко приземлился на перину! Пёс даже ухом не повёл!');
            return;
          }
        }
      }

      // Key on floor
      if (hotspot.id === 'key_floor' && !hotspot.hidden) {
        if (cat === 'torquemada' && skill === 'paws' && !itemId) {
          hotspot.hidden = true;
          playSound('pickup');
          addItem({
            id: 'tower_key',
            name: 'Тяжёлый ключ',
            description: 'Массивный бронзовый ключ от двери камеры',
            icon: 'key',
          });
          spawnParticles(hotspot.x + 30, hotspot.y + 30, '#F5B82E', 'star', 10);
          say('torquemada', 'Хвать лапками! Теперь ключ у меня.');
          return;
        }
        if (cat === 'thomas') {
          say('thomas', 'Я маг, железки лапами не таскаю — пусть Торквемада возьмёт!');
          return;
        }
      }

      // Panel hack
      if (hotspot.id === 'panel') {
        if (cat === 'torquemada' && skill === 'hack') {
          if (state.flags.dog_lullaby) {
            say('torquemada', 'Колыбельная уже играет на всю громкость с шумоподавлением!');
            return;
          }
          playSound('hack');
          state.flags.dog_lullaby = true;
          hotspot.active = true;
          state.torq.state = 'shock';
          state.torq.stateTimer = 0.5;
          const dogHs = state.hotspots.find((h) => h.id === 'dog');
          if (dogHs) {
            dogHs.active = true;
            dogHs.name = 'Крепко спящий пёс (в наушниках)';
          }
          spawnParticles(hotspot.x + 40, hotspot.y + 45, '#00E5FF', 'spark', 20);
          spawnParticles(915, 480, '#A855F7', 'note', 10);
          say('torquemada', 'Мр-р-р, 220 Вольт бодрят! Врубил псу голо-колыбельную на уши!');
          return;
        }
        if (cat === 'torquemada' && skill === 'paws') {
          playSound('strain');
          say('torquemada', 'Тут оголённый ток! Надо использовать мой «Хакер-ток», а не просто тыкать лапкой.');
          return;
        }
      }

      // Dog interaction
      if (hotspot.id === 'dog') {
        if (!state.flags.dog_lullaby) {
          if (cat === 'thomas' && spell === 'telekinesis') {
            playSound('dog_wake');
            triggerCaught('Кусь за хвост!', 'Ты пощекотал Баскервиля телекинезом! Он мгновенно проснулся и погнался за котами.');
            return;
          }
          playSound('dog_wake');
          triggerCaught('Разбудили зверя!', 'Нельзя подходить к сторожевому псу, пока он слышит каждый шорох!');
          return;
        } else {
          playSound('meow_torq');
          say('torquemada', 'Храпит как трактор под «Колыбельной звёздной ночи»!');
          return;
        }
      }

      // Door interaction
      if (hotspot.id === 'door') {
        if (cat === 'torquemada' && itemId === 'tower_key') {
          removeItem('tower_key');
          state.flags.key_inserted = true;
          hotspot.locked = false;
          state.torq.state = 'strain';
          state.torq.stateTimer = 0.65;
          playSound('strain');
          say('torquemada', 'Ключ вставил!.. Уф-ф, не хватает сил провернуть! Томас, крути телекинезом!');
          return;
        }
        if (cat === 'torquemada' && skill === 'paws' && !itemId) {
          if (!state.flags.key_inserted) {
            playSound('error');
            say('torquemada', 'Заперто! Сначала нужен ключ.');
          } else {
            state.torq.state = 'strain';
            state.torq.stateTimer = 0.6;
            playSound('strain');
            say('torquemada', 'Крях-пых! Замок заржавел намертво — без магии Томаса не провернуть!');
          }
          return;
        }
        if (cat === 'thomas' && spell === 'telekinesis') {
          if (!state.flags.key_inserted) {
            playSound('error');
            say('thomas', 'Нечего поворачивать — Торквемада ещё не вставил ключ в замочную скважину!');
            return;
          }
          if (!state.flags.dog_lullaby) {
            playSound('dog_wake');
            triggerCaught('Щелчок разбудил пса!', 'Замок громко щёлкнул прямо над ухом Баскервиля! Сначала усыпи его аудио-щитком.');
            return;
          }
          playSound('unlock');
          hotspot.active = true;
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 40, hotspot.y + 115, '#F5B82E');
          spawnParticles(hotspot.x + 40, hotspot.y + 115, '#F5B82E', 'star', 24);
          triggerWin(LEVELS[0].winQuote);
          return;
        }
      }

      defaultWrongReaction(ctx);
    },
  },

  // ============================================================================
  // LEVEL 2: Мастерская Алхимика-Технаря («Искра и Колба»)
  // ============================================================================
  {
    id: 2,
    title: 'Мастерская Алхимика',
    subtitle: 'Уровень 2 · Искра и Колба',
    introQuote: '«Внизу шипит неоновая кислота, а мост поднят гигантской гирей. Нужен ток и магия!»',
    winQuote: 'Мост с лязгом опустился над кислотным рвом, и двери лифта гостеприимно распахнулись.',
    theme: {
      skyTop: '#0A1628',
      skyMid: '#133C4B',
      wallBase: '#192935',
      wallStroke: '#285266',
      mosaicColors: ['#00E5FF', '#F5B82E', '#7EE081', '#FF5E7E'],
      neonPrimary: '#00E5FF',
      neonSecondary: '#7EE081',
      floorColor: '#22323D',
      archStyle: 'lab',
    },
    walkZones: [
      { id: 'left', minX: 110, maxX: 465, y: 615, minY: 580, maxY: 655 },
      { id: 'right', minX: 775, maxX: 1165, y: 615, minY: 580, maxY: 655 },
    ],
    zoneLinks: [{ from: 'left', to: 'right', flag: 'bridge_down' }],
    thomasStart: { x: 205, y: 618, zoneId: 'left' },
    torqStart: { x: 350, y: 618, zoneId: 'left' },
    initialFlags: {
      crate_opened: false,
      fuse_in: false,
      power_on: false,
      weight_small: false,
      bridge_down: false,
    },
    initialHotspots: [
      {
        id: 'shadow_l',
        name: 'Тень под столом',
        visual: 'shadow_pad',
        x: 105,
        y: 565,
        w: 105,
        h: 75,
        zoneId: 'left',
        remoteMagic: true,
        shadowDest: { zoneId: 'right', x: 825, y: 615 },
      },
      {
        id: 'shadow_r',
        name: 'Тень у колбы',
        visual: 'shadow_pad',
        x: 785,
        y: 565,
        w: 105,
        h: 75,
        zoneId: 'right',
        remoteMagic: true,
        shadowDest: { zoneId: 'left', x: 165, y: 615 },
      },
      {
        id: 'generator',
        name: 'Генератор лебёдки',
        visual: 'generator',
        x: 225,
        y: 440,
        w: 100,
        h: 130,
        zoneId: 'left',
        remoteMagic: true,
      },
      {
        id: 'cable',
        name: 'Оголённый силовой кабель',
        visual: 'cable',
        x: 385,
        y: 455,
        w: 80,
        h: 110,
        zoneId: 'left',
        remoteMagic: true,
      },
      {
        id: 'fuse_floor',
        name: 'Неоновый предохранитель',
        visual: 'fuse',
        x: 330,
        y: 565,
        w: 65,
        h: 60,
        zoneId: 'left',
        hidden: true,
        remoteMagic: true,
      },
      {
        id: 'counterweight',
        name: 'Свинцовый противовес',
        visual: 'counterweight',
        x: 560,
        y: 230,
        w: 110,
        h: 120,
        zoneId: 'left',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'bridge',
        name: 'Подъёмный мост',
        visual: 'bridge',
        x: 475,
        y: 565,
        w: 295,
        h: 75,
        zoneId: 'left',
        remoteMagic: true,
      },
      {
        id: 'crate',
        name: 'Пневмо-ящик с деталью',
        visual: 'crate',
        x: 915,
        y: 530,
        w: 105,
        h: 90,
        zoneId: 'right',
        remoteMagic: false,
      },
      {
        id: 'helper_ginger',
        name: 'Рыжий кот-помощник Архимед',
        visual: 'helper_cat',
        coatColor: 'ginger',
        x: 145,
        y: 495,
        w: 75,
        h: 85,
        zoneId: 'left',
        remoteMagic: true,
      },
      {
        id: 'elevator',
        name: 'Грузовой лифт вниз',
        visual: 'elevator',
        x: 1045,
        y: 280,
        w: 145,
        h: 300,
        zoneId: 'right',
        remoteMagic: true,
      },
    ],
    hints: [
      'Рыжий кот Архимед подскажет про гирю! Томас может перепрыгнуть через ров по теням, чтобы достать предохранитель из ящика, и уменьшить тяжёлый противовес.',
      '1) Томас: «Тень-прыжок» на правый берег, затем «Телекинез» на Ящик. 2) Торквемада берёт Предохранитель, вставляет в Генератор и жмёт «Хакер-ток» на Оголённый кабель. 3) Томас применяет «Уменьшение» на Противовес. 4) Торквемада переходит мост и взламывает Лифт!',
    ],
    onInteract: (ctx) => {
      const { cat, spell, skill, itemId, hotspot, state, addItem, removeItem, say, spawnParticles, spawnBeam, spawnFlight, triggerWin, playSound } = ctx;
      const thomas = state.thomas;

      const tryLowerBridge = () => {
        if (state.flags.power_on && state.flags.weight_small && !state.flags.bridge_down) {
          state.flags.bridge_down = true;
          const br = state.hotspots.find((h) => h.id === 'bridge');
          if (br) br.active = true;
          playSound('unlock');
          spawnParticles(625, 585, '#7EE081', 'star', 24);
          say('torquemada', 'Ура! Мостик опущен — путь через кислоту открыт!');
        }
      };

      if (cat === 'thomas' && spell === 'shadow' && hotspot.shadowDest) {
        playSound('shadow');
        spawnParticles(thomas.x, thomas.y - 30, '#A855F7', 'star', 16);
        thomas.zoneId = hotspot.shadowDest.zoneId;
        thomas.x = hotspot.shadowDest.x;
        thomas.y = hotspot.shadowDest.y;
        thomas.targetX = thomas.x;
        thomas.targetY = thomas.y;
        thomas.state = 'shadow_in';
        thomas.stateTimer = 0.45;
        spawnParticles(thomas.x, thomas.y - 30, '#A855F7', 'star', 18);
        say('thomas', thomas.zoneId === 'right' ? 'Перелетел через кислотный ров!' : 'Я снова на левом берегу.');
        return;
      }

      if (hotspot.id === 'crate') {
        if (cat === 'thomas' && spell === 'telekinesis') {
          if (thomas.zoneId !== 'right') {
            playSound('error');
            say('thomas', 'Отсюда пневмо-ящик не открыть — прыгни в тень на ту сторону!');
            return;
          }
          if (state.flags.crate_opened) {
            say('thomas', 'Ящик уже пуст!');
            return;
          }
          state.flags.crate_opened = true;
          hotspot.active = true;
          const ff = state.hotspots.find((h) => h.id === 'fuse_floor');
          playSound('telekinesis');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 50, hotspot.y + 40, '#C084FC');
          spawnFlight({
            spriteKey: 'prop_fuse',
            fromX: hotspot.x + 50,
            fromY: hotspot.y + 35,
            toX: 362,
            toY: 595,
            duration: 0.85,
            arcHeight: 175,
            scaleFrom: 0.7,
            scaleTo: 1.0,
            spin: 8,
            onArrive: () => {
              if (ff) ff.hidden = false;
              spawnParticles(362, 595, '#00E5FF', 'star', 18);
            },
          });
          say('thomas', 'Хоп! Предохранитель перелетел по воздуху прямо к Торквемаде!');
          return;
        }
      }

      if (hotspot.id === 'fuse_floor' && !hotspot.hidden) {
        if (cat === 'torquemada' && skill === 'paws' && !itemId) {
          hotspot.hidden = true;
          playSound('pickup');
          addItem({
            id: 'fuse',
            name: 'Предохранитель',
            description: 'Светящаяся колба для генератора',
            icon: 'fuse',
          });
          say('torquemada', 'Отличная деталька! Как раз для генератора.');
          return;
        }
      }

      if (hotspot.id === 'generator') {
        if (cat === 'torquemada' && itemId === 'fuse') {
          removeItem('fuse');
          state.flags.fuse_in = true;
          hotspot.active = true;
          playSound('pickup');
          spawnParticles(hotspot.x + 50, hotspot.y + 55, '#F5B82E', 'spark', 14);
          say('torquemada', 'Предохранитель на месте! Теперь надо пустить ток по кабелю!');
          return;
        }
        if (cat === 'torquemada' && skill === 'hack') {
          if (!state.flags.fuse_in) {
            playSound('error');
            say('torquemada', 'В генераторе пустое гнездо — нужен предохранитель!');
            return;
          }
          say('torquemada', 'Предохранитель уже стоит, осталось замкнуть оголённый кабель!');
          return;
        }
      }

      if (hotspot.id === 'cable') {
        if (cat === 'torquemada' && skill === 'hack') {
          if (!state.flags.fuse_in) {
            state.torq.state = 'shock';
            state.torq.stateTimer = 0.5;
            playSound('hack');
            spawnParticles(hotspot.x + 40, hotspot.y + 55, '#00E5FF', 'spark', 18);
            say('torquemada', 'Ух, щекотно! Но генератор не включается без предохранителя!');
            return;
          }
          state.flags.power_on = true;
          hotspot.active = true;
          state.torq.state = 'shock';
          state.torq.stateTimer = 0.5;
          playSound('hack');
          spawnParticles(hotspot.x + 40, hotspot.y + 55, '#00E5FF', 'spark', 22);
          if (!state.flags.weight_small) {
            say('torquemada', 'Лебёдка гудит на полную, но противовес слишком тяжёлый!');
          } else {
            tryLowerBridge();
          }
          return;
        }
      }

      if (hotspot.id === 'counterweight') {
        if (cat === 'thomas' && spell === 'shrink') {
          hotspot.sizeState = 'small';
          hotspot.name = 'Крошечная гирька';
          state.flags.weight_small = true;
          playSound('shrink');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 55, hotspot.y + 55, '#38BDF8');
          spawnParticles(hotspot.x + 55, hotspot.y + 55, '#38BDF8', 'star', 16);
          if (!state.flags.power_on) {
            say('thomas', 'Гиря стала как орешек! Осталось включить лебёдку!');
          } else {
            tryLowerBridge();
          }
          return;
        }
      }

      if (hotspot.id === 'elevator') {
        if (cat === 'torquemada' && (skill === 'hack' || skill === 'paws')) {
          if (!state.flags.bridge_down) {
            playSound('error');
            say('torquemada', 'Туда не пройти — ров с кислотой шипит! Надо опустить мост.');
            return;
          }
          if (skill === 'paws') {
            playSound('error');
            say('torquemada', 'Панель лифта зашифрована — нужен «Хакер-ток»!');
            return;
          }
          playSound('hack');
          hotspot.active = true;
          spawnParticles(hotspot.x + 50, hotspot.y + 110, '#7EE081', 'spark', 24);
          triggerWin(LEVELS[1].winQuote);
          return;
        }
      }

      if (hotspot.id === 'helper_ginger') {
        playSound('meow_torq');
        spawnParticles(hotspot.x + 35, hotspot.y + 30, '#F5B82E', 'heart', 8);
        say(
          'torquemada',
          'Рыжий Архимед мурлычет: «Предохранитель заперт в ящике за рвом, а противовес надо уменьшить магией!»'
        );
        return;
      }

      defaultWrongReaction(ctx);
    },
  },

  // ============================================================================
  // LEVEL 3: Обсерватория Звёздной Ночи («Спираль Ван Гога»)
  // ============================================================================
  {
    id: 3,
    title: 'Обсерватория Звёздной Ночи',
    subtitle: 'Уровень 3 · Спираль Ван Гога',
    introQuote: '«Витражный купол кружится звёздами, но дверь заперта на световой фотоэлемент. Поймаем лунный луч!»',
    winQuote: 'Золотой луч Ван Гога ударил в фотоэлемент, и мозаичная дверь-спираль плавно раскрылась.',
    theme: {
      skyTop: '#071236',
      skyMid: '#1C3F82',
      wallBase: '#131D3D',
      wallStroke: '#2A4380',
      mosaicColors: ['#F5B82E', '#38BDF8', '#A855F7', '#F472B6'],
      neonPrimary: '#F5B82E',
      neonSecondary: '#38BDF8',
      floorColor: '#1B2547',
      archStyle: 'observatory',
    },
    walkZones: [{ id: 'main', minX: 100, maxX: 1155, y: 642, minY: 605, maxY: 680 }],
    zoneLinks: [],
    thomasStart: { x: 340, y: 642, zoneId: 'main' },
    torqStart: { x: 165, y: 642, zoneId: 'main' },
    initialFlags: {
      term_hacked: false,
      roof_open: false,
      lens_big: false,
      ring_aligned: false,
      plug_removed: false,
      pest_gone: false,
    },
    initialHotspots: [
      {
        id: 'terminal',
        name: 'Терминал купола',
        visual: 'terminal',
        x: 205,
        y: 485,
        w: 95,
        h: 130,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'telescope',
        name: 'Древний кибер-телескоп',
        visual: 'telescope',
        x: 455,
        y: 435,
        w: 150,
        h: 175,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'pest_tabby',
        name: 'Полосатый вредитель Шкода',
        visual: 'pest_cat',
        coatColor: 'tabby',
        x: 495,
        y: 385,
        w: 80,
        h: 85,
        zoneId: 'main',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'lens',
        name: 'Крошечная линза',
        visual: 'lens',
        x: 545,
        y: 415,
        w: 75,
        h: 70,
        zoneId: 'main',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'astro_ring',
        name: 'Звёздное кольцо-отражатель',
        visual: 'astro_ring',
        x: 690,
        y: 170,
        w: 125,
        h: 115,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'plug',
        name: 'Тяжёлая заглушка фотоэлемента',
        visual: 'plug',
        x: 970,
        y: 430,
        w: 85,
        h: 85,
        zoneId: 'main',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'photocell',
        name: 'Солнечный фотоэлемент',
        visual: 'photocell',
        x: 970,
        y: 430,
        w: 85,
        h: 85,
        zoneId: 'main',
        hidden: true,
        remoteMagic: true,
      },
      {
        id: 'door',
        name: 'Дверь-спираль',
        visual: 'door',
        x: 1085,
        y: 365,
        w: 120,
        h: 245,
        zoneId: 'main',
        remoteMagic: true,
      },
    ],
    hints: [
      'На телескопе развалился полосатый вредитель Шкода — сгоните его магией (телекинезом или уменьшением). Затем откройте купол, увеличьте линзу, поверните кольцо и уберите заглушку!',
      '1) Томас: «Телекинез» или «Уменьшение» на Полосатого Шкоду. 2) Торквемада: «Хакер-ток», затем «Лапки» на Терминал. 3) Томас: «Увеличение» на Линзу. 4) Томас: «Телекинез» на Звёздное кольцо. 5) Томас: «Уменьшение» на Заглушку фотоэлемента!',
    ],
    onInteract: (ctx) => {
      const { cat, spell, skill, hotspot, state, say, spawnParticles, spawnBeam, spawnFlight, triggerWin, playSound } = ctx;
      const thomas = state.thomas;

      const checkBeamComplete = () => {
        if (
          state.flags.pest_gone &&
          state.flags.roof_open &&
          state.flags.lens_big &&
          state.flags.ring_aligned &&
          state.flags.plug_removed
        ) {
          const pc = state.hotspots.find((h) => h.id === 'photocell');
          const dr = state.hotspots.find((h) => h.id === 'door');
          if (pc) pc.active = true;
          if (dr) dr.active = true;
          playSound('win');
          spawnParticles(1010, 460, '#F5B82E', 'star', 28);
          triggerWin(LEVELS[2].winQuote);
        }
      };

      if (hotspot.id === 'pest_tabby') {
        if (cat === 'thomas' && (spell === 'telekinesis' || spell === 'shrink')) {
          hotspot.hidden = true;
          state.flags.pest_gone = true;
          playSound(spell === 'shrink' ? 'shrink' : 'telekinesis');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 40, hotspot.y + 40, '#C084FC');
          spawnFlight({
            spriteKey: 'cat_tabby',
            fromX: hotspot.x + 40,
            fromY: hotspot.y + 40,
            toX: 250,
            toY: 140,
            duration: 0.65,
            arcHeight: 75,
            scaleFrom: 1,
            scaleTo: 0.16,
            spin: 9,
            fadeOut: true,
          });
          spawnParticles(hotspot.x + 40, hotspot.y + 40, '#F5B82E', 'dust', 16);
          say(
            'thomas',
            spell === 'shrink'
              ? 'Полосатый Шкода стал как мышонок и с писком удрал в норку!'
              : 'Аккуратно снял полосатого хулигана с телескопа телекинезом!'
          );
          checkBeamComplete();
          return;
        }
        if (cat === 'torquemada') {
          playSound('strain');
          say('torquemada', 'Ш-ш-ш! Полосатый Шкода шипит и бьёт меня лапой по носу! Томас, сними его магией!');
          return;
        }
      }

      if (hotspot.id === 'terminal') {
        if (cat === 'torquemada' && skill === 'hack') {
          if (state.flags.term_hacked) {
            say('torquemada', 'Защита уже снята — теперь просто нажми кнопку лапками!');
            return;
          }
          state.flags.term_hacked = true;
          hotspot.active = true;
          state.torq.state = 'shock';
          state.torq.stateTimer = 0.45;
          playSound('hack');
          spawnParticles(hotspot.x + 45, hotspot.y + 50, '#38BDF8', 'spark', 18);
          say('torquemada', 'Пароль взломан! Нажму «Лапки», чтобы раскрыть люк купола.');
          return;
        }
        if (cat === 'torquemada' && skill === 'paws') {
          if (!state.flags.term_hacked) {
            playSound('error');
            say('torquemada', 'Терминал под паролем! Сначала взломай его «Хакер-током».');
            return;
          }
          state.flags.roof_open = true;
          playSound('unlock');
          spawnParticles(560, 140, '#F5B82E', 'star', 20);
          say('torquemada', 'Купол открыт! Звёздный свет полился на телескоп!');
          checkBeamComplete();
          return;
        }
      }

      if (hotspot.id === 'lens' || hotspot.id === 'telescope') {
        if (!state.flags.pest_gone) {
          playSound('error');
          say('thomas', 'Полосатый вредитель сидит прямо на трубе и сбивает прицел! Сначала убери его!');
          return;
        }
        if (cat === 'thomas' && spell === 'enlarge') {
          const lensHs = state.hotspots.find((h) => h.id === 'lens')!;
          lensHs.sizeState = 'large';
          lensHs.name = 'Гигантская хрустальная линза';
          state.flags.lens_big = true;
          playSound('enlarge');
          spawnBeam(thomas.x, thomas.y - 35, lensHs.x + 35, lensHs.y + 35, '#F5B82E');
          spawnParticles(lensHs.x + 35, lensHs.y + 35, '#F5B82E', 'star', 18);
          say('thomas', 'Ого, какая огромная линза! Теперь луч станет в десять раз ярче!');
          checkBeamComplete();
          return;
        }
      }

      if (hotspot.id === 'astro_ring') {
        if (cat === 'thomas' && spell === 'telekinesis') {
          state.flags.ring_aligned = true;
          hotspot.active = true;
          playSound('telekinesis');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 60, hotspot.y + 55, '#C084FC');
          spawnParticles(hotspot.x + 60, hotspot.y + 55, '#F5B82E', 'star', 18);
          say('thomas', 'Повернул кольцо точно на фотоэлемент!');
          checkBeamComplete();
          return;
        }
      }

      if (hotspot.id === 'plug') {
        if (cat === 'thomas' && spell === 'shrink') {
          hotspot.hidden = true;
          const pc = state.hotspots.find((h) => h.id === 'photocell');
          if (pc) pc.hidden = false;
          state.flags.plug_removed = true;
          playSound('shrink');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 40, hotspot.y + 40, '#38BDF8');
          spawnFlight({
            spriteKey: 'prop_plug',
            fromX: hotspot.x + 42,
            fromY: hotspot.y + 42,
            toX: 930,
            toY: 635,
            duration: 0.55,
            arcHeight: 35,
            scaleFrom: 0.75,
            scaleTo: 0.22,
            spin: 6,
            fadeOut: true,
          });
          spawnParticles(hotspot.x + 40, hotspot.y + 40, '#38BDF8', 'star', 16);
          say('thomas', 'Заглушка сжалась и вывалилась! Фотоэлемент открыт!');
          checkBeamComplete();
          return;
        }
      }

      if (hotspot.id === 'door' || hotspot.id === 'photocell') {
        playSound('error');
        say('thomas', 'Фотоэлементу нужен полный звёздный луч: люк, большая линза, наведённое кольцо и снятая заглушка.');
        return;
      }

      defaultWrongReaction(ctx);
    },
  },

  // ============================================================================
  // LEVEL 4: Органный Зал Гауди («Резонанс труб»)
  // ============================================================================
  {
    id: 4,
    title: 'Органный Зал Гауди',
    subtitle: 'Уровень 4 · Резонанс труб',
    introQuote: '«Керамические трубы изогнулись до самого потолка. Чтобы открыть акустические врата, нужен двойной аккорд!»',
    winQuote: 'Полифонический аккорд сотряс мозаику Гауди, и акустический замок рассыпался в мелодичный звон.',
    theme: {
      skyTop: '#1A0F2E',
      skyMid: '#3B1E54',
      wallBase: '#2A1D3B',
      wallStroke: '#573B75',
      mosaicColors: ['#FF7B54', '#FFB26B', '#FFD56F', '#939B62'],
      neonPrimary: '#FFB26B',
      neonSecondary: '#00E5FF',
      floorColor: '#2E213D',
      archStyle: 'organ',
    },
    walkZones: [{ id: 'main', minX: 100, maxX: 1155, y: 642, minY: 605, maxY: 680 }],
    zoneLinks: [],
    thomasStart: { x: 470, y: 642, zoneId: 'main' },
    torqStart: { x: 195, y: 642, zoneId: 'main' },
    initialFlags: {
      wires_fixed: false,
      pipe_clear: false,
      resonator_big: false,
      left_held: false,
    },
    initialHotspots: [
      {
        id: 'wire_break',
        name: 'Оборванные провода органа',
        visual: 'wire_break',
        x: 195,
        y: 495,
        w: 95,
        h: 100,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'organ_key_l',
        name: 'Левая педаль-клавиша',
        visual: 'organ_key_l',
        x: 375,
        y: 505,
        w: 92,
        h: 92,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'pipe_cork',
        name: 'Огромная пробка в трубе',
        visual: 'pipe_cork',
        x: 540,
        y: 205,
        w: 88,
        h: 88,
        zoneId: 'main',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'organ_key_r',
        name: 'Правая педаль-клавиша',
        visual: 'organ_key_r',
        x: 700,
        y: 505,
        w: 92,
        h: 92,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'resonator',
        name: 'Маленький колокол-резонатор',
        visual: 'resonator',
        x: 840,
        y: 265,
        w: 85,
        h: 90,
        zoneId: 'main',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'helper_white',
        name: 'Белая кошка-помощница Сопрано',
        visual: 'helper_cat',
        coatColor: 'white',
        x: 940,
        y: 530,
        w: 75,
        h: 85,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'door',
        name: 'Акустические врата',
        visual: 'door',
        x: 1075,
        y: 335,
        w: 135,
        h: 275,
        zoneId: 'main',
        remoteMagic: true,
      },
    ],
    hints: [
      'Орган нужно починить (провода, пробка в трубе, размер резонатора), а затем нажать ОБЕ клавиши одновременно: Торквемада зажимает левую, Томас нажимает правую магией!',
      '1) Торквемада: «Хакер-ток» на Оборванные провода. 2) Томас: «Уменьшение» на Пробку в трубе. 3) Томас: «Увеличение» на Колокол-резонатор. 4) Торквемада: «Лапки» на Левую клавишу. 5) Томас: «Телекинез» на Правую клавишу!',
    ],
    onInteract: (ctx) => {
      const { cat, spell, skill, hotspot, state, say, spawnParticles, spawnBeam, spawnFlight, triggerWin, playSound } = ctx;
      const thomas = state.thomas;

      if (hotspot.id === 'wire_break') {
        if (cat === 'torquemada' && skill === 'hack') {
          state.flags.wires_fixed = true;
          hotspot.active = true;
          state.torq.state = 'shock';
          state.torq.stateTimer = 0.5;
          playSound('hack');
          spawnParticles(hotspot.x + 45, hotspot.y + 50, '#00E5FF', 'spark', 20);
          say('torquemada', 'Усы дыбом, зато электромеханика органа снова поёт!');
          return;
        }
      }

      if (hotspot.id === 'pipe_cork') {
        if (cat === 'thomas' && spell === 'shrink') {
          hotspot.hidden = true;
          state.flags.pipe_clear = true;
          playSound('shrink');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 40, '#38BDF8');
          spawnFlight({
            spriteKey: 'prop_cork',
            fromX: hotspot.x + 45,
            fromY: hotspot.y + 40,
            toX: 660,
            toY: 60,
            duration: 0.65,
            arcHeight: 80,
            scaleFrom: 0.65,
            scaleTo: 0.18,
            spin: 8,
            fadeOut: true,
          });
          spawnParticles(hotspot.x + 45, hotspot.y + 40, '#FFB26B', 'dust', 16);
          say('thomas', 'Чпок! Пробка сжалась и вылетела — труба дышит свободно!');
          return;
        }
      }

      if (hotspot.id === 'resonator') {
        if (cat === 'thomas' && spell === 'enlarge') {
          hotspot.sizeState = 'large';
          hotspot.name = 'Мощный резонатор-колокол';
          state.flags.resonator_big = true;
          playSound('enlarge');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 42, hotspot.y + 45, '#F5B82E');
          spawnParticles(hotspot.x + 42, hotspot.y + 45, '#F5B82E', 'star', 18);
          say('thomas', 'Вот это колокол! Теперь звук пробьёт любую дверь!');
          return;
        }
      }

      if (hotspot.id === 'organ_key_l') {
        if (cat === 'torquemada' && skill === 'paws') {
          if (!state.flags.wires_fixed) {
            playSound('error');
            say('torquemada', 'Клавиша молчит — сначала соедини оборванные провода!');
            return;
          }
          state.flags.left_held = true;
          hotspot.active = true;
          state.torq.state = 'hold';
          state.torq.stateTimer = 99;
          playSound('organ_note');
          spawnParticles(hotspot.x + 45, hotspot.y + 30, '#FFB26B', 'note', 8);
          say('torquemada', 'Держу левую клавишу! Томас, быстро жми правую телекинезом!');
          return;
        }
      }

      if (hotspot.id === 'organ_key_r') {
        if (cat === 'thomas' && spell === 'telekinesis') {
          if (!state.flags.wires_fixed) {
            playSound('error');
            say('thomas', 'Провода оборваны — орган обесточен!');
            return;
          }
          if (!state.flags.pipe_clear) {
            playSound('error');
            say('thomas', 'Хрипит! Пробка в центральной трубе портит ноту!');
            return;
          }
          if (!state.flags.resonator_big) {
            playSound('error');
            say('thomas', 'Звук слишком тихий — надо увеличить колокол-резонатор!');
            return;
          }
          if (!state.flags.left_held) {
            playSound('organ_note');
            say('thomas', 'Одной ноты мало! Пусть Торквемада сначала зажмёт левую клавишу лапками!');
            return;
          }
          playSound('organ_chord');
          hotspot.active = true;
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 45, '#F5B82E');
          spawnParticles(1090, 440, '#FFD56F', 'note', 24);
          triggerWin(LEVELS[3].winQuote);
          return;
        }
      }

      if (hotspot.id === 'helper_white') {
        playSound('organ_note');
        spawnParticles(hotspot.x + 35, hotspot.y + 20, '#F5B82E', 'note', 10);
        say(
          'thomas',
          'Белая кошка Сопрано напевает: «Мур-ля-си! Уберите пробку, увеличьте колокол и берите двойной аккорд одновременно!»'
        );
        return;
      }

      defaultWrongReaction(ctx);
    },
  },

  // ============================================================================
  // LEVEL 5: Часовая Шестерёночная («Время вспять»)
  // ============================================================================
  {
    id: 5,
    title: 'Часовая Шестерёночная',
    subtitle: 'Уровень 5 · Время вспять',
    introQuote: '«Огромный маятник раскачивается над бездной, а выход скрыт за потайным циферблатом!»',
    winQuote: 'Стрелки помчались в прошлое, открывая потайной люк в недрах часовой башни!',
    theme: {
      skyTop: '#161124',
      skyMid: '#30234A',
      wallBase: '#221C35',
      wallStroke: '#4D3D70',
      mosaicColors: ['#F5B82E', '#E06D53', '#38BDF8', '#C084FC'],
      neonPrimary: '#F5B82E',
      neonSecondary: '#C084FC',
      floorColor: '#29223B',
      archStyle: 'clock',
    },
    walkZones: [
      { id: 'left', minX: 120, maxX: 605, y: 590, minY: 550, maxY: 635 },
      { id: 'right', minX: 850, maxX: 1160, y: 575, minY: 540, maxY: 615 },
    ],
    zoneLinks: [],
    thomasStart: { x: 400, y: 592, zoneId: 'left' },
    torqStart: { x: 250, y: 592, zoneId: 'left' },
    initialFlags: {
      gear_big: false,
      gear_tossed: false,
      gear_inserted: false,
      weight_shrunk: false,
    },
    initialHotspots: [
      {
        id: 'door',
        name: 'Потайной люк-циферблат',
        visual: 'door',
        x: 65,
        y: 205,
        w: 185,
        h: 265,
        zoneId: 'left',
        remoteMagic: true,
      },
      {
        id: 'clock_weight',
        name: 'Тяжёлая часовая гиря',
        visual: 'clock_weight',
        x: 270,
        y: 195,
        w: 95,
        h: 130,
        zoneId: 'left',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'clock_gear_slot',
        name: 'Ось хроно-замка',
        visual: 'clock_gear_slot',
        x: 270,
        y: 375,
        w: 95,
        h: 95,
        zoneId: 'left',
        remoteMagic: true,
      },
      {
        id: 'gear_floor',
        name: 'Большая шестерёнка',
        visual: 'small_gear',
        x: 375,
        y: 545,
        w: 75,
        h: 70,
        zoneId: 'left',
        hidden: true,
        sizeState: 'large',
        remoteMagic: true,
      },
      {
        id: 'generator',
        name: 'Хроно-генератор',
        visual: 'generator',
        x: 495,
        y: 440,
        w: 95,
        h: 120,
        zoneId: 'left',
        remoteMagic: true,
      },
      {
        id: 'shadow_l',
        name: 'Тень у пропасти',
        visual: 'shadow_pad',
        x: 425,
        y: 540,
        w: 100,
        h: 75,
        zoneId: 'left',
        remoteMagic: true,
        shadowDest: { zoneId: 'right', x: 895, y: 575 },
      },
      {
        id: 'shadow_r',
        name: 'Тень за маятником',
        visual: 'shadow_pad',
        x: 855,
        y: 525,
        w: 100,
        h: 75,
        zoneId: 'right',
        remoteMagic: true,
        shadowDest: { zoneId: 'left', x: 475, y: 590 },
      },
      {
        id: 'small_gear',
        name: 'Крошечная шестерёнка',
        visual: 'small_gear',
        x: 1020,
        y: 505,
        w: 80,
        h: 75,
        zoneId: 'right',
        remoteMagic: false,
        sizeState: 'normal',
      },
    ],
    hints: [
      'На правом краю лежит слишком мелкая шестерёнка — её нужно увеличить и перебросить Торквемаде. А ось часов заклинила гиря!',
      '1) Томас: «Тень-прыжок» вправо, «Увеличение» на Шестерёнку, затем «Телекинез» на неё, и «Тень-прыжок» обратно. 2) Томас: «Уменьшение» на Гирю. 3) Торквемада: берёт Большую шестерёнку, вставляет в Ось и бьёт «Хакер-током» по Хроно-генератору!',
    ],
    onInteract: (ctx) => {
      const { cat, spell, skill, itemId, hotspot, state, addItem, removeItem, say, spawnParticles, spawnBeam, spawnFlight, triggerWin, playSound } = ctx;
      const thomas = state.thomas;

      if (cat === 'thomas' && spell === 'shadow' && hotspot.shadowDest) {
        playSound('shadow');
        spawnParticles(thomas.x, thomas.y - 30, '#A855F7', 'star', 16);
        thomas.zoneId = hotspot.shadowDest.zoneId;
        thomas.x = hotspot.shadowDest.x;
        thomas.y = hotspot.shadowDest.y;
        thomas.targetX = thomas.x;
        thomas.targetY = thomas.y;
        thomas.state = 'shadow_in';
        thomas.stateTimer = 0.45;
        spawnParticles(thomas.x, thomas.y - 30, '#A855F7', 'star', 18);
        say('thomas', thomas.zoneId === 'right' ? 'Нырнул мимо маятника!' : 'Снова на основной платформе!');
        return;
      }

      if (hotspot.id === 'small_gear') {
        if (cat === 'thomas') {
          if (thomas.zoneId !== 'right') {
            playSound('error');
            say('thomas', 'Слишком далеко и маятник глушит чары — прыгни в тень!');
            return;
          }
          if (spell === 'enlarge') {
            hotspot.sizeState = 'large';
            hotspot.name = 'Огромная шестерёнка';
            state.flags.gear_big = true;
            playSound('enlarge');
            spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 40, hotspot.y + 35, '#F5B82E');
            say('thomas', 'Выросла как раз под часовую ось! Теперь переброшу её!');
            return;
          }
          if (spell === 'telekinesis') {
            if (!state.flags.gear_big) {
              playSound('error');
              say('thomas', 'Она пока размером с пуговицу — сначала увеличь её!');
              return;
            }
            hotspot.hidden = true;
            const gf = state.hotspots.find((h) => h.id === 'gear_floor');
            state.flags.gear_tossed = true;
            playSound('telekinesis');
            spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 40, hotspot.y + 35, '#C084FC');
            spawnFlight({
              spriteKey: 'prop_gear',
              fromX: hotspot.x + 40,
              fromY: hotspot.y + 35,
              toX: 412,
              toY: 578,
              duration: 0.85,
              arcHeight: 165,
              scaleFrom: 1.2,
              scaleTo: 1.3,
              spin: 12,
              onArrive: () => {
                if (gf) gf.hidden = false;
                spawnParticles(412, 578, '#F5B82E', 'star', 18);
              },
            });
            say('thomas', 'Полетела через пропасть к Торквемаде!');
            return;
          }
        }
      }

      if (hotspot.id === 'gear_floor' && !hotspot.hidden) {
        if (cat === 'torquemada' && skill === 'paws' && !itemId) {
          hotspot.hidden = true;
          playSound('pickup');
          addItem({
            id: 'big_gear',
            name: 'Большая шестерёнка',
            description: 'Зубчатое колесо для хроно-замка',
            icon: 'gear',
          });
          say('torquemada', 'Увесистая! Щас воткнём в механизм.');
          return;
        }
      }

      if (hotspot.id === 'clock_weight') {
        if (cat === 'thomas' && spell === 'shrink') {
          hotspot.sizeState = 'small';
          state.flags.weight_shrunk = true;
          playSound('shrink');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 60, '#38BDF8');
          say('thomas', 'Гиря стала крошкой — зажим оси ослаб!');
          return;
        }
      }

      if (hotspot.id === 'clock_gear_slot') {
        if (cat === 'torquemada' && itemId === 'big_gear') {
          removeItem('big_gear');
          state.flags.gear_inserted = true;
          hotspot.active = true;
          playSound('pickup');
          spawnParticles(hotspot.x + 45, hotspot.y + 45, '#F5B82E', 'spark', 14);
          say('torquemada', 'Шестерёнка встала как родная! Осталось подать искру в генератор.');
          return;
        }
      }

      if (hotspot.id === 'generator') {
        if (cat === 'torquemada' && skill === 'hack') {
          if (!state.flags.gear_inserted) {
            playSound('error');
            say('torquemada', 'В механизме не хватает шестерёнки!');
            return;
          }
          if (!state.flags.weight_shrunk) {
            playSound('strain');
            say('torquemada', 'Искры летят, но тяжёлая гиря заклинила ось! Уменьши её, Томас!');
            return;
          }
          playSound('hack');
          hotspot.active = true;
          const dr = state.hotspots.find((h) => h.id === 'door');
          if (dr) dr.active = true;
          spawnParticles(140, 440, '#C084FC', 'star', 24);
          triggerWin(LEVELS[4].winQuote);
          return;
        }
      }

      defaultWrongReaction(ctx);
    },
  },

  // ============================================================================
  // LEVEL 6: Теплица Неоновых Подсолнухов («Хищный цветок»)
  // ============================================================================
  {
    id: 6,
    title: 'Теплица Неоновых Подсолнухов',
    subtitle: 'Уровень 6 · Хищный цветок',
    introQuote: '«В оранжерее Гауди расцвёл зубастый неоновый подсолнух Ван Гога. Он никого не пропустит к био-двери!»',
    winQuote: 'Ослеплённый и усыплённый сонным нектаром, цветок захрапел, а био-дверь приняла пропуск.',
    theme: {
      skyTop: '#061A1E',
      skyMid: '#0F3D3E',
      wallBase: '#122B2A',
      wallStroke: '#256157',
      mosaicColors: ['#F5B82E', '#7EE081', '#00E5FF', '#FF7B54'],
      neonPrimary: '#7EE081',
      neonSecondary: '#F5B82E',
      floorColor: '#18332E',
      archStyle: 'greenhouse',
    },
    walkZones: [
      { id: 'main', minX: 95, maxX: 745, y: 645, minY: 605, maxY: 682 },
      { id: 'door_zone', minX: 745, maxX: 1155, y: 645, minY: 605, maxY: 682, requiresFlag: 'plant_asleep' },
    ],
    zoneLinks: [{ from: 'main', to: 'door_zone', flag: 'plant_asleep' }],
    thomasStart: { x: 245, y: 645, zoneId: 'main' },
    torqStart: { x: 375, y: 645, zoneId: 'main' },
    initialFlags: {
      uv_on: false,
      plant_asleep: false,
      pest_gray_gone: false,
      dome_open: false,
    },
    initialHotspots: [
      {
        id: 'uv_lamp',
        name: 'УФ-прожектор',
        visual: 'uv_lamp',
        x: 155,
        y: 455,
        w: 100,
        h: 130,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'glass_dome',
        name: 'Стеклянный колпак',
        visual: 'glass_dome',
        x: 430,
        y: 525,
        w: 95,
        h: 100,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'pest_gray',
        name: 'Серый кот-вредитель Хват',
        visual: 'pest_cat',
        coatColor: 'gray',
        x: 438,
        y: 455,
        w: 80,
        h: 85,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'keycard',
        name: 'Био-ключ-карта',
        visual: 'keycard',
        x: 445,
        y: 575,
        w: 70,
        h: 50,
        zoneId: 'main',
        hidden: true,
        remoteMagic: true,
      },
      {
        id: 'watering_can',
        name: 'Лейка с сонным нектаром',
        visual: 'watering_can',
        x: 685,
        y: 170,
        w: 95,
        h: 85,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'plant',
        name: 'Хищный Неоновый Подсолнух',
        visual: 'plant',
        x: 750,
        y: 410,
        w: 165,
        h: 220,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'door',
        name: 'Био-дверь теплицы',
        visual: 'door',
        x: 1055,
        y: 335,
        w: 145,
        h: 295,
        zoneId: 'door_zone',
        remoteMagic: true,
      },
    ],
    hints: [
      'Серый кот Хват уселся прямо на стеклянный колпак! Сгоните его магией Томаса или разрядом Торквемады, усыпите цветок УФ-лампой + нектаром и заберите ключ-карту.',
      '1) Торквемада: «Хакер-ток» на УФ-прожектор. 2) Томас: «Телекинез» на Лейку сверху. 3) Томас: «Телекинез» (или «Уменьшение») на Серого кота Хвата, затем на Стеклянный колпак. 4) Торквемада берёт Ключ-карту и применяет на Био-дверь!',
    ],
    onInteract: (ctx) => {
      const { cat, spell, skill, itemId, hotspot, state, addItem, removeItem, say, spawnParticles, spawnBeam, spawnFlight, triggerCaught, triggerWin, playSound } = ctx;
      const thomas = state.thomas;

      if (hotspot.id === 'uv_lamp') {
        if (cat === 'torquemada' && skill === 'hack') {
          state.flags.uv_on = true;
          hotspot.active = true;
          state.torq.state = 'shock';
          state.torq.stateTimer = 0.45;
          playSound('hack');
          spawnParticles(hotspot.x + 50, hotspot.y + 45, '#C084FC', 'spark', 20);
          say('torquemada', 'Включил ультрафиолет! Смотри, как цветок зажмурился!');
          return;
        }
      }

      if (hotspot.id === 'watering_can') {
        if (cat === 'thomas' && spell === 'telekinesis') {
          if (!state.flags.uv_on) {
            playSound('splash');
            spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 45, '#C084FC');
            say('thomas', 'Ай! Бодрый цветок отбил капли лепестками! Сначала ослепи его прожектором!');
            return;
          }
          state.flags.plant_asleep = true;
          hotspot.active = true;
          const pl = state.hotspots.find((h) => h.id === 'plant');
          if (pl) {
            pl.active = true;
            pl.name = 'Спящий подсолнух';
          }
          playSound('splash');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 45, '#7EE081');
          spawnParticles(820, 410, '#7EE081', 'zzz', 14);
          say('thomas', 'Сонный нектар подействовал — людоед засопел!');
          return;
        }
      }

      if (hotspot.id === 'plant') {
        if (!state.flags.plant_asleep) {
          playSound('dog_wake');
          triggerCaught('Хрум-ам!', 'Нельзя трогать бодрствующего хищного подсолнуха! Он чуть не проглотил Торквемаду!');
          return;
        }
        say('torquemada', 'Храпит и пахнет ванилью!');
        return;
      }

      if (hotspot.id === 'pest_gray') {
        if (cat === 'thomas' && (spell === 'telekinesis' || spell === 'shrink')) {
          hotspot.hidden = true;
          state.flags.pest_gray_gone = true;
          playSound(spell === 'shrink' ? 'shrink' : 'telekinesis');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 40, hotspot.y + 40, '#C084FC');
          spawnFlight({
            spriteKey: 'cat_gray',
            fromX: hotspot.x + 40,
            fromY: hotspot.y + 40,
            toX: 80,
            toY: 420,
            duration: 0.65,
            arcHeight: 85,
            scaleFrom: 1,
            scaleTo: 0.35,
            spin: -8,
            fadeOut: true,
          });
          spawnParticles(hotspot.x + 40, hotspot.y + 40, '#94A3B8', 'dust', 16);
          say('thomas', 'Серый вредитель Хват отправлен искать другой колпак!');
          return;
        }
        if (cat === 'torquemada' && skill === 'hack') {
          hotspot.hidden = true;
          state.flags.pest_gray_gone = true;
          playSound('hack');
          spawnFlight({
            spriteKey: 'cat_gray',
            fromX: hotspot.x + 40,
            fromY: hotspot.y + 40,
            toX: 80,
            toY: 390,
            duration: 0.55,
            arcHeight: 110,
            scaleFrom: 1,
            scaleTo: 0.4,
            spin: -10,
            fadeOut: true,
          });
          spawnParticles(hotspot.x + 40, hotspot.y + 40, '#00E5FF', 'spark', 18);
          say('torquemada', 'Тр-р-р! Небольшой статический разряд — и Серый Хват пулей сбежал!');
          return;
        }
        playSound('strain');
        say('torquemada', 'Хват вцепился когтями в колпак: «Моё!» Надо его шугануть или поднять магией!');
        return;
      }

      if (hotspot.id === 'glass_dome') {
        if (!state.flags.pest_gray_gone) {
          playSound('error');
          say('thomas', 'На колпаке сидит вредный серый кот Хват! Сначала сгони его!');
          return;
        }
        if (cat === 'thomas' && (spell === 'telekinesis' || spell === 'shrink')) {
          hotspot.hidden = true;
          const kc = state.hotspots.find((h) => h.id === 'keycard');
          if (kc) kc.hidden = false;
          state.flags.dome_open = true;
          playSound(spell === 'shrink' ? 'shrink' : 'telekinesis');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 50, '#38BDF8');
          spawnFlight({
            spriteKey: 'prop_dome',
            fromX: hotspot.x + 48,
            fromY: hotspot.y + 50,
            toX: hotspot.x + 48,
            toY: 220,
            duration: 0.65,
            arcHeight: 20,
            scaleFrom: 1,
            scaleTo: 0.25,
            fadeOut: true,
          });
          spawnParticles(hotspot.x + 45, hotspot.y + 50, '#00E5FF', 'star', 14);
          say('thomas', 'Путь к ключ-карте свободен!');
          return;
        }
      }

      if (hotspot.id === 'keycard' && !hotspot.hidden) {
        if (cat === 'torquemada' && skill === 'paws' && !itemId) {
          hotspot.hidden = true;
          playSound('pickup');
          addItem({
            id: 'keycard',
            name: 'Био-карта',
            description: 'Цифровой пропуск от двери теплицы',
            icon: 'keycard',
          });
          say('torquemada', 'Ключ-карта в кармане!');
          return;
        }
      }

      if (hotspot.id === 'door') {
        if (cat === 'torquemada' && itemId === 'keycard') {
          removeItem('keycard');
          playSound('unlock');
          hotspot.active = true;
          spawnParticles(hotspot.x + 45, hotspot.y + 110, '#7EE081', 'star', 24);
          triggerWin(LEVELS[5].winQuote);
          return;
        }
        if (!state.flags.plant_asleep) {
          playSound('error');
          say('torquemada', 'Хищный цветок не пускает к двери!');
          return;
        }
      }

      defaultWrongReaction(ctx);
    },
  },

  // ============================================================================
  // LEVEL 7: Архив Голограмм и Пергаментов («Код когтя»)
  // ============================================================================
  {
    id: 7,
    title: 'Архив Голограмм и Свитков',
    subtitle: 'Уровень 7 · Код когтя',
    introQuote: '«Выход перерезан красными лазерами. Пароль спрятан на свитке под потолком!»',
    winQuote: 'Лазеры погасли с шипением, и стальной шлюз архива открылся!',
    theme: {
      skyTop: '#0E0B24',
      skyMid: '#24184E',
      wallBase: '#181433',
      wallStroke: '#3D3175',
      mosaicColors: ['#FF2A85', '#00E5FF', '#F5B82E', '#A855F7'],
      neonPrimary: '#FF2A85',
      neonSecondary: '#00E5FF',
      floorColor: '#211B40',
      archStyle: 'archive',
    },
    walkZones: [
      { id: 'main', minX: 95, maxX: 870, y: 638, minY: 595, maxY: 675 },
      { id: 'door_zone', minX: 870, maxX: 1150, y: 638, minY: 595, maxY: 675, requiresFlag: 'lasers_off' },
    ],
    zoneLinks: [{ from: 'main', to: 'door_zone', flag: 'lasers_off' }],
    thomasStart: { x: 320, y: 638, zoneId: 'main' },
    torqStart: { x: 165, y: 638, zoneId: 'main' },
    initialFlags: {
      socket_hacked: false,
      scroll_down: false,
      code_known: false,
      code_entered: false,
      lasers_off: false,
    },
    initialHotspots: [
      {
        id: 'holo_socket',
        name: 'Голо-розетка питания',
        visual: 'holo_socket',
        x: 155,
        y: 485,
        w: 95,
        h: 115,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'scroll',
        name: 'Свиток с мелкими рунами',
        visual: 'scroll',
        x: 420,
        y: 185,
        w: 95,
        h: 75,
        zoneId: 'main',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'terminal',
        name: 'Кодовый терминал',
        visual: 'terminal',
        x: 645,
        y: 475,
        w: 95,
        h: 135,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'lever',
        name: 'Тугой рычаг сброса',
        visual: 'lever',
        x: 795,
        y: 465,
        w: 80,
        h: 120,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'laser_grid',
        name: 'Лазерная сетка',
        visual: 'laser_grid',
        x: 895,
        y: 325,
        w: 65,
        h: 290,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'helper_archivist',
        name: 'Рыже-белый кот-архивариус Мурзик',
        visual: 'helper_cat',
        coatColor: 'ginger_white',
        x: 530,
        y: 525,
        w: 75,
        h: 85,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'door',
        name: 'Шлюз архива',
        visual: 'door',
        x: 1030,
        y: 270,
        w: 195,
        h: 330,
        zoneId: 'door_zone',
        remoteMagic: true,
      },
    ],
    hints: [
      'Снимите свиток телекинезом и увеличьте руны, чтобы прочитать пароль. Закоротите голо-розетку, введите код и дёрните тугой рычаг магией!',
      '1) Торквемада: «Хакер-ток» на Голо-розетку. 2) Томас: «Телекинез», затем «Увеличение» на Свиток. 3) Торквемада: «Лапки» на Кодовый терминал. 4) Томас: «Телекинез» на Тугой рычаг. 5) Пройдите через Дверь!',
    ],
    onInteract: (ctx) => {
      const { cat, spell, skill, hotspot, state, say, spawnParticles, spawnBeam, triggerCaught, triggerWin, playSound } = ctx;
      const thomas = state.thomas;

      if (hotspot.id === 'holo_socket') {
        if (cat === 'torquemada' && skill === 'hack') {
          state.flags.socket_hacked = true;
          hotspot.active = true;
          state.torq.state = 'shock';
          state.torq.stateTimer = 0.45;
          playSound('hack');
          spawnParticles(hotspot.x + 45, hotspot.y + 55, '#00E5FF', 'spark', 20);
          say('torquemada', 'Перегрузил контур лазеров! Осталось ввести код и дёрнуть рубильник!');
          return;
        }
      }

      if (hotspot.id === 'scroll') {
        if (cat === 'thomas' && spell === 'telekinesis' && !state.flags.scroll_down) {
          state.flags.scroll_down = true;
          hotspot.targetY = 485;
          hotspot.x = 420;
          playSound('telekinesis');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 35, '#C084FC');
          say('thomas', 'Спустил свиток пониже... Но буквы микроскопические!');
          return;
        }
        if (cat === 'thomas' && spell === 'enlarge') {
          if (!state.flags.scroll_down) {
            state.flags.scroll_down = true;
          }
          hotspot.targetY = 485;
          hotspot.sizeState = 'large';
          hotspot.name = 'Свиток с кодом «7-4-2»';
          state.flags.code_known = true;
          playSound('enlarge');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, 485 + 35, '#F5B82E');
          spawnParticles(hotspot.x + 45, 485 + 35, '#F5B82E', 'star', 16);
          say('thomas', 'Ага! Вижу крупно: код «7-4-2»!');
          return;
        }
      }

      if (hotspot.id === 'terminal') {
        if (cat === 'torquemada' && (skill === 'paws' || skill === 'hack')) {
          if (!state.flags.code_known) {
            playSound('error');
            say('torquemada', 'Нужен 3-значный код! Кажется, он написан на свитке наверху.');
            return;
          }
          state.flags.code_entered = true;
          hotspot.active = true;
          playSound('pickup');
          spawnParticles(hotspot.x + 45, hotspot.y + 55, '#00E5FF', 'star', 14);
          say('torquemada', 'Ввёл 7-4-2! Теперь дёргай ржавый рычаг, Томас — мне не провернуть!');
          return;
        }
      }

      if (hotspot.id === 'lever') {
        if (cat === 'torquemada') {
          state.torq.state = 'strain';
          state.torq.stateTimer = 0.6;
          playSound('strain');
          say('torquemada', 'Уф, прикипел! Нужен телекинез Томаса!');
          return;
        }
        if (cat === 'thomas' && spell === 'telekinesis') {
          if (!state.flags.socket_hacked || !state.flags.code_entered) {
            playSound('error');
            say('thomas', 'Рычаг заблокирован! Нужен и взлом розетки, и код в терминале.');
            return;
          }
          state.flags.lasers_off = true;
          hotspot.active = true;
          const lg = state.hotspots.find((h) => h.id === 'laser_grid');
          if (lg) lg.hidden = true;
          playSound('unlock');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 40, hotspot.y + 50, '#C084FC');
          spawnParticles(915, 430, '#00E5FF', 'spark', 24);
          say('thomas', 'Лазеры погасли! Бежим к двери!');
          return;
        }
      }

      if (hotspot.id === 'laser_grid' && !hotspot.hidden) {
        playSound('dog_bite');
        triggerCaught('Ой, лазерный подпал!', 'Красные лучи сработали на прикосновение — сначала отключи сеть и введи код!');
        return;
      }

      if (hotspot.id === 'door') {
        if (state.flags.lasers_off) {
          playSound('win');
          hotspot.active = true;
          triggerWin(LEVELS[6].winQuote);
          return;
        }
      }

      if (hotspot.id === 'helper_archivist') {
        playSound('meow_thomas');
        spawnParticles(hotspot.x + 35, hotspot.y + 20, '#F5B82E', 'star', 8);
        say(
          'thomas',
          'Рыже-белый Архивариус Мурзик поправляет очки: «Свиток с кодом лежит наверху, но буквы крошечные — сними его и увеличь!»'
        );
        return;
      }

      defaultWrongReaction(ctx);
    },
  },

  // ============================================================================
  // LEVEL 8: Кузница Кибер-Горгульи («Железный ошейник»)
  // ============================================================================
  {
    id: 8,
    title: 'Кузница Кибер-Горгульи',
    subtitle: 'Уровень 8 · Железный ошейник',
    introQuote: '«Ворота заварены припоем, а раскалённый крюк заперт в кузнечной клетке. За дело!»',
    winQuote: 'Засов сжался, цепь натянулась, и тяжёлые ворота кузницы с грохотом распахнулись.',
    theme: {
      skyTop: '#1F0A0A',
      skyMid: '#4A1812',
      wallBase: '#291514',
      wallStroke: '#662D24',
      mosaicColors: ['#FF5722', '#F5B82E', '#00E5FF', '#9E9E9E'],
      neonPrimary: '#FF6B35',
      neonSecondary: '#00E5FF',
      floorColor: '#2B1B1A',
      archStyle: 'forge',
    },
    walkZones: [
      { id: 'main', minX: 95, maxX: 940, y: 638, minY: 595, maxY: 675 },
      { id: 'cage', minX: 145, maxX: 345, y: 282, minY: 274, maxY: 292 },
      { id: 'exit_zone', minX: 940, maxX: 1155, y: 638, minY: 595, maxY: 675, requiresFlag: 'bridge_open' },
    ],
    zoneLinks: [{ from: 'main', to: 'exit_zone', flag: 'bridge_open' }],
    thomasStart: { x: 410, y: 638, zoneId: 'main' },
    torqStart: { x: 585, y: 638, zoneId: 'main' },
    initialFlags: {
      furnace_on: false,
      bellows_big: false,
      solder_melted: false,
      hook_attached: false,
      bolt_shrunk: false,
      bridge_open: false,
    },
    initialHotspots: [
      {
        id: 'shadow_main',
        name: 'Тень у наковальни',
        visual: 'shadow_pad',
        x: 310,
        y: 570,
        w: 105,
        h: 75,
        zoneId: 'main',
        remoteMagic: true,
        shadowDest: { zoneId: 'cage', x: 195, y: 282 },
      },
      {
        id: 'shadow_cage',
        name: 'Тень в клетке кузни',
        visual: 'shadow_pad',
        x: 155,
        y: 220,
        w: 95,
        h: 75,
        zoneId: 'cage',
        remoteMagic: true,
        shadowDest: { zoneId: 'main', x: 365, y: 638 },
      },
      {
        id: 'hot_hook',
        name: 'Раскалённый крюк',
        visual: 'hot_hook',
        x: 265,
        y: 225,
        w: 75,
        h: 75,
        zoneId: 'cage',
        remoteMagic: false,
      },
      {
        id: 'furnace',
        name: 'Электропечь кузницы',
        visual: 'furnace',
        x: 520,
        y: 445,
        w: 120,
        h: 150,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'bellows',
        name: 'Вентиль кузнечных мехов',
        visual: 'bellows',
        x: 680,
        y: 475,
        w: 90,
        h: 115,
        zoneId: 'main',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'solder_chain',
        name: 'Цепь с застывшим припоем',
        visual: 'solder_chain',
        x: 825,
        y: 270,
        w: 95,
        h: 145,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'bolt',
        name: 'Массивный засов ворот',
        visual: 'bolt',
        x: 965,
        y: 405,
        w: 90,
        h: 90,
        zoneId: 'main',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'door',
        name: 'Ворота кузницы',
        visual: 'door',
        x: 1035,
        y: 265,
        w: 165,
        h: 335,
        zoneId: 'exit_zone',
        remoteMagic: true,
      },
    ],
    hints: [
      'Запустите электропечь, раздуйте меха до максимума и расплавьте припой. Заберите крюк через тень и уменьшите засов!',
      '1) Торквемада: «Хакер-ток» на Электропечь. 2) Томас: «Увеличение», затем «Телекинез» на Вентиль мехов. 3) Томас: «Тень-прыжок» в клетку, затем «Телекинез» на Раскалённый крюк, затем обратно. 4) Томас: «Уменьшение» на Массивный засов. 5) Нажмите на Ворота!',
    ],
    onInteract: (ctx) => {
      const { cat, spell, skill, hotspot, state, say, spawnParticles, spawnBeam, spawnFlight, triggerWin, playSound } = ctx;
      const thomas = state.thomas;

      const checkBridgeOpen = () => {
        if (state.flags.solder_melted && state.flags.hook_attached && state.flags.bolt_shrunk && !state.flags.bridge_open) {
          state.flags.bridge_open = true;
          const dr = state.hotspots.find((h) => h.id === 'door');
          if (dr) dr.active = true;
          playSound('unlock');
          spawnParticles(1060, 440, '#FF6B35', 'star', 24);
          say('thomas', 'Готово! Ворота кузницы открылись!');
        }
      };

      if (cat === 'thomas' && spell === 'shadow' && hotspot.shadowDest) {
        playSound('shadow');
        spawnParticles(thomas.x, thomas.y - 30, '#A855F7', 'star', 16);
        thomas.zoneId = hotspot.shadowDest.zoneId;
        thomas.x = hotspot.shadowDest.x;
        thomas.y = hotspot.shadowDest.y;
        thomas.targetX = thomas.x;
        thomas.targetY = thomas.y;
        thomas.state = 'shadow_in';
        thomas.stateTimer = 0.45;
        spawnParticles(thomas.x, thomas.y - 30, '#A855F7', 'star', 16);
        return;
      }

      if (hotspot.id === 'furnace') {
        if (cat === 'torquemada' && skill === 'hack') {
          state.flags.furnace_on = true;
          hotspot.active = true;
          state.torq.state = 'shock';
          state.torq.stateTimer = 0.45;
          playSound('hack');
          spawnParticles(hotspot.x + 60, hotspot.y + 80, '#FF6B35', 'spark', 22);
          say('torquemada', 'Печь запылала! Теперь раздуй меха посильнее, Томас!');
          return;
        }
      }

      if (hotspot.id === 'bellows') {
        if (cat === 'thomas' && spell === 'enlarge') {
          hotspot.sizeState = 'large';
          state.flags.bellows_big = true;
          playSound('enlarge');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 55, '#F5B82E');
          say('thomas', 'Огромные меха! Теперь дуну ими телекинезом!');
          return;
        }
        if (cat === 'thomas' && spell === 'telekinesis') {
          if (!state.flags.furnace_on) {
            playSound('error');
            say('thomas', 'Печь ещё холодная — сначала включи её!');
            return;
          }
          if (!state.flags.bellows_big) {
            playSound('error');
            say('thomas', 'Слабоват ветерок — сначала увеличь меха!');
            return;
          }
          state.flags.solder_melted = true;
          hotspot.active = true;
          const sc = state.hotspots.find((h) => h.id === 'solder_chain');
          if (sc) sc.active = true;
          playSound('telekinesis');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 55, '#FF6B35');
          spawnParticles(865, 330, '#FF6B35', 'spark', 22);
          say('thomas', 'Ух! Жар расплавил припой на цепи!');
          checkBridgeOpen();
          return;
        }
      }

      if (hotspot.id === 'hot_hook') {
        if (cat === 'thomas' && spell === 'telekinesis') {
          if (thomas.zoneId !== 'cage') {
            playSound('error');
            say('thomas', 'Свинцовая решётка! Прыгни в тень внутрь.');
            return;
          }
          hotspot.hidden = true;
          state.flags.hook_attached = true;
          const sc = state.hotspots.find((h) => h.id === 'solder_chain');
          if (sc) sc.locked = false;
          playSound('telekinesis');
          spawnBeam(thomas.x, thomas.y - 35, 870, 330, '#FF6B35');
          spawnFlight({
            spriteKey: 'prop_hook',
            fromX: hotspot.x + 38,
            fromY: hotspot.y + 38,
            toX: 870,
            toY: 340,
            duration: 0.72,
            arcHeight: 85,
            scaleFrom: 0.65,
            scaleTo: 0.75,
            spin: 9,
            fadeOut: true,
            onArrive: () => spawnParticles(870, 340, '#FF6B35', 'star', 18),
          });
          say('thomas', 'Зацепил раскалённый крюк прямо за цепь ворот!');
          checkBridgeOpen();
          return;
        }
      }

      if (hotspot.id === 'bolt') {
        if (cat === 'thomas' && spell === 'shrink') {
          hotspot.sizeState = 'small';
          state.flags.bolt_shrunk = true;
          playSound('shrink');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 45, '#38BDF8');
          spawnParticles(hotspot.x + 45, hotspot.y + 45, '#38BDF8', 'star', 16);
          say('thomas', 'Засов сжался до булавки!');
          checkBridgeOpen();
          return;
        }
      }

      if (hotspot.id === 'door') {
        if (state.flags.bridge_open) {
          playSound('win');
          triggerWin(LEVELS[7].winQuote);
          return;
        }
      }

      defaultWrongReaction(ctx);
    },
  },

  // ============================================================================
  // LEVEL 9: Винтовая Лестница Спиралей («Магнитный колодец»)
  // ============================================================================
  {
    id: 9,
    title: 'Винтовая Лестница Спиралей',
    subtitle: 'Уровень 9 · Магнитный колодец',
    introQuote: '«Мостик парит под потолком на электромагнитах, а впереди кружит зубастый Дрон-Мопс!»',
    winQuote: 'Писклявый микро-дрон кружится в углу, магнитный мост замкнут, а коты уже у самых главных врат!',
    theme: {
      skyTop: '#080F26',
      skyMid: '#1C2E5E',
      wallBase: '#151E3B',
      wallStroke: '#385199',
      mosaicColors: ['#38BDF8', '#A855F7', '#F5B82E', '#FF2A85'],
      neonPrimary: '#00E5FF',
      neonSecondary: '#A855F7',
      floorColor: '#1E284A',
      archStyle: 'spiral',
    },
    walkZones: [
      { id: 'left', minX: 95, maxX: 485, y: 608, minY: 568, maxY: 648 },
      { id: 'right', minX: 760, maxX: 1155, y: 608, minY: 568, maxY: 648 },
    ],
    zoneLinks: [{ from: 'left', to: 'right', flag: 'platform_down' }],
    thomasStart: { x: 245, y: 608, zoneId: 'left' },
    torqStart: { x: 405, y: 608, zoneId: 'left' },
    initialFlags: {
      drone_shrunk: false,
      pest_white_gone: false,
      polarity_set: false,
      platform_down: false,
    },
    initialHotspots: [
      {
        id: 'shadow_l',
        name: 'Тень у перил',
        visual: 'shadow_pad',
        x: 115,
        y: 550,
        w: 100,
        h: 75,
        zoneId: 'left',
        remoteMagic: true,
        shadowDest: { zoneId: 'right', x: 830, y: 608 },
      },
      {
        id: 'shadow_r',
        name: 'Тень за спиной дрона',
        visual: 'shadow_pad',
        x: 785,
        y: 550,
        w: 100,
        h: 75,
        zoneId: 'right',
        remoteMagic: true,
        shadowDest: { zoneId: 'left', x: 165, y: 608 },
      },
      {
        id: 'magnet_switch',
        name: 'Магнитный рубильник',
        visual: 'magnet_switch',
        x: 335,
        y: 455,
        w: 95,
        h: 125,
        zoneId: 'left',
        remoteMagic: true,
      },
      {
        id: 'pest_white',
        name: 'Белый кот-вредитель Снежок',
        visual: 'pest_cat',
        coatColor: 'white',
        x: 345,
        y: 405,
        w: 80,
        h: 85,
        zoneId: 'left',
        remoteMagic: true,
      },
      {
        id: 'magnet_platform',
        name: 'Парящая магнитная платформа',
        visual: 'magnet_platform',
        x: 495,
        y: 210,
        w: 265,
        h: 65,
        zoneId: 'left',
        remoteMagic: true,
      },
      {
        id: 'drone_pug',
        name: 'Патрульный Дрон-Мопс',
        visual: 'drone_pug',
        x: 925,
        y: 500,
        w: 110,
        h: 95,
        zoneId: 'right',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'door',
        name: 'Магнитный шлюз',
        visual: 'door',
        x: 1015,
        y: 245,
        w: 175,
        h: 300,
        zoneId: 'right',
        remoteMagic: true,
      },
    ],
    hints: [
      'Белый вредитель Снежок оккупировал магнитный рубильник — истрепите его причёску статикой или снимите телекинезом! И не забудьте уменьшить Дрона-Мопса.',
      '1) Томас: «Уменьшение» на Дрона-Мопса. 2) Томас («Телекинез») или Торквемада («Хакер-ток») на Белого Снежка. 3) Торквемада: «Хакер-ток» на Магнитный рубильник. 4) Томас: «Телекинез» на Магнитный рубильник. 5) Торквемада перебегает и жмёт «Хакер-ток» на Магнитный шлюз!',
    ],
    onInteract: (ctx) => {
      const { cat, spell, skill, hotspot, state, say, spawnParticles, spawnBeam, spawnFlight, triggerCaught, triggerWin, playSound } = ctx;
      const thomas = state.thomas;

      if (cat === 'thomas' && spell === 'shadow' && hotspot.shadowDest) {
        playSound('shadow');
        spawnParticles(thomas.x, thomas.y - 30, '#A855F7', 'star', 16);
        thomas.zoneId = hotspot.shadowDest.zoneId;
        thomas.x = hotspot.shadowDest.x;
        thomas.y = hotspot.shadowDest.y;
        thomas.targetX = thomas.x;
        thomas.targetY = thomas.y;
        thomas.state = 'shadow_in';
        thomas.stateTimer = 0.45;
        spawnParticles(thomas.x, thomas.y - 30, '#A855F7', 'star', 18);
        return;
      }

      if (hotspot.id === 'pest_white') {
        if (cat === 'torquemada' && skill === 'hack') {
          hotspot.hidden = true;
          state.flags.pest_white_gone = true;
          playSound('hack');
          spawnFlight({
            spriteKey: 'cat_white',
            fromX: hotspot.x + 40,
            fromY: hotspot.y + 40,
            toX: 60,
            toY: 360,
            duration: 0.6,
            arcHeight: 95,
            scaleFrom: 1,
            scaleTo: 0.35,
            spin: -9,
            fadeOut: true,
          });
          spawnParticles(hotspot.x + 40, hotspot.y + 40, '#00E5FF', 'spark', 18);
          say('torquemada', 'Белый Снежок взвыл: «Фи, статика испортила мне укладку!» — и удрал!');
          return;
        }
        if (cat === 'thomas' && (spell === 'telekinesis' || spell === 'shrink')) {
          hotspot.hidden = true;
          state.flags.pest_white_gone = true;
          playSound(spell === 'shrink' ? 'shrink' : 'telekinesis');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 40, hotspot.y + 40, '#C084FC');
          spawnFlight({
            spriteKey: 'cat_white',
            fromX: hotspot.x + 40,
            fromY: hotspot.y + 40,
            toX: 60,
            toY: 360,
            duration: 0.65,
            arcHeight: 80,
            scaleFrom: 1,
            scaleTo: 0.25,
            spin: -7,
            fadeOut: true,
          });
          spawnParticles(hotspot.x + 40, hotspot.y + 40, '#E2E8F0', 'dust', 16);
          say('thomas', 'Сбросили белого вредителя с рубильника!');
          return;
        }
        playSound('error');
        say('torquemada', 'Снежок надулся: «Не подходи! Я тут любуюсь спиралями!»');
        return;
      }

      if (hotspot.id === 'drone_pug') {
        if (cat === 'thomas' && spell === 'shrink') {
          hotspot.sizeState = 'small';
          hotspot.active = true;
          hotspot.name = 'Игрушечный мини-мопс';
          state.flags.drone_shrunk = true;
          playSound('shrink');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 55, hotspot.y + 45, '#38BDF8');
          spawnParticles(hotspot.x + 55, hotspot.y + 45, '#38BDF8', 'star', 18);
          say('thomas', 'Хи-хи! Теперь этот грозный охранник пищит как резиновая уточка!');
          return;
        }
        if (!state.flags.drone_shrunk) {
          playSound('dog_wake');
          triggerCaught('Тяв-Сирена!', 'Дрон-Мопс поднял тревогу при приближении! Надо его уменьшить магией!');
          return;
        }
        say('torquemada', 'Какой милый карманный робо-мопсик!');
        return;
      }

      if (hotspot.id === 'magnet_switch') {
        if (!state.flags.pest_white_gone) {
          playSound('error');
          say('torquemada', 'На рубильнике уселся Белый Снежок и не пускает к кнопкам!');
          return;
        }
        if (cat === 'torquemada' && skill === 'hack') {
          state.flags.polarity_set = true;
          hotspot.active = true;
          state.torq.state = 'shock';
          state.torq.stateTimer = 0.45;
          playSound('hack');
          spawnParticles(hotspot.x + 45, hotspot.y + 55, '#00E5FF', 'spark', 18);
          say('torquemada', 'Полярность сменил! Но рубильник зажат тугой скобой — дёргай, Томас!');
          return;
        }
        if (cat === 'thomas' && spell === 'telekinesis') {
          if (!state.flags.polarity_set) {
            playSound('error');
            say('thomas', 'Сначала Торквемада должен сменить полярность током!');
            return;
          }
          state.flags.platform_down = true;
          const mp = state.hotspots.find((h) => h.id === 'magnet_platform');
          if (mp) {
            mp.active = true;
            mp.targetY = 560;
          }
          playSound('unlock');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 55, '#C084FC');
          spawnParticles(625, 565, '#00E5FF', 'star', 22);
          say('thomas', 'Мост опускается к полу! Можно бежать!');
          return;
        }
      }

      if (hotspot.id === 'door') {
        if (!state.flags.platform_down) {
          playSound('error');
          say('torquemada', 'Мост ещё под потолком!');
          return;
        }
        if (!state.flags.drone_shrunk) {
          playSound('dog_wake');
          triggerCaught('Дрон-Мопс поймал!', 'Нельзя бежать мимо полноразмерного Дрона-Мопса — уменьши его сначала!');
          return;
        }
        if (cat === 'torquemada' && (skill === 'hack' || skill === 'paws')) {
          if (skill === 'paws') {
            playSound('error');
            say('torquemada', 'Магнитный замок требует «Хакер-тока»!');
            return;
          }
          playSound('hack');
          hotspot.active = true;
          spawnParticles(hotspot.x + 45, hotspot.y + 110, '#00E5FF', 'spark', 24);
          triggerWin(LEVELS[8].winQuote);
          return;
        }
      }

      defaultWrongReaction(ctx);
    },
  },

  // ============================================================================
  // LEVEL 10: Врата Свободы («Побег из башни — Реванш Пса»)
  // ============================================================================
  {
    id: 10,
    title: 'Врата Свободы',
    subtitle: 'Уровень 10 · Финальный реванш пса',
    introQuote: '«Вот и выход в Звёздную Ночь! Но наш знакомый Пёс Баскервиль спустился на лифте и снова храпит у главных врат!»',
    winQuote: 'Баскервиль с восторгом унёсся за гигантской костью, древние врата распахнулись, и Томас с Торквемадой выбежали на свободу под вихревым небом Ван Гога!',
    theme: {
      skyTop: '#050C24',
      skyMid: '#183675',
      wallBase: '#192140',
      wallStroke: '#465BA3',
      mosaicColors: ['#F5B82E', '#00E5FF', '#FF2A85', '#7EE081'],
      neonPrimary: '#F5B82E',
      neonSecondary: '#00E5FF',
      floorColor: '#212A4D',
      archStyle: 'gate',
    },
    walkZones: [
      { id: 'main', minX: 95, maxX: 830, y: 640, minY: 598, maxY: 675 },
      { id: 'gate_zone', minX: 830, maxX: 1155, y: 640, minY: 598, maxY: 675, requiresFlag: 'dog_distracted' },
    ],
    zoneLinks: [{ from: 'main', to: 'gate_zone', flag: 'dog_distracted' }],
    thomasStart: { x: 350, y: 640, zoneId: 'main' },
    torqStart: { x: 495, y: 640, zoneId: 'main' },
    initialFlags: {
      bone_big: false,
      bone_loaded: false,
      dog_distracted: false,
      scanner_hacked: false,
    },
    initialHotspots: [
      {
        id: 'holo_steak',
        name: 'Пульт катапульты и голо-витрина',
        visual: 'holo_steak',
        x: 165,
        y: 455,
        w: 110,
        h: 150,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'toy_bone',
        name: 'Резиновая косточка на балке',
        visual: 'toy_bone',
        x: 385,
        y: 175,
        w: 90,
        h: 65,
        zoneId: 'main',
        remoteMagic: true,
        sizeState: 'normal',
      },
      {
        id: 'catapult',
        name: 'Старинная катапульта',
        visual: 'catapult',
        x: 525,
        y: 515,
        w: 145,
        h: 105,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'dog',
        name: 'Броне-пёс Баскервиль',
        visual: 'dog',
        x: 840,
        y: 540,
        w: 175,
        h: 115,
        zoneId: 'main',
        remoteMagic: true,
      },
      {
        id: 'bio_scanner',
        name: 'Био-сканер Врат',
        visual: 'bio_scanner',
        x: 945,
        y: 455,
        w: 75,
        h: 105,
        zoneId: 'gate_zone',
        remoteMagic: true,
      },
      {
        id: 'helm_wheel',
        name: 'Древний Штурвал Врат',
        visual: 'helm_wheel',
        x: 1015,
        y: 185,
        w: 185,
        h: 425,
        zoneId: 'gate_zone',
        remoteMagic: true,
      },
    ],
    hints: [
      'Сделайте резиновую кость гигантской, зарядите её в катапульту и запустите с пульта. Когда пёс убежит за ней — взломайте био-сканер и поверните штурвал магией!',
      '1) Томас: «Увеличение», затем «Телекинез» на Резиновую косточку. 2) Торквемада: «Хакер-ток» на Пульт катапульты (слева). 3) Торквемада: «Хакер-ток» на Био-сканер у врат. 4) Томас: «Телекинез» на Древний Штурвал Врат!',
    ],
    onInteract: (ctx) => {
      const { cat, spell, skill, hotspot, state, say, spawnParticles, spawnBeam, spawnFlight, triggerCaught, triggerWin, playSound } = ctx;
      const thomas = state.thomas;

      if (hotspot.id === 'toy_bone') {
        if (cat === 'thomas' && spell === 'enlarge') {
          hotspot.sizeState = 'large';
          hotspot.name = 'Гигантская Мега-Кость';
          state.flags.bone_big = true;
          playSound('enlarge');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 30, '#F5B82E');
          spawnParticles(hotspot.x + 45, hotspot.y + 30, '#F5B82E', 'star', 20);
          say('thomas', 'Вот это Мега-Кость! Теперь положу её в катапульту!');
          return;
        }
        if (cat === 'thomas' && spell === 'telekinesis') {
          if (!state.flags.bone_big) {
            playSound('error');
            say('thomas', 'Мелковата приманка — Баскервиль даже не взглянет. Увеличь кость сначала!');
            return;
          }
          hotspot.hidden = true;
          const catHs = state.hotspots.find((h) => h.id === 'catapult');
          playSound('telekinesis');
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 45, hotspot.y + 30, '#C084FC');
          spawnFlight({
            spriteKey: 'prop_bone',
            fromX: hotspot.x + 45,
            fromY: hotspot.y + 30,
            toX: 595,
            toY: 545,
            duration: 0.72,
            arcHeight: 60,
            scaleFrom: 1.4,
            scaleTo: 1.15,
            spin: 8,
            onArrive: () => {
              state.flags.bone_loaded = true;
              if (catHs) catHs.active = true;
              spawnParticles(595, 545, '#F5B82E', 'dust', 16);
            },
          });
          say('thomas', 'Мега-Кость заряжена! Торквемада, жми пуск на пульте слева!');
          return;
        }
      }

      if (hotspot.id === 'holo_steak') {
        if (cat === 'torquemada' && skill === 'hack') {
          if (!state.flags.bone_loaded) {
            playSound('error');
            say('torquemada', 'Катапульта пуста! Надо зарядить её гигантской костью!');
            return;
          }
          state.flags.dog_distracted = true;
          hotspot.active = true;
          state.torq.state = 'shock';
          state.torq.stateTimer = 0.45;
          const dogHs = state.hotspots.find((h) => h.id === 'dog');
          if (dogHs) {
            dogHs.targetX = 120;
            dogHs.active = true;
            dogHs.name = 'Счастливый пёс с Мега-Костью';
          }
          playSound('hack');
          playSound('enlarge');
          spawnFlight({
            spriteKey: 'prop_bone',
            fromX: 595,
            fromY: 535,
            toX: 165,
            toY: 615,
            duration: 0.9,
            arcHeight: 220,
            scaleFrom: 1.2,
            scaleTo: 1.35,
            spin: 14,
            onArrive: () => spawnParticles(165, 615, '#F5B82E', 'heart', 18),
          });
          spawnParticles(210, 520, '#F5B82E', 'heart', 16);
          say('dog', 'ГАВ-МНЯМ!! ВОТ ЭТО КОСТОЧКА! Я ЗАНЯТ!');
          return;
        }
      }

      if (hotspot.id === 'dog') {
        if (!state.flags.dog_distracted) {
          playSound('dog_wake');
          triggerCaught('Финальный кусь!', 'Баскервиль в бронеошейнике начеку! Отвлеки его гигантской костью из катапульты!');
          return;
        }
        say('torquemada', 'Теперь у него дел на всю ночь — пусть грызёт!');
        return;
      }

      if (hotspot.id === 'bio_scanner') {
        if (cat === 'torquemada' && skill === 'hack') {
          state.flags.scanner_hacked = true;
          hotspot.active = true;
          state.torq.state = 'shock';
          state.torq.stateTimer = 0.45;
          playSound('hack');
          spawnParticles(hotspot.x + 35, hotspot.y + 50, '#00E5FF', 'spark', 20);
          say('torquemada', 'Био-сканер взломан! Томас, крути огромный штурвал телекинезом!');
          return;
        }
      }

      if (hotspot.id === 'helm_wheel') {
        if (cat === 'torquemada') {
          state.torq.state = 'strain';
          state.torq.stateTimer = 0.65;
          playSound('strain');
          say('torquemada', 'Этот штурвал весит тонну! Томас, нужна твоя магия!');
          return;
        }
        if (cat === 'thomas' && spell === 'telekinesis') {
          if (!state.flags.dog_distracted) {
            playSound('dog_wake');
            triggerCaught('Рано крутишь!', 'Баскервиль услышал скрип штурвала и бросился на котов!');
            return;
          }
          if (!state.flags.scanner_hacked) {
            playSound('error');
            say('thomas', 'Штурвал заблокирован электроникой — Торквемада должен взломать био-сканер!');
            return;
          }
          playSound('win');
          hotspot.active = true;
          spawnBeam(thomas.x, thomas.y - 35, hotspot.x + 55, hotspot.y + 115, '#F5B82E');
          spawnParticles(hotspot.x + 55, hotspot.y + 115, '#F5B82E', 'star', 34);
          triggerWin(LEVELS[9].winQuote);
          return;
        }
      }

      defaultWrongReaction(ctx);
    },
  },
];
