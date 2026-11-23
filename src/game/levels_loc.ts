export const GAME_TRANSLATIONS: Record<'en' | 'es', Record<string, string>> = {
  en: {
    // Shared wrong-reaction messages
    'Туда через тень не прыгнуть — мне нужна тёмная тень-портал!':
      "I can't shadow-hop there — I need a dark shadow portal!",
    'Свинцовая преграда мешает магии! Надо прыгнуть в тень поближе.':
      'A lead barrier is blocking my magic! I need to shadow-hop closer.',

    // Level 1
    'Камера под крышей': 'Attic Tower Cell',
    'Уровень 1 · Сон сторожевого пса': 'Chapter 1 · Watchdog’s Slumber',
    '«Мы в самой верхней камере башни! У двери храпит кибер-пёс Баскервиль — один лишний звон, и он откусит нам хвосты!»':
      '“We’re locked in the topmost tower cell! Cyber-hound Baskerville is snoring by the door — one loud clank and he’ll bite our tails off!”',
    'Ключ провернулся бесшумно! Баскервиль сладко спит в наушниках, а коты проскальзывают на лестницу.':
      'The key turned without a sound! Baskerville dreams sweetly in his headphones as the cats slip onto the spiral stairs.',
    'Глубокая тень под аркой': 'Deep Shadow Under the Arch',
    'Тень за решёткой': 'Shadow Behind the Bars',
    'Тяжёлый ключ за решёткой': 'Heavy Key Behind the Bars',
    'Маленькая подушка': 'Small Pillow',
    'Ключ на подушке': 'Key on the Pillow',
    'Неоновый аудио-щиток': 'Neon Audio Panel',
    'Спящий пёс Баскервиль': 'Sleeping Hound Baskerville',
    'Тяжёлая дверь с замком': 'Heavy Locked Door',
    'Томас может увеличить подушку, прыгнуть в тень за решётку и сбросить ключ без шума. А Торквемада не боится тока в аудио-щитке!':
      'Thomas can enlarge the pillow, shadow-hop behind the bars, and drop the key silently. Torquemada isn’t afraid of live voltage in the audio panel!',
    '1) Томас: «Увеличение» на Подушку. 2) Томас: «Тень-прыжок» в левую тень, затем «Телекинез» на Ключ. 3) Томас: «Тень-прыжок» обратно. 4) Торквемада: «Лапки» на Ключ, затем «Хакер-ток» на Аудио-щиток. 5) Торквемада вставляет Ключ в Дверь, а Томас крутит его «Телекинезом»!':
      '1) Thomas: Enlarge on the Pillow. 2) Thomas: Shadow Hop into the left shadow, then Telekinesis on the Key. 3) Thomas: Shadow Hop back. 4) Torquemada: Paws on the Key, then Hacker Spark on the Audio Panel. 5) Torquemada puts the Key in the Door, and Thomas turns it with Telekinesis!',
    'Шмыг из тени в тень — и я за решёткой!':
      'Zip from shadow to shadow — I’m inside the cage!',
    'Обратно в главный зал!': 'Back to the main hall!',
    'Подушка уже размером с королевскую перину!':
      'The pillow is already as huge as a royal featherbed!',
    'Огромная мягкая перина': 'Giant Soft Featherbed',
    'Пух-магия! Теперь даже наковальня упадёт бесшумно!':
      'Fluff magic! Now even an anvil would land without a whisper!',
    'Ой, скукожилась до мышиной подушечки.':
      'Oops, it shrank down to a mouse-sized cushion.',
    'Свинцовая решётка глушит чары! Надо попасть внутрь через тень.':
      'The lead bars block my spell! I must get inside through a shadow.',
    'БРЯК!! ГАВ-ТРЕВОГА! КТО ГРЕМИТ?!':
      'CLANG!! WOOF-ALERT! WHO IS MAKING THAT RACKET?!',
    'Бряк! Пёс проснулся!': 'Clang! The Hound Woke Up!',
    'Тяжёлый ключ с грохотом упал на каменный пол! Надо было сначала увеличить подушку внизу.':
      'The heavy key crashed onto the stone floor! You should have enlarged the pillow below first.',
    'Мягко приземлился на перину! Пёс даже ухом не повёл!':
      'Soft landing on the featherbed! The hound didn’t even twitch an ear!',
    'Тяжёлый ключ': 'Heavy Key',
    'Массивный бронзовый ключ от двери камеры':
      'A chunky bronze key for the cell door',
    'Хвать лапками! Теперь ключ у меня.': 'Snatched with my paws! Got the key.',
    'Я маг, железки лапами не таскаю — пусть Торквемада возьмёт!':
      'I’m a mage, I don’t haul scrap iron — let Torquemada grab it!',
    'Колыбельная уже играет на всю громкость с шумоподавлением!':
      'The noise-canceling lullaby is already blasting at full cozy volume!',
    'Крепко спящий пёс (в наушниках)':
      'Deeply Sleeping Hound (in Headphones)',
    'Мр-р-р, 220 Вольт бодрят! Врубил псу голо-колыбельную на уши!':
      'Purr-zap, 220 Volts feel refreshing! Wired a holo-lullaby straight to the dog’s ears!',
    'Тут оголённый ток! Надо использовать мой «Хакер-ток», а не просто тыкать лапкой.':
      'Exposed live wires! Better use Hacker Spark, not bare paws.',
    'Кусь за хвост!': 'Tail Chomp!',
    'Ты пощекотал Баскервиля телекинезом! Он мгновенно проснулся и погнался за котами.':
      'You tickled Baskerville with telekinesis! He snapped awake and chased both cats.',
    'Разбудили зверя!': 'You Woke the Beast!',
    'Нельзя подходить к сторожевому псу, пока он слышит каждый шорох!':
      'Never approach the watchdog while he can hear every rustle!',
    'Храпит как трактор под «Колыбельной звёздной ночи»!':
      'Snoring like a tractor to the “Starry Night Lullaby”!',
    'Ключ вставил!.. Уф-ф, не хватает сил провернуть! Томас, крути телекинезом!':
      'Key’s in!.. Ugh, too stiff to turn! Thomas, twist it with telekinesis!',
    'Заперто! Сначала нужен ключ.': 'Locked tight! Need a key first.',
    'Крях-пых! Замок заржавел намертво — без магии Томаса не провернуть!':
      'Huff-puff! The lock is rusted shut — won’t budge without Thomas’s magic!',
    'Нечего поворачивать — Торквемада ещё не вставил ключ в замочную скважину!':
      'Nothing to turn yet — Torquemada hasn’t put the key in the keyhole!',
    'Щелчок разбудил пса!': 'The Click Woke the Hound!',
    'Замок громко щёлкнул прямо над ухом Баскервиля! Сначала усыпи его аудио-щитком.':
      'The lock clicked loudly right by Baskerville’s ear! Put him to sleep via the audio panel first.',

    // Level 2
    'Мастерская Алхимика': 'Alchemist’s Cyber-Lab',
    'Уровень 2 · Искра и Колба': 'Chapter 2 · Spark & Flask',
    '«Внизу шипит неоновая кислота, а мост поднят гигантской гирей. Нужен ток и магия!»':
      '“Neon acid hisses below, and the drawbridge is held up by a giant counterweight. We need juice and magic!”',
    'Мост с лязгом опустился над кислотным рвом, и двери лифта гостеприимно распахнулись.':
      'The plank bridge clanked down across the acid trench, and the elevator doors slid warmly open.',
    'Тень под столом': 'Shadow Under the Desk',
    'Тень у колбы': 'Shadow by the Flask',
    'Генератор лебёдки': 'Winch Generator',
    'Оголённый силовой кабель': 'Exposed Power Cable',
    'Неоновый предохранитель': 'Neon Fuse',
    'Свинцовый противовес': 'Lead Counterweight',
    'Подъёмный мост': 'Drawbridge',
    'Пневмо-ящик с деталью': 'Pneumatic Supply Crate',
    'Рыжий кот-помощник Архимед': 'Ginger Helper Cat Archimedes',
    'Грузовой лифт вниз': 'Cargo Elevator Down',
    'Рыжий кот Архимед подскажет про гирю! Томас может перепрыгнуть через ров по теням, чтобы достать предохранитель из ящика, и уменьшить тяжёлый противовес.':
      'Archimedes the ginger cat knows about the weight! Thomas can shadow-hop across the trench to pull the fuse out of the crate, then shrink the heavy counterweight.',
    '1) Томас: «Тень-прыжок» на правый берег, затем «Телекинез» на Ящик. 2) Торквемада берёт Предохранитель, вставляет в Генератор и жмёт «Хакер-ток» на Оголённый кабель. 3) Томас применяет «Уменьшение» на Противовес. 4) Торквемада переходит мост и взламывает Лифт!':
      '1) Thomas: Shadow Hop to the right ledge, then Telekinesis on the Crate. 2) Torquemada picks up the Fuse, puts it in the Generator, and uses Hacker Spark on the Exposed Cable. 3) Thomas casts Shrink on the Counterweight. 4) Torquemada crosses the bridge and hacks the Elevator!',
    'Ура! Мостик опущен — путь через кислоту открыт!':
      'Hooray! The bridge is down — the path across the acid is clear!',
    'Перелетел через кислотный ров!': 'Hopped right across the acid moat!',
    'Я снова на левом берегу.': 'Back on the left ledge.',
    'Отсюда пневмо-ящик не открыть — прыгни в тень на ту сторону!':
      'Can’t pry the pneumatic crate from here — shadow-hop to the far side!',
    'Ящик уже пуст!': 'The crate is already empty!',
    'Хоп! Предохранитель перелетел по воздуху прямо к Торквемаде!':
      'Alley-oop! The fuse sailed right across to Torquemada!',
    'Предохранитель': 'Neon Fuse',
    'Светящаяся колба для генератора': 'Glowing glass fuse for the winch generator',
    'Отличная деталька! Как раз для генератора.':
      'Sweet component! Fits the generator right in.',
    'Предохранитель на месте! Теперь надо пустить ток по кабелю!':
      'Fuse is seated! Now let’s surge power through the cable!',
    'В генераторе пустое гнездо — нужен предохранитель!':
      'Empty fuse socket in the generator — we need a fuse!',
    'Предохранитель уже стоит, осталось замкнуть оголённый кабель!':
      'The fuse is already in — just zap the exposed power cable!',
    'Ух, щекотно! Но генератор не включается без предохранителя!':
      'Ooh, ticklish! Still, the generator won’t start without a fuse!',
    'Лебёдка гудит на полную, но противовес слишком тяжёлый!':
      'The winch is roaring at max power, but that counterweight is way too heavy!',
    'Крошечная гирька': 'Tiny Weight',
    'Гиря стала как орешек! Осталось включить лебёдку!':
      'The counterweight shrank to the size of a hazelnut! Now fire up the winch!',
    'Туда не пройти — ров с кислотой шипит! Надо опустить мост.':
      'No crossing yet — the acid trench is sizzling! Lower the bridge first.',
    'Панель лифта зашифрована — нужен «Хакер-ток»!':
      'Elevator keypad is encrypted — hit it with Hacker Spark!',
    'Рыжий Архимед мурлычет: «Предохранитель заперт в ящике за рвом, а противовес надо уменьшить магией!»':
      'Ginger Archimedes purrs: “The fuse is locked in the crate across the moat, and the counterweight needs shrinking magic!”',

    // Level 3
    'Обсерватория Звёздной Ночи': 'Starry Night Observatory',
    'Уровень 3 · Спираль Ван Гога': 'Chapter 3 · Van Gogh’s Spiral',
    '«Витражный купол кружится звёздами, но дверь заперта на световой фотоэлемент. Поймаем лунный луч!»':
      '“The stained-glass dome swirls with stars, yet the door is sealed by a light photocell. Let’s catch a moonbeam!”',
    'Золотой луч Ван Гога ударил в фотоэлемент, и мозаичная дверь-спираль плавно раскрылась.':
      'A golden Van Gogh beam struck the photocell, and the mosaic spiral door glided wide open.',
    'Терминал купола': 'Dome Control Terminal',
    'Древний кибер-телескоп': 'Ancient Cyber-Telescope',
    'Полосатый вредитель Шкода': 'Tabby Pest Rascal',
    'Крошечная линза': 'Tiny Lens',
    'Звёздное кольцо-отражатель': 'Star Reflector Ring',
    'Тяжёлая заглушка фотоэлемента': 'Heavy Photocell Plug',
    'Солнечный фотоэлемент': 'Solar Photocell',
    'Дверь-спираль': 'Spiral Door',
    'На телескопе развалился полосатый вредитель Шкода — сгоните его магией (телекинезом или уменьшением). Затем откройте купол, увеличьте линзу, поверните кольцо и уберите заглушку!':
      'Tabby pest Rascal is lounging right on the telescope — shoo him away with magic (Telekinesis or Shrink). Then open the dome, enlarge the lens, turn the reflector ring, and remove the plug!',
    '1) Томас: «Телекинез» или «Уменьшение» на Полосатого Шкоду. 2) Торквемада: «Хакер-ток», затем «Лапки» на Терминал. 3) Томас: «Увеличение» на Линзу. 4) Томас: «Телекинез» на Звёздное кольцо. 5) Томас: «Уменьшение» на Заглушку фотоэлемента!':
      '1) Thomas: Telekinesis or Shrink on Tabby Rascal. 2) Torquemada: Hacker Spark, then Paws on the Dome Terminal. 3) Thomas: Enlarge on the Tiny Lens. 4) Thomas: Telekinesis on the Star Reflector Ring. 5) Thomas: Shrink on the Photocell Plug!',
    'Полосатый Шкода стал как мышонок и с писком удрал в норку!':
      'Tabby Rascal shrank to mouse-size and squeaked off into a hidey-hole!',
    'Аккуратно снял полосатого хулигана с телескопа телекинезом!':
      'Gently lifted the striped troublemaker right off the telescope with telekinesis!',
    'Ш-ш-ш! Полосатый Шкода шипит и бьёт меня лапой по носу! Томас, сними его магией!':
      'Hiss! Tabby Rascal swatted me right on the nose! Thomas, lift him off with magic!',
    'Защита уже снята — теперь просто нажми кнопку лапками!':
      'Security is already bypassed — just press the button with Paws!',
    'Пароль взломан! Нажму «Лапки», чтобы раскрыть люк купола.':
      'Password cracked! I’ll use Paws now to open the dome hatch.',
    'Терминал под паролем! Сначала взломай его «Хакер-током».':
      'Terminal is password-locked! Crack it with Hacker Spark first.',
    'Купол открыт! Звёздный свет полился на телескоп!':
      'Dome open! Starlight is pouring down onto the telescope!',
    'Полосатый вредитель сидит прямо на трубе и сбивает прицел! Сначала убери его!':
      'That tabby pest is sitting right on the scope throwing off the aim! Clear him first!',
    'Гигантская хрустальная линза': 'Giant Crystal Lens',
    'Ого, какая огромная линза! Теперь луч станет в десять раз ярче!':
      'Whoa, what a massive lens! Now the starbeam will shine ten times brighter!',
    'Повернул кольцо точно на фотоэлемент!':
      'Angled the reflector ring dead-on at the photocell!',
    'Заглушка сжалась и вывалилась! Фотоэлемент открыт!':
      'The plug shrank and popped right out! The photocell is exposed!',
    'Фотоэлементу нужен полный звёздный луч: люк, большая линза, наведённое кольцо и снятая заглушка.':
      'The photocell needs the complete starbeam: open hatch, giant lens, aimed ring, and unplugged sensor.',

    // Level 4
    'Органный Зал Гауди': 'Gaudí’s Organ Hall',
    'Уровень 4 · Резонанс труб': 'Chapter 4 · Pipe Resonance',
    '«Керамические трубы изогнулись до самого потолка. Чтобы открыть акустические врата, нужен двойной аккорд!»':
      '“Ceramic organ pipes coil up to the vaulted ceiling. Opening the acoustic gates will take a two-cat chord!”',
    'Полифонический аккорд сотряс мозаику Гауди, и акустический замок рассыпался в мелодичный звон.':
      'A rich polyphonic chord shook the Gaudí mosaics, shattering the acoustic seal into chiming echoes.',
    'Оборванные провода органа': 'Severed Organ Wires',
    'Левая педаль-клавиша': 'Left Organ Pedal Key',
    'Огромная пробка в трубе': 'Huge Pipe Cork',
    'Правая педаль-клавиша': 'Right Organ Pedal Key',
    'Маленький колокол-резонатор': 'Small Resonator Bell',
    'Белая кошка-помощница Сопрано': 'White Helper Cat Soprano',
    'Акустические врата': 'Acoustic Gates',
    'Орган нужно починить (провода, пробка в трубе, размер резонатора), а затем нажать ОБЕ клавиши одновременно: Торквемада зажимает левую, Томас нажимает правую магией!':
      'Repair the organ first (wires, pipe cork, resonator size), then strike BOTH keys together: Torquemada holds the left pedal while Thomas hits the right with magic!',
    '1) Торквемада: «Хакер-ток» на Оборванные провода. 2) Томас: «Уменьшение» на Пробку в трубе. 3) Томас: «Увеличение» на Колокол-резонатор. 4) Торквемада: «Лапки» на Левую клавишу. 5) Томас: «Телекинез» на Правую клавишу!':
      '1) Torquemada: Hacker Spark on the Severed Wires. 2) Thomas: Shrink on the Pipe Cork. 3) Thomas: Enlarge on the Resonator Bell. 4) Torquemada: Paws on the Left Pedal Key. 5) Thomas: Telekinesis on the Right Pedal Key!',
    'Усы дыбом, зато электромеханика органа снова поёт!':
      'Whiskers frizzed up, but the organ’s electrics are singing again!',
    'Чпок! Пробка сжалась и вылетела — труба дышит свободно!':
      'Pop! The cork shrank and shot out — the pipe breathes free!',
    'Мощный резонатор-колокол': 'Mighty Resonator Bell',
    'Вот это колокол! Теперь звук пробьёт любую дверь!':
      'Now THAT’S a bell! The resonance will rattle every lock!',
    'Клавиша молчит — сначала соедини оборванные провода!':
      'The key is dead — splice those severed wires first!',
    'Держу левую клавишу! Томас, быстро жми правую телекинезом!':
      'Holding the left pedal down! Thomas, hit the right one with telekinesis!',
    'Провода оборваны — орган обесточен!':
      'Wires are snapped — the organ has no power!',
    'Хрипит! Пробка в центральной трубе портит ноту!':
      'Wheezing! That cork jammed in the center pipe ruins the note!',
    'Звук слишком тихий — надо увеличить колокол-резонатор!':
      'Too quiet — enlarge the resonator bell!',
    'Одной ноты мало! Пусть Торквемада сначала зажмёт левую клавишу лапками!':
      'One note isn’t enough! Have Torquemada hold the left key with his paws first!',
    'Белая кошка Сопрано напевает: «Мур-ля-си! Уберите пробку, увеличьте колокол и берите двойной аккорд одновременно!»':
      'White cat Soprano trills: “Purr-la-ti! Clear the cork, enlarge the bell, and strike a two-cat chord together!”',

    // Level 5
    'Часовая Шестерёночная': 'Clockwork Gear Tower',
    'Уровень 5 · Время вспять': 'Chapter 5 · Time Reversed',
    '«Огромный маятник раскачивается над бездной, а выход скрыт за потайным циферблатом!»':
      '“A colossal pendulum swings above the abyss, and the exit hides behind a secret clock face!”',
    'Стрелки помчались в прошлое, открывая потайной люк в недрах часовой башни!':
      'The clock hands spun backward through time, unlatching a secret hatch inside the belfry!',
    'Потайной люк-циферблат': 'Secret Clock-Face Hatch',
    'Тяжёлая часовая гиря': 'Heavy Clock Weight',
    'Ось хроно-замка': 'Chrono-Lock Spindle',
    'Большая шестерёнка': 'Large Gear',
    'Хроно-генератор': 'Chrono-Generator',
    'Тень у пропасти': 'Shadow by the Abyss',
    'Тень за маятником': 'Shadow Beyond the Pendulum',
    'Крошечная шестерёнка': 'Tiny Gear',
    'На правом краю лежит слишком мелкая шестерёнка — её нужно увеличить и перебросить Торквемаде. А ось часов заклинила гиря!':
      'Across the gap lies a gear that’s way too small — enlarge it and fling it over to Torquemada. Meanwhile, a heavy weight jams the clock spindle!',
    '1) Томас: «Тень-прыжок» вправо, «Увеличение» на Шестерёнку, затем «Телекинез» на неё, и «Тень-прыжок» обратно. 2) Томас: «Уменьшение» на Гирю. 3) Торквемада: берёт Большую шестерёнку, вставляет в Ось и бьёт «Хакер-током» по Хроно-генератору!':
      '1) Thomas: Shadow Hop right, Enlarge on the Tiny Gear, Telekinesis to toss it over, then Shadow Hop back. 2) Thomas: Shrink on the Clock Weight. 3) Torquemada picks up the Large Gear, slots it onto the Spindle, and hits the Chrono-Generator with Hacker Spark!',
    'Нырнул мимо маятника!': 'Ducked right past the pendulum!',
    'Снова на основной платформе!': 'Back on the main platform!',
    'Слишком далеко и маятник глушит чары — прыгни в тень!':
      'Too far, and the pendulum scrambles magic — shadow-hop across!',
    'Огромная шестерёнка': 'Oversized Gear',
    'Выросла как раз под часовую ось! Теперь переброшу её!':
      'Grew to fit the clock spindle! Time to toss it across!',
    'Она пока размером с пуговицу — сначала увеличь её!':
      'It’s barely button-sized right now — enlarge it first!',
    'Полетела через пропасть к Торквемаде!':
      'Sailed across the chasm straight to Torquemada!',
    'Зубчатое колесо для хроно-замка': 'Toothed cogwheel for the chrono-lock',
    'Увесистая! Щас воткнём в механизм.':
      'Hefty! Let’s slot this into the clockwork.',
    'Гиря стала крошкой — зажим оси ослаб!':
      'The weight shrank to a pebble — the axle clamp loosened!',
    'Шестерёнка встала как родная! Осталось подать искру в генератор.':
      'Gear clicked in like a charm! Just need a spark in the generator.',
    'В механизме не хватает шестерёнки!':
      'The clockwork is missing a gear!',
    'Искры летят, но тяжёлая гиря заклинила ось! Уменьши её, Томас!':
      'Sparks are flying, but that heavy weight jams the axle! Shrink it, Thomas!',

    // Level 6
    'Теплица Неоновых Подсолнухов': 'Neon Sunflower Conservatory',
    'Уровень 6 · Хищный цветок': 'Chapter 6 · Man-Eating Bloom',
    '«В оранжерее Гауди расцвёл зубастый неоновый подсолнух Ван Гога. Он никого не пропустит к био-двери!»':
      '“A toothy Van Gogh neon sunflower has bloomed inside Gaudí’s conservatory. Nobody gets past to the bio-door!”',
    'Ослеплённый и усыплённый сонным нектаром, цветок захрапел, а био-дверь приняла пропуск.':
      'Dazzled and lulled by sleepy nectar, the bloom began snoring softly as the bio-door accepted the pass.',
    'УФ-прожектор': 'UV Floodlight',
    'Стеклянный колпак': 'Glass Dome',
    'Серый кот-вредитель Хват': 'Gray Pest Cat Grabby',
    'Био-ключ-карта': 'Bio Keycard',
    'Лейка с сонным нектаром': 'Sleepy-Nectar Watering Can',
    'Хищный Неоновый Подсолнух': 'Predatory Neon Sunflower',
    'Био-дверь теплицы': 'Conservatory Bio-Door',
    'Серый кот Хват уселся прямо на стеклянный колпак! Сгоните его магией Томаса или разрядом Торквемады, усыпите цветок УФ-лампой + нектаром и заберите ключ-карту.':
      'Gray pest Grabby is perched right atop the glass dome! Shoo him off with Thomas’s magic or Torquemada’s zap, lull the flower with the UV lamp + nectar, and grab the keycard.',
    '1) Торквемада: «Хакер-ток» на УФ-прожектор. 2) Томас: «Телекинез» на Лейку сверху. 3) Томас: «Телекинез» (или «Уменьшение») на Серого кота Хвата, затем на Стеклянный колпак. 4) Торквемада берёт Ключ-карту и применяет на Био-дверь!':
      '1) Torquemada: Hacker Spark on the UV Floodlight. 2) Thomas: Telekinesis on the overhead Watering Can. 3) Thomas: Telekinesis (or Shrink) on Gray Cat Grabby, then on the Glass Dome. 4) Torquemada picks up the Keycard and uses it on the Bio-Door!',
    'Включил ультрафиолет! Смотри, как цветок зажмурился!':
      'UV floodlight active! Look at that flower squinting shut!',
    'Ай! Бодрый цветок отбил капли лепестками! Сначала ослепи его прожектором!':
      'Yikes! The wide-awake plant batted the drops away! Blind it with the UV lamp first!',
    'Спящий подсолнух': 'Sleeping Sunflower',
    'Сонный нектар подействовал — людоед засопел!':
      'Sleepy nectar worked — the man-eater is snoozing!',
    'Хрум-ам!': 'Chomp-Snap!',
    'Нельзя трогать бодрствующего хищного подсолнуха! Он чуть не проглотил Торквемаду!':
      'Don’t poke an awake carnivorous sunflower! It nearly swallowed Torquemada whole!',
    'Храпит и пахнет ванилью!': 'Snoring away and smelling like vanilla!',
    'Серый вредитель Хват отправлен искать другой колпак!':
      'Gray pest Grabby got sent packing to find another dome to sit on!',
    'Тр-р-р! Небольшой статический разряд — и Серый Хват пулей сбежал!':
      'Bzzzt! One little static zap and Gray Grabby bolted like a rocket!',
    'Хват вцепился когтями в колпак: «Моё!» Надо его шугануть или поднять магией!':
      'Grabby dug his claws into the dome: “Mine!” Better zap him or lift him with magic!',
    'На колпаке сидит вредный серый кот Хват! Сначала сгони его!':
      'That pesky gray cat Grabby is squatting on the dome! Shoo him off first!',
    'Путь к ключ-карте свободен!': 'Clear shot at the keycard!',
    'Био-карта': 'Bio Keycard',
    'Цифровой пропуск от двери теплицы':
      'Digital access pass for the conservatory door',
    'Ключ-карта в кармане!': 'Keycard secured in pocket!',
    'Хищный цветок не пускает к двери!':
      'The snapping flower won’t let anyone near the door!',

    // Level 7
    'Архив Голограмм и Свитков': 'Archive of Holograms & Scrolls',
    'Уровень 7 · Код когтя': 'Chapter 7 · Claw Cipher',
    '«Выход перерезан красными лазерами. Пароль спрятан на свитке под потолком!»':
      '“Red laser beams slice across the exit. The passcode is hidden on a scroll up by the ceiling!”',
    'Лазеры погасли с шипением, и стальной шлюз архива открылся!':
      'The lasers hissed out, and the heavy steel archive airlock slid open!',
    'Голо-розетка питания': 'Holo-Power Socket',
    'Свиток с мелкими рунами': 'Scroll of Tiny Runes',
    'Кодовый терминал': 'Keypad Terminal',
    'Тугой рычаг сброса': 'Stiff Override Lever',
    'Лазерная сетка': 'Laser Grid',
    'Рыже-белый кот-архивариус Мурзик': 'Ginger-White Archivist Cat Murzik',
    'Шлюз архива': 'Archive Airlock',
    'Снимите свиток телекинезом и увеличьте руны, чтобы прочитать пароль. Закоротите голо-розетку, введите код и дёрните тугой рычаг магией!':
      'Lower the scroll with telekinesis and enlarge the runes to read the password. Short the holo-socket, punch in the code, and yank the stiff lever with magic!',
    '1) Торквемада: «Хакер-ток» на Голо-розетку. 2) Томас: «Телекинез», затем «Увеличение» на Свиток. 3) Торквемада: «Лапки» на Кодовый терминал. 4) Томас: «Телекинез» на Тугой рычаг. 5) Пройдите через Дверь!':
      '1) Torquemada: Hacker Spark on the Holo-Socket. 2) Thomas: Telekinesis, then Enlarge on the Scroll. 3) Torquemada: Paws on the Keypad Terminal. 4) Thomas: Telekinesis on the Stiff Lever. 5) Walk through the Door!',
    'Перегрузил контур лазеров! Осталось ввести код и дёрнуть рубильник!':
      'Overloaded the laser circuit! Now enter the code and pull the lever!',
    'Спустил свиток пониже... Но буквы микроскопические!':
      'Brought the scroll down... but the runes are microscopic!',
    'Свиток с кодом «7-4-2»': 'Scroll with Code “7-4-2”',
    'Ага! Вижу крупно: код «7-4-2»!': 'Aha! Loud and clear now: code “7-4-2”!',
    'Нужен 3-значный код! Кажется, он написан на свитке наверху.':
      'Need a 3-digit code! Must be written on that scroll overhead.',
    'Ввёл 7-4-2! Теперь дёргай ржавый рычаг, Томас — мне не провернуть!':
      'Typed 7-4-2! Pull that rusted lever, Thomas — I can’t budge it!',
    'Уф, прикипел! Нужен телекинез Томаса!':
      'Oof, welded stiff! Needs Thomas’s telekinesis!',
    'Рычаг заблокирован! Нужен и взлом розетки, и код в терминале.':
      'Lever is locked! Needs both the hacked socket and the terminal code.',
    'Лазеры погасли! Бежим к двери!': 'Lasers are down! Dash for the airlock!',
    'Ой, лазерный подпал!': 'Laser Singed!',
    'Красные лучи сработали на прикосновение — сначала отключи сеть и введи код!':
      'Red beams triggered on contact — overload the grid and enter the code first!',
    'Рыже-белый Архивариус Мурзик поправляет очки: «Свиток с кодом лежит наверху, но буквы крошечные — сними его и увеличь!»':
      'Ginger-white Archivist Murzik adjusts his spectacles: “The code scroll rests overhead, but the script is tiny — fetch it down and enlarge it!”',

    // Level 8
    'Кузница Кибер-Горгульи': 'Cyber-Gargoyle Forge',
    'Уровень 8 · Железный ошейник': 'Chapter 8 · Iron Collar',
    '«Ворота заварены припоем, а раскалённый крюк заперт в кузнечной клетке. За дело!»':
      '“The gates are welded shut with solder, and the red-hot hook is locked in a forge cage. To work!”',
    'Засов сжался, цепь натянулась, и тяжёлые ворота кузницы с грохотом распахнулись.':
      'The bolt shrank, the chain pulled taut, and the mighty forge gates boomed open.',
    'Тень у наковальни': 'Shadow by the Anvil',
    'Тень в клетке кузни': 'Shadow in the Forge Cage',
    'Раскалённый крюк': 'Red-Hot Hook',
    'Электропечь кузницы': 'Forge Electric Furnace',
    'Вентиль кузнечных мехов': 'Bellows Valve',
    'Цепь с застывшим припоем': 'Solder-Welded Chain',
    'Массивный засов ворот': 'Massive Gate Bolt',
    'Ворота кузницы': 'Forge Gates',
    'Запустите электропечь, раздуйте меха до максимума и расплавьте припой. Заберите крюк через тень и уменьшите засов!':
      'Fire up the electric furnace, swell the bellows to full size to melt the solder, snag the hook via shadow-hop, and shrink the gate bolt!',
    '1) Торквемада: «Хакер-ток» на Электропечь. 2) Томас: «Увеличение», затем «Телекинез» на Вентиль мехов. 3) Томас: «Тень-прыжок» в клетку, затем «Телекинез» на Раскалённый крюк, затем обратно. 4) Томас: «Уменьшение» на Массивный засов. 5) Нажмите на Ворота!':
      '1) Torquemada: Hacker Spark on the Furnace. 2) Thomas: Enlarge, then Telekinesis on the Bellows Valve. 3) Thomas: Shadow Hop into the cage, Telekinesis on the Red-Hot Hook, then hop back. 4) Thomas: Shrink on the Massive Bolt. 5) Click the Gates!',
    'Готово! Ворота кузницы открылись!': 'Done! The forge gates swung open!',
    'Печь запылала! Теперь раздуй меха посильнее, Томас!':
      'Furnace is roaring! Pump those bellows big, Thomas!',
    'Огромные меха! Теперь дуну ими телекинезом!':
      'Colossal bellows! Now to blast the coals with telekinesis!',
    'Печь ещё холодная — сначала включи её!':
      'The furnace is still cold — power it up first!',
    'Слабоват ветерок — сначала увеличь меха!':
      'Too puny a breeze — enlarge the bellows first!',
    'Ух! Жар расплавил припой на цепи!':
      'Whoosh! The blast melted the solder off the chain!',
    'Свинцовая решётка! Прыгни в тень внутрь.':
      'Lead bars again! Shadow-hop inside the cage.',
    'Зацепил раскалённый крюк прямо за цепь ворот!':
      'Snagged the glowing hook straight onto the gate chain!',
    'Засов сжался до булавки!': 'The massive bolt shrank down to a pin!',

    // Level 9
    'Винтовая Лестница Спиралей': 'Spiral Helix Well',
    'Уровень 9 · Магнитный колодец': 'Chapter 9 · Magnetic Abyss',
    '«Мостик парит под потолком на электромагнитах, а впереди кружит зубастый Дрон-Мопс!»':
      '“The catwalk hovers near the ceiling on electromagnets, and a toothy Pug-Drone patrols ahead!”',
    'Писклявый микро-дрон кружится в углу, магнитный мост замкнут, а коты уже у самых главных врат!':
      'The squeaky micro-drone spins harmlessly in a corner, the magnetic bridge is locked down, and the cats reach the final gates!',
    'Тень у перил': 'Shadow by the Railing',
    'Тень за спиной дрона': 'Shadow Behind the Drone',
    'Магнитный рубильник': 'Magnetic Switch',
    'Белый кот-вредитель Снежок': 'White Pest Cat Snowball',
    'Парящая магнитная платформа': 'Floating Magnetic Bridge',
    'Патрульный Дрон-Мопс': 'Patrol Pug-Drone',
    'Магнитный шлюз': 'Magnetic Airlock',
    'Белый вредитель Снежок оккупировал магнитный рубильник — истрепите его причёску статикой или снимите телекинезом! И не забудьте уменьшить Дрона-Мопса.':
      'White pest Snowball hogged the magnetic switch — frizz his fur with static or lift him off with telekinesis! And don’t forget to shrink the Pug-Drone.',
    '1) Томас: «Уменьшение» на Дрона-Мопса. 2) Томас («Телекинез») или Торквемада («Хакер-ток») на Белого Снежка. 3) Торквемада: «Хакер-ток» на Магнитный рубильник. 4) Томас: «Телекинез» на Магнитный рубильник. 5) Торквемада перебегает и жмёт «Хакер-ток» на Магнитный шлюз!':
      '1) Thomas: Shrink on the Pug-Drone. 2) Thomas (Telekinesis) or Torquemada (Hacker Spark) on White Snowball. 3) Torquemada: Hacker Spark on the Magnetic Switch. 4) Thomas: Telekinesis on the Magnetic Switch. 5) Torquemada runs across and zaps the Magnetic Airlock!',
    'Белый Снежок взвыл: «Фи, статика испортила мне укладку!» — и удрал!':
      'White Snowball yowled: “Ugh, static ruined my fur-do!” — and bolted!',
    'Сбросили белого вредителя с рубильника!':
      'Swept that snooty white pest right off the switch!',
    'Снежок надулся: «Не подходи! Я тут любуюсь спиралями!»':
      'Snowball puffed up: “Back off! I’m admiring the spirals here!”',
    'Игрушечный мини-мопс': 'Toy Mini-Pug',
    'Хи-хи! Теперь этот грозный охранник пищит как резиновая уточка!':
      'Hee-hee! Now the fierce guard squeaks like a rubber ducky!',
    'Тяв-Сирена!': 'Yap-Siren!',
    'Дрон-Мопс поднял тревогу при приближении! Надо его уменьшить магией!':
      'The Pug-Drone triggered a proximity alarm! Shrink him with magic!',
    'Какой милый карманный робо-мопсик!':
      'What a cute pocket-sized robo-puglet!',
    'На рубильнике уселся Белый Снежок и не пускает к кнопкам!':
      'White Snowball is parked on the switch blocking the controls!',
    'Полярность сменил! Но рубильник зажат тугой скобой — дёргай, Томас!':
      'Polarity reversed! Still stuck behind a heavy bracket — pull it, Thomas!',
    'Сначала Торквемада должен сменить полярность током!':
      'Torquemada needs to flip the polarity with electricity first!',
    'Мост опускается к полу! Можно бежать!':
      'Bridge descending to floor level! Let’s sprint!',
    'Мост ещё под потолком!': 'The bridge is still floating up at the ceiling!',
    'Дрон-Мопс поймал!': 'Caught by the Pug-Drone!',
    'Нельзя бежать мимо полноразмерного Дрона-Мопса — уменьши его сначала!':
      'Can’t sprint past a full-sized Pug-Drone — shrink it first!',
    'Магнитный замок требует «Хакер-тока»!':
      'The magnetic lock demands a Hacker Spark!',

    // Level 10
    'Врата Свободы': 'Gates of Freedom',
    'Уровень 10 · Финальный реванш пса': 'Chapter 10 · Baskerville’s Rematch',
    '«Вот и выход в Звёздную Ночь! Но наш знакомый Пёс Баскервиль спустился на лифте и снова храпит у главных врат!»':
      '“There’s the exit into the Starry Night! But our old pal Baskerville rode the elevator down and is snoring by the main gates!”',
    'Баскервиль с восторгом унёсся за гигантской костью, древние врата распахнулись, и Томас с Торквемадой выбежали на свободу под вихревым небом Ван Гога!':
      'Baskerville dashed joyfully after the colossal bone, the ancient gates swung wide, and Thomas and Torquemada raced into freedom beneath Van Gogh’s swirling starry sky!',
    'Пульт катапульты и голо-витрина': 'Catapult Console & Holo-Display',
    'Резиновая косточка на балке': 'Rubber Bone on the Beam',
    'Старинная катапульта': 'Ancient Catapult',
    'Броне-пёс Баскервиль': 'Armored Hound Baskerville',
    'Био-сканер Врат': 'Gate Bio-Scanner',
    'Древний Штурвал Врат': 'Ancient Gate Wheel',
    'Сделайте резиновую кость гигантской, зарядите её в катапульту и запустите с пульта. Когда пёс убежит за ней — взломайте био-сканер и поверните штурвал магией!':
      'Enlarge the rubber bone to giant size, load it into the catapult, and fire from the console. Once the hound chases it away, hack the bio-scanner and turn the gate wheel with magic!',
    '1) Томас: «Увеличение», затем «Телекинез» на Резиновую косточку. 2) Торквемада: «Хакер-ток» на Пульт катапульты (слева). 3) Торквемада: «Хакер-ток» на Био-сканер у врат. 4) Томас: «Телекинез» на Древний Штурвал Врат!':
      '1) Thomas: Enlarge, then Telekinesis on the Rubber Bone. 2) Torquemada: Hacker Spark on the Catapult Console (left). 3) Torquemada: Hacker Spark on the Bio-Scanner by the gates. 4) Thomas: Telekinesis on the Ancient Gate Wheel!',
    'Гигантская Мега-Кость': 'Colossal Mega-Bone',
    'Вот это Мега-Кость! Теперь положу её в катапульту!':
      'Now THAT’S a Mega-Bone! Time to load it into the catapult!',
    'Мелковата приманка — Баскервиль даже не взглянет. Увеличь кость сначала!':
      'Too tiny for bait — Baskerville wouldn’t blink at it. Enlarge the bone first!',
    'Мега-Кость заряжена! Торквемада, жми пуск на пульте слева!':
      'Mega-Bone loaded! Torquemada, hit launch on the left console!',
    'Катапульта пуста! Надо зарядить её гигантской костью!':
      'The catapult is empty! Load it with a giant bone first!',
    'Счастливый пёс с Мега-Костью': 'Happy Hound with Mega-Bone',
    'ГАВ-МНЯМ!! ВОТ ЭТО КОСТОЧКА! Я ЗАНЯТ!':
      'WOOF-YUM!! NOW THAT’S A TREAT! BUSY CHEWING!',
    'Финальный кусь!': 'Final Chomp!',
    'Баскервиль в бронеошейнике начеку! Отвлеки его гигантской костью из катапульты!':
      'Armored Baskerville is wide awake! Distract him with a giant bone from the catapult!',
    'Теперь у него дел на всю ночь — пусть грызёт!':
      'He’s set for the whole night now — let him chew!',
    'Био-сканер взломан! Томас, крути огромный штурвал телекинезом!':
      'Bio-scanner hacked! Thomas, spin that giant wheel with telekinesis!',
    'Этот штурвал весит тонну! Томас, нужна твоя магия!':
      'That wheel weighs a ton! Thomas, we need your magic!',
    'Рано крутишь!': 'Too Soon to Spin!',
    'Баскервиль услышал скрип штурвала и бросился на котов!':
      'Baskerville heard the gate wheel creak and pounced on the cats!',
    'Штурвал заблокирован электроникой — Торквемада должен взломать био-сканер!':
      'The wheel is locked electronically — Torquemada has to hack the bio-scanner!',
  },

  es: {
    // Shared wrong-reaction messages
    'Туда через тень не прыгнуть — мне нужна тёмная тень-портал!':
      'No puedo saltar por las sombras allí — ¡necesito un portal de sombra oscura!',
    'Свинцовая преграда мешает магии! Надо прыгнуть в тень поближе.':
      '¡Una barrera de plomo bloquea mi magia! Debo saltar por las sombras más cerca.',

    // Level 1
    'Камера под крышей': 'Celda bajo el Tejado',
    'Уровень 1 · Сон сторожевого пса': 'Capítulo 1 · El Sueño del Sabueso',
    '«Мы в самой верхней камере башни! У двери храпит кибер-пёс Баскервиль — один лишний звон, и он откусит нам хвосты!»':
      '«¡Estamos en la celda más alta de la torre! El ciber-sabueso Baskerville ronca junto a la puerta: ¡un ruido de más y nos morderá las colas!»',
    'Ключ провернулся бесшумно! Баскервиль сладко спит в наушниках, а коты проскальзывают на лестницу.':
      '¡La llave giró sin hacer ruido! Baskerville sueña feliz con sus auriculares mientras los gatos se escabullen por la escalera.',
    'Глубокая тень под аркой': 'Sombra Profunda bajo el Arco',
    'Тень за решёткой': 'Sombra tras los Barrotes',
    'Тяжёлый ключ за решёткой': 'Llave Pesada tras los Barrotes',
    'Маленькая подушка': 'Almohada Pequeña',
    'Ключ на подушке': 'Llave sobre la Almohada',
    'Неоновый аудио-щиток': 'Panel de Audio Neón',
    'Спящий пёс Баскервиль': 'Sabueso Dormido Baskerville',
    'Тяжёлая дверь с замком': 'Puerta Pesada con Cerradura',
    'Томас может увеличить подушку, прыгнуть в тень за решётку и сбросить ключ без шума. А Торквемада не боится тока в аудио-щитке!':
      'Tomás puede agrandar la almohada, saltar por la sombra tras los barrotes y soltar la llave en silencio. ¡Y Torquemada no teme la corriente del panel de audio!',
    '1) Томас: «Увеличение» на Подушку. 2) Томас: «Тень-прыжок» в левую тень, затем «Телекинез» на Ключ. 3) Томас: «Тень-прыжок» обратно. 4) Торквемада: «Лапки» на Ключ, затем «Хакер-ток» на Аудио-щиток. 5) Торквемада вставляет Ключ в Дверь, а Томас крутит его «Телекинезом»!':
      '1) Tomás: Agrandar sobre la Almohada. 2) Tomás: Salto Sombrío a la sombra izquierda y Telequinesis sobre la Llave. 3) Tomás: Salto Sombrío de vuelta. 4) Torquemada: Patitas en la Llave y Chispazo Hacker en el Panel. 5) Torquemada mete la Llave en la Puerta y Tomás la gira con Telequinesis.',
    'Шмыг из тени в тень — и я за решёткой!':
      '¡Zas, de sombra en sombra y ya estoy dentro de la jaula!',
    'Обратно в главный зал!': '¡De vuelta a la sala principal!',
    'Подушка уже размером с королевскую перину!':
      '¡La almohada ya es tan enorme como un edredón real!',
    'Огромная мягкая перина': 'Colchón Gigante y Mullido',
    'Пух-магия! Теперь даже наковальня упадёт бесшумно!':
      '¡Magia esponjosa! Ahora hasta un yunque caería sin hacer ruido.',
    'Ой, скукожилась до мышиной подушечки.':
      'Uy, se encogió hasta parecer un cojín de ratón.',
    'Свинцовая решётка глушит чары! Надо попасть внутрь через тень.':
      '¡Los barrotes de plomo bloquean los hechizos! Debo entrar por la sombra.',
    'БРЯК!! ГАВ-ТРЕВОГА! КТО ГРЕМИТ?!':
      '¡¡CLANK!! ¡¡GUAU-ALERTA!! ¿QUIÉN HACE ESCÁNDALO?!',
    'Бряк! Пёс проснулся!': '¡Clank! ¡El Sabueso Despertó!',
    'Тяжёлый ключ с грохотом упал на каменный пол! Надо было сначала увеличить подушку внизу.':
      '¡La pesada llave se estrelló contra el suelo de piedra! Primero debías agrandar la almohada de abajo.',
    'Мягко приземлился на перину! Пёс даже ухом не повёл!':
      '¡Aterrizaje suave sobre el colchón! El sabueso ni movió una oreja.',
    'Тяжёлый ключ': 'Llave Pesada',
    'Массивный бронзовый ключ от двери камеры':
      'Robusta llave de bronce para la puerta de la celda',
    'Хвать лапками! Теперь ключ у меня.': '¡Atrapada con mis patitas! Ya tengo la llave.',
    'Я маг, железки лапами не таскаю — пусть Торквемада возьмёт!':
      'Soy mago, no cargo chatarra — ¡que la coja Torquemada!',
    'Колыбельная уже играет на всю громкость с шумоподавлением!':
      '¡La nana con cancelación de ruido ya suena a todo volumen!',
    'Крепко спящий пёс (в наушниках)':
      'Sabueso Profundamente Dormido (con Auriculares)',
    'Мр-р-р, 220 Вольт бодрят! Врубил псу голо-колыбельную на уши!':
      '¡Miau-zap, 220 voltios me reaniman! Le puse una holo-nana directo a los oídos del perro.',
    'Тут оголённый ток! Надо использовать мой «Хакер-ток», а не просто тыкать лапкой.':
      '¡Hay cables pelados! Usa mi Chispazo Hacker, no metas la patita sin más.',
    'Кусь за хвост!': '¡Mordisco en la Cola!',
    'Ты пощекотал Баскервиля телекинезом! Он мгновенно проснулся и погнался за котами.':
      '¡Le hiciste cosquillas a Baskerville con telequinesis! Despertó al instante y persiguió a los gatos.',
    'Разбудили зверя!': '¡Despertaste a la Bestia!',
    'Нельзя подходить к сторожевому псу, пока он слышит каждый шорох!':
      '¡No te acerques al perro guardián mientras oiga el más mínimo susurro!',
    'Храпит как трактор под «Колыбельной звёздной ночи»!':
      '¡Ronca como un tractor al ritmo de la «Nana de la Noche Estrellada»!',
    'Ключ вставил!.. Уф-ф, не хватает сил провернуть! Томас, крути телекинезом!':
      '¡Llave metida!.. ¡Uf, está durísima! ¡Tomás, gírala con telequinesis!',
    'Заперто! Сначала нужен ключ.': '¡Cerrada con llave! Primero falta la llave.',
    'Крях-пых! Замок заржавел намертво — без магии Томаса не провернуть!':
      '¡Buf! ¡La cerradura está oxidada — sin la magia de Tomás no girará!',
    'Нечего поворачивать — Торквемада ещё не вставил ключ в замочную скважину!':
      'No hay nada que girar: ¡Torquemada aún no ha metido la llave en la cerradura!',
    'Щелчок разбудил пса!': '¡El Clic Despertó al Sabueso!',
    'Замок громко щёлкнул прямо над ухом Баскервиля! Сначала усыпи его аудио-щитком.':
      '¡La cerradura chasqueó justo sobre la oreja de Baskerville! Durmámoslo primero con el panel de audio.',

    // Level 2
    'Мастерская Алхимика': 'Taller del Alquimista',
    'Уровень 2 · Искра и Колба': 'Capítulo 2 · Chispa y Matraz',
    '«Внизу шипит неоновая кислота, а мост поднят гигантской гирей. Нужен ток и магия!»':
      '«¡Abajo sisea ácido neón y un contrapeso gigante mantiene alzado el puente! ¡Necesitamos chispa y magia!»',
    'Мост с лязгом опустился над кислотным рвом, и двери лифта гостеприимно распахнулись.':
      'El puente de tablones descendió con estrépito sobre el foso de ácido y el ascensor abrió sus puertas.',
    'Тень под столом': 'Sombra bajo la Mesa',
    'Тень у колбы': 'Sombra junto al Matraz',
    'Генератор лебёдки': 'Generador del Cabrestante',
    'Оголённый силовой кабель': 'Cable de Alta Tensión Pelado',
    'Неоновый предохранитель': 'Fusible Neón',
    'Свинцовый противовес': 'Contrapeso de Plomo',
    'Подъёмный мост': 'Puente Levadizo',
    'Пневмо-ящик с деталью': 'Caja Neumática con Pieza',
    'Рыжий кот-помощник Архимед': 'Gato Ayudante Pelirrojo Arquímedes',
    'Грузовой лифт вниз': 'Montacargas hacia Abajo',
    'Рыжий кот Архимед подскажет про гирю! Томас может перепрыгнуть через ров по теням, чтобы достать предохранитель из ящика, и уменьшить тяжёлый противовес.':
      '¡El gato pelirrojo Arquímedes sabe lo de la pesa! Tomás puede cruzar el foso por las sombras para sacar el fusible de la caja y encoger el pesado contrapeso.',
    '1) Томас: «Тень-прыжок» на правый берег, затем «Телекинез» на Ящик. 2) Торквемада берёт Предохранитель, вставляет в Генератор и жмёт «Хакер-ток» на Оголённый кабель. 3) Томас применяет «Уменьшение» на Противовес. 4) Торквемада переходит мост и взламывает Лифт!':
      '1) Tomás: Salto Sombrío al borde derecho y Telequinesis en la Caja. 2) Torquemada coge el Fusible, lo pone en el Generador y usa Chispazo Hacker en el Cable Pelado. 3) Tomás lanza Encoger al Contrapeso. 4) ¡Torquemada cruza el puente y hackea el Montacargas!',
    'Ура! Мостик опущен — путь через кислоту открыт!':
      '¡Hurra! ¡El puente bajó — el camino sobre el ácido está libre!',
    'Перелетел через кислотный ров!': '¡Crucé volando el foso de ácido!',
    'Я снова на левом берегу.': 'De vuelta en el lado izquierdo.',
    'Отсюда пневмо-ящик не открыть — прыгни в тень на ту сторону!':
      'Desde aquí no puedo abrir la caja — ¡salta por la sombra al otro lado!',
    'Ящик уже пуст!': '¡La caja ya está vacía!',
    'Хоп! Предохранитель перелетел по воздуху прямо к Торквемаде!':
      '¡Hopla! ¡El fusible voló por los aires directo hacia Torquemada!',
    'Предохранитель': 'Fusible Neón',
    'Светящаяся колба для генератора': 'Cápsula luminosa para el generador',
    'Отличная деталька! Как раз для генератора.':
      '¡Pieza estupenda! Justo para el generador.',
    'Предохранитель на месте! Теперь надо пустить ток по кабелю!':
      '¡Fusible en su sitio! Ahora hay que pasar corriente por el cable.',
    'В генераторе пустое гнездо — нужен предохранитель!':
      '¡El zócalo del generador está vacío — hace falta un fusible!',
    'Предохранитель уже стоит, осталось замкнуть оголённый кабель!':
      'El fusible ya está puesto, ¡solo queda electrificar el cable pelado!',
    'Ух, щекотно! Но генератор не включается без предохранителя!':
      '¡Uy, qué cosquillas! Pero el generador no arranca sin fusible.',
    'Лебёдка гудит на полную, но противовес слишком тяжёлый!':
      '¡El cabrestante ruge al máximo, pero el contrapeso pesa demasiado!',
    'Крошечная гирька': 'Pesa Diminuta',
    'Гиря стала как орешек! Осталось включить лебёдку!':
      '¡La pesa quedó del tamaño de una avellana! Solo falta activar el cabrestante.',
    'Туда не пройти — ров с кислотой шипит! Надо опустить мост.':
      'No se puede pasar — ¡el foso de ácido burbujea! Hay que bajar el puente.',
    'Панель лифта зашифрована — нужен «Хакер-ток»!':
      'El panel del ascensor está cifrado — ¡necesita Chispazo Hacker!',
    'Рыжий Архимед мурлычет: «Предохранитель заперт в ящике за рвом, а противовес надо уменьшить магией!»':
      'Arquímedes ronronea: «¡El fusible está encerrado al otro lado del foso, y hay que encoger el contrapeso con magia!»',

    // Level 3
    'Обсерватория Звёздной Ночи': 'Observatorio de la Noche Estrellada',
    'Уровень 3 · Спираль Ван Гога': 'Capítulo 3 · Espiral de Van Gogh',
    '«Витражный купол кружится звёздами, но дверь заперта на световой фотоэлемент. Поймаем лунный луч!»':
      '«La cúpula de vitral gira con estrellas, pero la puerta está sellada por una fotocélula. ¡Atrapemos un rayo lunar!»',
    'Золотой луч Ван Гога ударил в фотоэлемент, и мозаичная дверь-спираль плавно раскрылась.':
      'Un haz dorado de Van Gogh golpeó la fotocélula y la puerta en espiral de mosaico se abrió suavemente.',
    'Терминал купола': 'Terminal de la Cúpula',
    'Древний кибер-телескоп': 'Antiguo Ciber-Telescopio',
    'Полосатый вредитель Шкода': 'Gato Atigrado Travieso',
    'Крошечная линза': 'Lente Diminuta',
    'Звёздное кольцо-отражатель': 'Anillo Reflector Estelar',
    'Тяжёлая заглушка фотоэлемента': 'Tapón Pesado de la Fotocélula',
    'Солнечный фотоэлемент': 'Fotocélula Solar',
    'Дверь-спираль': 'Puerta Espiral',
    'На телескопе развалился полосатый вредитель Шкода — сгоните его магией (телекинезом или уменьшением). Затем откройте купол, увеличьте линзу, поверните кольцо и уберите заглушку!':
      'El gato atigrado Travieso está tirado sobre el telescopio — échenlo con magia (Telequinesis o Encoger). ¡Luego abran la cúpula, agranden la lente, giren el anillo y quiten el tapón!',
    '1) Томас: «Телекинез» или «Уменьшение» на Полосатого Шкоду. 2) Торквемада: «Хакер-ток», затем «Лапки» на Терминал. 3) Томас: «Увеличение» на Линзу. 4) Томас: «Телекинез» на Звёздное кольцо. 5) Томас: «Уменьшение» на Заглушку фотоэлемента!':
      '1) Tomás: Telequinesis o Encoger al Gato Atigrado. 2) Torquemada: Chispazo Hacker y luego Patitas en la Terminal. 3) Tomás: Agrandar sobre la Lente. 4) Tomás: Telequinesis en el Anillo Estelar. 5) ¡Tomás: Encoger sobre el Tapón!',
    'Полосатый Шкода стал как мышонок и с писком удрал в норку!':
      '¡El atigrado Travieso se volvió del tamaño de un ratón y huyó chillando!',
    'Аккуратно снял полосатого хулигана с телескопа телекинезом!':
      '¡Bajé con cuidado al gamberro atigrado del telescopio con telequinesis!',
    'Ш-ш-ш! Полосатый Шкода шипит и бьёт меня лапой по носу! Томас, сними его магией!':
      '¡Fsss! ¡El gato atigrado me bufa y me da zarpazos en la nariz! ¡Tomás, bájalo con magia!',
    'Защита уже снята — теперь просто нажми кнопку лапками!':
      '¡Seguridad desactivada — ahora pulsa el botón con Patitas!',
    'Пароль взломан! Нажму «Лапки», чтобы раскрыть люк купола.':
      '¡Contraseña hackeada! Usaré Patitas para abrir la compuerta de la cúpula.',
    'Терминал под паролем! Сначала взломай его «Хакер-током».':
      '¡La terminal pide contraseña! Hackéala primero con Chispazo Hacker.',
    'Купол открыт! Звёздный свет полился на телескоп!':
      '¡Cúpula abierta! ¡La luz estelar baña el telescopio!',
    'Полосатый вредитель сидит прямо на трубе и сбивает прицел! Сначала убери его!':
      '¡Ese gato molesto está sentado justo en el tubo estorbando! ¡Quítalo primero!',
    'Гигантская хрустальная линза': 'Lente de Cristal Gigante',
    'Ого, какая огромная линза! Теперь луч станет в десять раз ярче!':
      '¡Vaya lentaza! ¡Ahora el haz será diez veces más brillante!',
    'Повернул кольцо точно на фотоэлемент!':
      '¡Giré el anillo directo hacia la fotocélula!',
    'Заглушка сжалась и вывалилась! Фотоэлемент открыт!':
      '¡El tapón se encogió y saltó fuera! ¡Fotocélula despejada!',
    'Фотоэлементу нужен полный звёздный луч: люк, большая линза, наведённое кольцо и снятая заглушка.':
      'La fotocélula necesita el haz completo: cúpula abierta, lente gigante, anillo alineado y tapón quitado.',

    // Level 4
    'Органный Зал Гауди': 'Sala del Órgano de Gaudí',
    'Уровень 4 · Резонанс труб': 'Capítulo 4 · Resonancia de Tubos',
    '«Керамические трубы изогнулись до самого потолка. Чтобы открыть акустические врата, нужен двойной аккорд!»':
      '«Los tubos cerámicos se curvan hasta el techo. ¡Para abrir las puertas acústicas hace falta un acorde doble!»',
    'Полифонический аккорд сотряс мозаику Гауди, и акустический замок рассыпался в мелодичный звон.':
      'Un acorde polifónico estremeció los mosaicos de Gaudí y la cerradura acústica se deshizo en notas brillantes.',
    'Оборванные провода органа': 'Cables Rotos del Órgano',
    'Левая педаль-клавиша': 'Tecla Pedal Izquierda',
    'Огромная пробка в трубе': 'Tapón Enorme en el Tubo',
    'Правая педаль-клавиша': 'Tecla Pedal Derecha',
    'Маленький колокол-резонатор': 'Pequeña Campana Resonadora',
    'Белая кошка-помощница Сопрано': 'Gata Ayudante Blanca Soprano',
    'Акустические врата': 'Puertas Acústicas',
    'Орган нужно починить (провода, пробка в трубе, размер резонатора), а затем нажать ОБЕ клавиши одновременно: Торквемада зажимает левую, Томас нажимает правую магией!':
      'Reparen primero el órgano (cables, tapón, tamaño del resonador) y luego pulsen AMBAS teclas a la vez: ¡Torquemada mantiene la izquierda y Tomás toca la derecha con magia!',
    '1) Торквемада: «Хакер-ток» на Оборванные провода. 2) Томас: «Уменьшение» на Пробку в трубе. 3) Томас: «Увеличение» на Колокол-резонатор. 4) Торквемада: «Лапки» на Левую клавишу. 5) Томас: «Телекинез» на Правую клавишу!':
      '1) Torquemada: Chispazo Hacker en los Cables Rotos. 2) Tomás: Encoger en el Tapón del Tubo. 3) Tomás: Agrandar en la Campana Resonadora. 4) Torquemada: Patitas en la Tecla Izquierda. 5) ¡Tomás: Telequinesis en la Tecla Derecha!',
    'Усы дыбом, зато электромеханика органа снова поёт!':
      '¡Bigotes de punta, pero la electrónica del órgano vuelve a cantar!',
    'Чпок! Пробка сжалась и вылетела — труба дышит свободно!':
      '¡Pop! ¡El tapón se encogió y salió disparado — el tubo respira libre!',
    'Мощный резонатор-колокол': 'Poderosa Campana Resonadora',
    'Вот это колокол! Теперь звук пробьёт любую дверь!':
      '¡Menuda campana! ¡Ahora el sonido atravesará cualquier puerta!',
    'Клавиша молчит — сначала соедини оборванные провода!':
      'La tecla está muda — ¡empalma primero los cables rotos!',
    'Держу левую клавишу! Томас, быстро жми правую телекинезом!':
      '¡Mantengo pisada la tecla izquierda! ¡Tomás, pulsa rápido la derecha con telequinesis!',
    'Провода оборваны — орган обесточен!':
      '¡Los cables están cortados — el órgano no tiene corriente!',
    'Хрипит! Пробка в центральной трубе портит ноту!':
      '¡Suena ronco! ¡El tapón en el tubo central arruina la nota!',
    'Звук слишком тихий — надо увеличить колокол-резонатор!':
      'Demasiado suave — ¡hay que agrandar la campana resonadora!',
    'Одной ноты мало! Пусть Торквемада сначала зажмёт левую клавишу лапками!':
      '¡Una sola nota no basta! Que Torquemada mantenga antes la tecla izquierda con sus patitas.',
    'Белая кошка Сопрано напевает: «Мур-ля-си! Уберите пробку, увеличьте колокол и берите двойной аккорд одновременно!»':
      'La gata blanca Soprano tararea: «¡Miau-la-si! ¡Quiten el tapón, agranden la campana y toquen el acorde doble a la vez!»',

    // Level 5
    'Часовая Шестерёночная': 'Torre de los Engranajes',
    'Уровень 5 · Время вспять': 'Capítulo 5 · Tiempo Atrás',
    '«Огромный маятник раскачивается над бездной, а выход скрыт за потайным циферблатом!»':
      '«¡Un péndulo colosal se balancea sobre el abismo y la salida se oculta tras una esfera secreta!»',
    'Стрелки помчались в прошлое, открывая потайной люк в недрах часовой башни!':
      '¡Las manecillas corrieron hacia el pasado y abrieron la escotilla secreta de la torre del reloj!',
    'Потайной люк-циферблат': 'Escotilla Secreta de Esfera',
    'Тяжёлая часовая гиря': 'Pesa Pesada del Reloj',
    'Ось хроно-замка': 'Eje de la Crono-Cerradura',
    'Большая шестерёнка': 'Engranaje Grande',
    'Хроно-генератор': 'Crono-Generador',
    'Тень у пропасти': 'Sombra junto al Abismo',
    'Тень за маятником': 'Sombra tras el Péndulo',
    'Крошечная шестерёнка': 'Engranaje Diminuto',
    'На правом краю лежит слишком мелкая шестерёнка — её нужно увеличить и перебросить Торквемаде. А ось часов заклинила гиря!':
      'Al otro lado hay un engranaje demasiado pequeño: hay que agrandarlo y lanzárselo a Torquemada. ¡Y la pesa tiene atascado el eje del reloj!',
    '1) Томас: «Тень-прыжок» вправо, «Увеличение» на Шестерёнку, затем «Телекинез» на неё, и «Тень-прыжок» обратно. 2) Томас: «Уменьшение» на Гирю. 3) Торквемада: берёт Большую шестерёнку, вставляет в Ось и бьёт «Хакер-током» по Хроно-генератору!':
      '1) Tomás: Salto Sombrío a la derecha, Agrandar el Engranaje Diminuto, lanzarlo con Telequinesis y volver por la sombra. 2) Tomás: Encoger la Pesa. 3) Torquemada coge el Engranaje Grande, lo coloca en el Eje y da Chispazo Hacker al Crono-Generador.',
    'Нырнул мимо маятника!': '¡Pasé rozando el péndulo!',
    'Снова на основной платформе!': '¡De nuevo en la plataforma principal!',
    'Слишком далеко и маятник глушит чары — прыгни в тень!':
      '¡Demasiado lejos y el péndulo interfiere — salta por la sombra!',
    'Огромная шестерёнка': 'Engranaje Enorme',
    'Выросла как раз под часовую ось! Теперь переброшу её!':
      '¡Creció a medida exacta para el eje! ¡Ahora se lo lanzo!',
    'Она пока размером с пуговицу — сначала увеличь её!':
      '¡Ahora mismo es del tamaño de un botón — agrándalo primero!',
    'Полетела через пропасть к Торквемаде!':
      '¡Voló sobre el abismo directo hacia Torquemada!',
    'Зубчатое колесо для хроно-замка':
      'Rueda dentada para la crono-cerradura',
    'Увесистая! Щас воткнём в механизм.':
      '¡Pesada! Ahora mismo la encajamos en el mecanismo.',
    'Гиря стала крошкой — зажим оси ослаб!':
      '¡La pesa se quedó diminuta — el eje ya gira libre!',
    'Шестерёнка встала как родная! Осталось подать искру в генератор.':
      '¡Encajó a la perfección! Solo falta darle chispa al generador.',
    'В механизме не хватает шестерёнки!':
      '¡Falta un engranaje en el mecanismo!',
    'Искры летят, но тяжёлая гиря заклинила ось! Уменьши её, Томас!':
      '¡Saltan chispas, pero la pesa bloquea el eje! ¡Encógela, Tomás!',

    // Level 6
    'Теплица Неоновых Подсолнухов': 'Invernadero de Girasoles Neón',
    'Уровень 6 · Хищный цветок': 'Capítulo 6 · Flor Carnívora',
    '«В оранжерее Гауди расцвёл зубастый неоновый подсолнух Ван Гога. Он никого не пропустит к био-двери!»':
      '«En el invernadero de Gaudí floreció un girasol neón dentudo de Van Gogh. ¡No deja pasar a nadie hacia la bio-puerta!»',
    'Ослеплённый и усыплённый сонным нектаром, цветок захрапел, а био-дверь приняла пропуск.':
      'Deslumbrada y adormecida por el néctar soporífero, la flor se puso a roncar y la bio-puerta aceptó el pase.',
    'УФ-прожектор': 'Foco Ultravioleta',
    'Стеклянный колпак': 'Cúpula de Cristal',
    'Серый кот-вредитель Хват': 'Gato Gris Travieso Zarpas',
    'Био-ключ-карта': 'Bio-Tarjeta Llave',
    'Лейка с сонным нектаром': 'Regadera con Néctar Soporífero',
    'Хищный Неоновый Подсолнух': 'Girasol Neón Carnívoro',
    'Био-дверь теплицы': 'Bio-Puerta del Invernadero',
    'Серый кот Хват уселся прямо на стеклянный колпак! Сгоните его магией Томаса или разрядом Торквемады, усыпите цветок УФ-лампой + нектаром и заберите ключ-карту.':
      '¡El gato gris Zarpas se sentó justo encima de la cúpula de cristal! Échenlo con la magia de Tomás o un chispazo de Torquemada, duerman la flor con luz UV + néctar y cojan la tarjeta.',
    '1) Торквемада: «Хакер-ток» на УФ-прожектор. 2) Томас: «Телекинез» на Лейку сверху. 3) Томас: «Телекинез» (или «Уменьшение») на Серого кота Хвата, затем на Стеклянный колпак. 4) Торквемада берёт Ключ-карту и применяет на Био-дверь!':
      '1) Torquemada: Chispazo Hacker en el Foco UV. 2) Tomás: Telequinesis en la Regadera superior. 3) Tomás: Telequinesis (o Encoger) sobre el Gato Zarpas y luego sobre la Cúpula. 4) ¡Torquemada coge la Tarjeta y la usa en la Bio-Puerta!',
    'Включил ультрафиолет! Смотри, как цветок зажмурился!':
      '¡Ultravioleta encendido! ¡Mira cómo cierra los ojos la flor!',
    'Ай! Бодрый цветок отбил капли лепестками! Сначала ослепи его прожектором!':
      '¡Ay! ¡La flor espabilada desvió las gotas con sus pétalos! ¡Deslúmbrala primero con el foco!',
    'Спящий подсолнух': 'Girasol Dormido',
    'Сонный нектар подействовал — людоед засопел!':
      '¡El néctar hizo efecto — la planta carnívora ya ronca!',
    'Хрум-ам!': '¡Ñam-Crac!',
    'Нельзя трогать бодрствующего хищного подсолнуха! Он чуть не проглотил Торквемаду!':
      '¡No toques a un girasol carnívoro despierto! ¡Casi se traga a Torquemada!',
    'Храпит и пахнет ванилью!': '¡Ronca y huele a vainilla!',
    'Серый вредитель Хват отправлен искать другой колпак!':
      '¡El travieso Zarpas salió volando a buscar otra cúpula!',
    'Тр-р-р! Небольшой статический разряд — и Серый Хват пулей сбежал!':
      '¡Zzzap! ¡Un chispazo estático y el gris Zarpas salió disparado!',
    'Хват вцепился когтями в колпак: «Моё!» Надо его шугануть или поднять магией!':
      'Zarpas clavó las uñas en la cúpula: «¡Mío!» ¡Hay que espantarlo o levantarlo con magia!',
    'На колпаке сидит вредный серый кот Хват! Сначала сгони его!':
      '¡El molesto gato gris Zarpas está sentado en la cúpula! ¡Échalo primero!',
    'Путь к ключ-карте свободен!': '¡Camino libre hacia la tarjeta llave!',
    'Био-карта': 'Bio-Tarjeta',
    'Цифровой пропуск от двери теплицы':
      'Pase digital para la puerta del invernadero',
    'Ключ-карта в кармане!': '¡Tarjeta llave guardada!',
    'Хищный цветок не пускает к двери!':
      '¡La flor carnívora bloquea el paso a la puerta!',

    // Level 7
    'Архив Голограмм и Свитков': 'Archivo de Hologramas y Pergaminos',
    'Уровень 7 · Код когтя': 'Capítulo 7 · Código de Garra',
    '«Выход перерезан красными лазерами. Пароль спрятан на свитке под потолком!»':
      '«¡Láseres rojos bloquean la salida! La contraseña está oculta en un pergamino bajo el techo.»',
    'Лазеры погасли с шипением, и стальной шлюз архива открылся!':
      '¡Los láseres se apagaron siseando y la compuerta de acero se abrió!',
    'Голо-розетка питания': 'Enchufe Holo-Eléctrico',
    'Свиток с мелкими рунами': 'Pergamino con Runas Diminutas',
    'Кодовый терминал': 'Terminal de Código',
    'Тугой рычаг сброса': 'Palanca Dura de Reinicio',
    'Лазерная сетка': 'Rejilla Láser',
    'Рыже-белый кот-архивариус Мурзик': 'Gato Archivista Bicolor Murzik',
    'Шлюз архива': 'Esclusa del Archivo',
    'Снимите свиток телекинезом и увеличьте руны, чтобы прочитать пароль. Закоротите голо-розетку, введите код и дёрните тугой рычаг магией!':
      'Bajen el pergamino con telequinesis y agranden las runas para leer la clave. Sobrecarguen el enchufe, tecleen el código y tiren de la palanca dura con magia.',
    '1) Торквемада: «Хакер-ток» на Голо-розетку. 2) Томас: «Телекинез», затем «Увеличение» на Свиток. 3) Торквемада: «Лапки» на Кодовый терминал. 4) Томас: «Телекинез» на Тугой рычаг. 5) Пройдите через Дверь!':
      '1) Torquemada: Chispazo Hacker en el Enchufe. 2) Tomás: Telequinesis y luego Agrandar en el Pergamino. 3) Torquemada: Patitas en la Terminal de Código. 4) Tomás: Telequinesis en la Palanca Dura. 5) ¡Crucen la Puerta!',
    'Перегрузил контур лазеров! Осталось ввести код и дёрнуть рубильник!':
      '¡Circuito láser sobrecargado! ¡Falta teclear la clave y bajar la palanca!',
    'Спустил свиток пониже... Но буквы микроскопические!':
      'Bajé el pergamino... ¡pero las runas son microscópicas!',
    'Свиток с кодом «7-4-2»': 'Pergamino con Código «7-4-2»',
    'Ага! Вижу крупно: код «7-4-2»!': '¡Ajá! Ahora se lee enorme: ¡código «7-4-2»!',
    'Нужен 3-значный код! Кажется, он написан на свитке наверху.':
      '¡Hace falta un código de 3 cifras! Creo que está en el pergamino de arriba.',
    'Ввёл 7-4-2! Теперь дёргай ржавый рычаг, Томас — мне не провернуть!':
      '¡Puse 7-4-2! ¡Ahora tira de la palanca oxidada, Tomás — yo no puedo!',
    'Уф, прикипел! Нужен телекинез Томаса!':
      '¡Uf, atascada! ¡Hace falta la telequinesis de Tomás!',
    'Рычаг заблокирован! Нужен и взлом розетки, и код в терминале.':
      '¡Palanca bloqueada! Hacen falta el hackeo del enchufe y el código en la terminal.',
    'Лазеры погасли! Бежим к двери!': '¡Láseres apagados! ¡Corramos a la puerta!',
    'Ой, лазерный подпал!': '¡Chamusquina Láser!',
    'Красные лучи сработали на прикосновение — сначала отключи сеть и введи код!':
      '¡Los rayos rojos saltaron al contacto — corta la red e introduce el código primero!',
    'Рыже-белый Архивариус Мурзик поправляет очки: «Свиток с кодом лежит наверху, но буквы крошечные — сними его и увеличь!»':
      'El archivista Murzik se ajusta las gafas: «¡El pergamino con la clave está arriba, pero la letra es diminuta — bájenlo y agrándenlo!»',

    // Level 8
    'Кузница Кибер-Горгульи': 'Forja de la Ciber-Gárgola',
    'Уровень 8 · Железный ошейник': 'Capítulo 8 · Collar de Hierro',
    '«Ворота заварены припоем, а раскалённый крюк заперт в кузнечной клетке. За дело!»':
      '«El portón está soldado con estaño y el gancho candente está encerrado en la jaula. ¡Manos a la obra!»',
    'Засов сжался, цепь натянулась, и тяжёлые ворота кузницы с грохотом распахнулись.':
      'El cerrojo se encogió, la cadena se tensó y el gran portón de la forja se abrió con estruendo.',
    'Тень у наковальни': 'Sombra junto al Yunque',
    'Тень в клетке кузни': 'Sombra en la Jaula',
    'Раскалённый крюк': 'Gancho Incandescente',
    'Электропечь кузницы': 'Horno Eléctrico de la Forja',
    'Вентиль кузнечных мехов': 'Válvula del Fuelle',
    'Цепь с застывшим припоем': 'Cadena Soldada con Estaño',
    'Массивный засов ворот': 'Cerrojo Macizo del Portón',
    'Ворота кузницы': 'Portón de la Forja',
    'Запустите электропечь, раздуйте меха до максимума и расплавьте припой. Заберите крюк через тень и уменьшите засов!':
      'Enciendan el horno eléctrico, agranden el fuelle para fundir la soldadura, cojan el gancho por las sombras y encojan el cerrojo.',
    '1) Торквемада: «Хакер-ток» на Электропечь. 2) Томас: «Увеличение», затем «Телекинез» на Вентиль мехов. 3) Томас: «Тень-прыжок» в клетку, затем «Телекинез» на Раскалённый крюк, затем обратно. 4) Томас: «Уменьшение» на Массивный засов. 5) Нажмите на Ворота!':
      '1) Torquemada: Chispazo Hacker en el Horno. 2) Tomás: Agrandar y luego Telequinesis en la Válvula del Fuelle. 3) Tomás: Salto Sombrío a la jaula, Telequinesis al Gancho y salto de vuelta. 4) Tomás: Encoger en el Cerrojo Macizo. 5) ¡Pulsen en el Portón!',
    'Готово! Ворота кузницы открылись!': '¡Listo! ¡Se abrió el portón de la forja!',
    'Печь запылала! Теперь раздуй меха посильнее, Томас!':
      '¡El horno arde! ¡Ahora aviva el fuelle bien grande, Tomás!',
    'Огромные меха! Теперь дуну ими телекинезом!':
      '¡Menudo fuelle gigante! ¡Ahora soplaré con telequinesis!',
    'Печь ещё холодная — сначала включи её!':
      'El horno aún está frío — ¡enciéndelo primero!',
    'Слабоват ветерок — сначала увеличь меха!':
      'Demasiada poca brisa — ¡agranda el fuelle primero!',
    'Ух! Жар расплавил припой на цепи!':
      '¡Uf! ¡El calor fundió la soldadura de la cadena!',
    'Свинцовая решётка! Прыгни в тень внутрь.':
      '¡Barrotes de plomo! Salta adentro por la sombra.',
    'Зацепил раскалённый крюк прямо за цепь ворот!':
      '¡Enganché el gancho candente directo a la cadena del portón!',
    'Засов сжался до булавки!': '¡El cerrojo se encogió como un alfiler!',

    // Level 9
    'Винтовая Лестница Спиралей': 'Pozo de la Escalera Espiral',
    'Уровень 9 · Магнитный колодец': 'Capítulo 9 · Pozo Magnético',
    '«Мостик парит под потолком на электромагнитах, а впереди кружит зубастый Дрон-Мопс!»':
      '«¡La pasarela flota en el techo por electroimanes, y delante patrulla un Dron-Carlino dentudo!»',
    'Писклявый микро-дрон кружится в углу, магнитный мост замкнут, а коты уже у самых главных врат!':
      'El micro-dron chillón gira inofensivo en un rincón, el puente magnético está listo y los gatos llegan a las puertas finales.',
    'Тень у перил': 'Sombra junto a la Barandilla',
    'Тень за спиной дрона': 'Sombra tras el Dron',
    'Магнитный рубильник': 'Interruptor Magnético',
    'Белый кот-вредитель Снежок': 'Gato Blanco Travieso Copito',
    'Парящая магнитная платформа': 'Puente Magnético Flotante',
    'Патрульный Дрон-Мопс': 'Dron-Carlino Patrullero',
    'Магнитный шлюз': 'Esclusa Magnética',
    'Белый вредитель Снежок оккупировал магнитный рубильник — истрепите его причёску статикой или снимите телекинезом! И не забудьте уменьшить Дрона-Мопса.':
      'El gato blanco Copito acaparó el interruptor magnético — ¡despeinen su pelaje con estática o bájeno con telequinesis! Y no olviden encoger al Dron-Carlino.',
    '1) Томас: «Уменьшение» на Дрона-Мопса. 2) Томас («Телекинез») или Торквемада («Хакер-ток») на Белого Снежка. 3) Торквемада: «Хакер-ток» на Магнитный рубильник. 4) Томас: «Телекинез» на Магнитный рубильник. 5) Торквемада перебегает и жмёт «Хакер-ток» на Магнитный шлюз!':
      '1) Tomás: Encoger al Dron-Carlino. 2) Tomás (Telequinesis) o Torquemada (Chispazo Hacker) sobre Copito. 3) Torquemada: Chispazo Hacker en el Interruptor Magnético. 4) Tomás: Telequinesis en el Interruptor. 5) ¡Torquemada cruza y da Chispazo Hacker en la Esclusa!',
    'Белый Снежок взвыл: «Фи, статика испортила мне укладку!» — и удрал!':
      'Copito maulló indignado: «¡Puaj, la estática arruinó mi peinado!» — ¡y escapó!',
    'Сбросили белого вредителя с рубильника!':
      '¡Quitamos al gato blanco del interruptor!',
    'Снежок надулся: «Не подходи! Я тут любуюсь спиралями!»':
      'Copito se infló: «¡No te acerques! ¡Estoy admirando las espirales!»',
    'Игрушечный мини-мопс': 'Mini-Carlino de Juguete',
    'Хи-хи! Теперь этот грозный охранник пищит как резиновая уточка!':
      '¡Je, je! ¡Ahora ese fiero guardián chilla como un patito de goma!',
    'Тяв-Сирена!': '¡Guau-Sirena!',
    'Дрон-Мопс поднял тревогу при приближении! Надо его уменьшить магией!':
      '¡El Dron-Carlino dio la alarma al acercarse! ¡Hay que encogerlo con magia!',
    'Какой милый карманный робо-мопсик!':
      '¡Qué robo-carlino de bolsillo tan mono!',
    'На рубильнике уселся Белый Снежок и не пускает к кнопкам!':
      '¡Copito está sentado encima del interruptor tapando los botones!',
    'Полярность сменил! Но рубильник зажат тугой скобой — дёргай, Томас!':
      '¡Invertí la polaridad! Pero la palanca está trabada — ¡tira de ella, Tomás!',
    'Сначала Торквемада должен сменить полярность током!':
      '¡Primero Torquemada debe invertir la polaridad con corriente!',
    'Мост опускается к полу! Можно бежать!':
      '¡El puente desciende al suelo! ¡A correr!',
    'Мост ещё под потолком!': '¡El puente sigue pegado al techo!',
    'Дрон-Мопс поймал!': '¡Atrapado por el Dron-Carlino!',
    'Нельзя бежать мимо полноразмерного Дрона-Мопса — уменьши его сначала!':
      '¡No puedes pasar corriendo junto al Dron-Carlino gigante — encógelo primero!',
    'Магнитный замок требует «Хакер-тока»!':
      '¡La cerradura magnética exige un Chispazo Hacker!',

    // Level 10
    'Врата Свободы': 'Puertas de la Libertad',
    'Уровень 10 · Финальный реванш пса': 'Capítulo 10 · Revancha del Sabueso',
    '«Вот и выход в Звёздную Ночь! Но наш знакомый Пёс Баскервиль спустился на лифте и снова храпит у главных врат!»':
      '«¡Aquí está la salida hacia la Noche Estrellada! Pero nuestro viejo conocido Baskerville bajó en el ascensor y vuelve a roncar ante el portón!»',
    'Баскервиль с восторгом унёсся за гигантской костью, древние врата распахнулись, и Томас с Торквемадой выбежали на свободу под вихревым небом Ван Гога!':
      'Baskerville corrió feliz tras el hueso gigante, el antiguo portón se abrió de par en par y Tomás y Torquemada salieron en libertad bajo el cielo arremolinado de Van Gogh.',
    'Пульт катапульты и голо-витрина': 'Consola de Catapulta y Holo-Vitrina',
    'Резиновая косточка на балке': 'Hueso de Goma en la Viga',
    'Старинная катапульта': 'Catapulta Antigua',
    'Броне-пёс Баскервиль': 'Sabueso Acorazado Baskerville',
    'Био-сканер Врат': 'Bio-Escáner del Portón',
    'Древний Штурвал Врат': 'Antiguo Timón del Portón',
    'Сделайте резиновую кость гигантской, зарядите её в катапульту и запустите с пульта. Когда пёс убежит за ней — взломайте био-сканер и поверните штурвал магией!':
      'Agranden el hueso de goma, cárguenlo en la catapulta y dispárenlo desde la consola. Cuando el perro salga corriendo tras él, ¡hackeen el bio-escáner y giren el timón con magia!',
    '1) Томас: «Увеличение», затем «Телекинез» на Резиновую косточку. 2) Торквемада: «Хакер-ток» на Пульт катапульты (слева). 3) Торквемада: «Хакер-ток» на Био-сканер у врат. 4) Томас: «Телекинез» на Древний Штурвал Врат!':
      '1) Tomás: Agrandar y luego Telequinesis sobre el Hueso de Goma. 2) Torquemada: Chispazo Hacker en la Consola (izquierda). 3) Torquemada: Chispazo Hacker en el Bio-Escáner. 4) ¡Tomás: Telequinesis en el Antiguo Timón del Portón!',
    'Гигантская Мега-Кость': 'Mega-Hueso Gigante',
    'Вот это Мега-Кость! Теперь положу её в катапульту!':
      '¡Vaya Mega-Hueso! ¡Ahora lo cargaré en la catapulta!',
    'Мелковата приманка — Баскервиль даже не взглянет. Увеличь кость сначала!':
      'Señuelo demasiado pequeño — Baskerville ni lo mirará. ¡Agranda el hueso primero!',
    'Мега-Кость заряжена! Торквемада, жми пуск на пульте слева!':
      '¡Mega-Hueso cargado! ¡Torquemada, pulsa lanzar en la consola izquierda!',
    'Катапульта пуста! Надо зарядить её гигантской костью!':
      '¡La catapulta está vacía! ¡Cárgala con un hueso gigante!',
    'Счастливый пёс с Мега-Костью': 'Sabueso Feliz con Mega-Hueso',
    'ГАВ-МНЯМ!! ВОТ ЭТО КОСТОЧКА! Я ЗАНЯТ!':
      '¡¡GUAU-ÑAM!! ¡¡MENUDO HUESAZO!! ¡ESTOY OCUPADO!',
    'Финальный кусь!': '¡Mordisco Final!',
    'Баскервиль в бронеошейнике начеку! Отвлеки его гигантской костью из катапульты!':
      '¡Baskerville con su collar blindado está alerta! ¡Distráelo lanzando un hueso gigante!',
    'Теперь у него дел на всю ночь — пусть грызёт!':
      'Ahora tiene faena para toda la noche — ¡que lo roa a gusto!',
    'Био-сканер взломан! Томас, крути огромный штурвал телекинезом!':
      '¡Bio-escáner hackeado! ¡Tomás, gira el enorme timón con telequinesis!',
    'Этот штурвал весит тонну! Томас, нужна твоя магия!':
      '¡Ese timón pesa una tonelada! ¡Tomás, hace falta tu magia!',
    'Рано крутишь!': '¡Demasiado Pronto!',
    'Баскервиль услышал скрип штурвала и бросился на котов!':
      '¡Baskerville oyó chirriar el timón y se abalanzó sobre los gatos!',
    'Штурвал заблокирован электроникой — Торквемада должен взломать био-сканер!':
      'El timón está bloqueado electrónicamente — ¡Torquemada debe hackear el bio-escáner!',
  },
};
