export interface DealCard {
  id: string;
  category: 'SMALL' | 'BIG';
  type: 'REAL_ESTATE' | 'STOCK' | 'BUSINESS' | 'VEHICLE' | 'COMMODITY';
  title: string;
  description: string;
  cost: number;
  downPayment: number;
  mortgage?: number;
  cashflow: number;
  symbol?: string;
  tradingRange?: string;
}

export interface DoodadCard {
  id: string;
  title: string;
  description: string;
  cost: number;
}

export interface MarketCard {
  id: string;
  title: string;
  description: string;
  targetType: 'REAL_ESTATE' | 'STOCK' | 'BUSINESS' | 'VEHICLE' | 'COMMODITY' | 'SPLIT';
  offerPrice?: number;
  symbol?: string;
  splitRatio?: number;
}

// ---------------------------------------------------------------------------
// 1. МАЛЫЕ СДЕЛКИ (ВЗНОС $500–$5,000 | ПОТОК +$60–$250/МЕС)
// ---------------------------------------------------------------------------
export const SMALL_DEALS: DealCard[] = [
  // Автотранспорт
  {
    id: 's_veh_1',
    category: 'SMALL',
    type: 'VEHICLE',
    title: 'Автомобиль под такси (Седан)',
    description: 'Экономичный седан со страховкой, переданный в аренду водителю.',
    cost: 10000,
    downPayment: 2000,
    mortgage: 8000,
    cashflow: 120
  },
  {
    id: 's_veh_2',
    category: 'SMALL',
    type: 'VEHICLE',
    title: 'Хэтчбек в каршеринг-парк',
    description: 'Городской автомобиль в партнерской программе автопроката.',
    cost: 12000,
    downPayment: 2500,
    mortgage: 9500,
    cashflow: 150
  },

  // Малая недвижимость (Арендные квартиры, гаражи, участки)
  {
    id: 's_re_1',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: '1-комнатная квартира (Кондо 2Br/1Ba)',
    description: 'Залоговое жилье от банка с дисконтом. Сдано стабильным арендаторам.',
    cost: 40000,
    downPayment: 4000,
    mortgage: 36000,
    cashflow: 160
  },
  {
    id: 's_re_2',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: '2-комнатная квартира',
    description: 'Квартира в спальном районе. Высокий арендный спрос.',
    cost: 50000,
    downPayment: 5000,
    mortgage: 45000,
    cashflow: 200
  },
  {
    id: 's_re_3',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Студия рядом с вузом',
    description: 'Компактное жилье с постоянным спросом от студентов.',
    cost: 30000,
    downPayment: 3000,
    mortgage: 27000,
    cashflow: 130
  },
  {
    id: 's_re_4',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Капитальный гаражный бокс',
    description: 'Сухой охраняемый бокс в густонаселенном квартале.',
    cost: 7000,
    downPayment: 1500,
    mortgage: 5500,
    cashflow: 80
  },
  {
    id: 's_re_5',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Машиноместо в подземном паркинге',
    description: 'Охраняемый паркинг с постоянным долгосрочным арендатором.',
    cost: 8000,
    downPayment: 2000,
    mortgage: 6000,
    cashflow: 90
  },
  {
    id: 's_re_6',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Кладовое помещение (Стрит-склад)',
    description: 'Помещение цокольного этажа для сезонного хранения вещей.',
    cost: 5000,
    downPayment: 1000,
    mortgage: 4000,
    cashflow: 60
  },
  {
    id: 's_re_7',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Дачный участок (10 соток)',
    description: 'Перспективный участок земли. Потока нет, ставка на рост цены.',
    cost: 12000,
    downPayment: 3000,
    mortgage: 9000,
    cashflow: 0
  },
  {
    id: 's_re_8',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Квартира под ремонт',
    description: 'Продается ниже рынка. После косметики дает стабильный доход.',
    cost: 25000,
    downPayment: 3000,
    mortgage: 22000,
    cashflow: 140
  },
  {
    id: 's_re_9',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Комната в коммунальной квартире',
    description: 'Комната в центре, стабильная помесячная аренда.',
    cost: 18000,
    downPayment: 2000,
    mortgage: 16000,
    cashflow: 100
  },
  {
    id: 's_re_10',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Участок у озера',
    description: 'Земля в курортной зоне под будущую перепродажу.',
    cost: 15000,
    downPayment: 3000,
    mortgage: 12000,
    cashflow: 0
  },
  {
    id: 's_re_11',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Угловой таунхаус',
    description: 'Небольшой таунхаус с отдельным входом и арендатором.',
    cost: 60000,
    downPayment: 5000,
    mortgage: 55000,
    cashflow: 220
  },

  // Малый бизнес и вендинг
  {
    id: 's_bs_1',
    category: 'SMALL',
    type: 'BUSINESS',
    title: 'Кофейный автомат (Вендинг)',
    description: 'Установлен на проходном этаже госучреждения.',
    cost: 3000,
    downPayment: 3000,
    cashflow: 120
  },
  {
    id: 's_bs_2',
    category: 'SMALL',
    type: 'BUSINESS',
    title: 'Снековый вендинговый аппарат',
    description: 'Размещен в зале ожидания автосервиса.',
    cost: 2500,
    downPayment: 2500,
    cashflow: 100
  },
  {
    id: 's_bs_3',
    category: 'SMALL',
    type: 'BUSINESS',
    title: 'Постамат выдачи интернет-заказов',
    description: 'Автоматический пункт выдачи посылок в супермаркете.',
    cost: 4000,
    downPayment: 4000,
    cashflow: 150
  },
  {
    id: 's_bs_4',
    category: 'SMALL',
    type: 'BUSINESS',
    title: 'Островок экспресс-маникюра',
    description: 'Оборудованное место в торговом центре с мастером.',
    cost: 6000,
    downPayment: 3000,
    mortgage: 3000,
    cashflow: 180
  },
  {
    id: 's_bs_5',
    category: 'SMALL',
    type: 'BUSINESS',
    title: 'Паевая доля в веб-студии (5%)',
    description: 'Пассивный дивидендный доход от IT-агентства.',
    cost: 4500,
    downPayment: 4500,
    cashflow: 160
  },
  {
    id: 's_bs_6',
    category: 'SMALL',
    type: 'BUSINESS',
    title: 'Киоск мороженого в парке',
    description: 'Сезонная точка продаж с наемным продавцом.',
    cost: 3500,
    downPayment: 3500,
    cashflow: 130
  },

  // Акции и биржевые инструменты (Капитал разгоняется на Рынке)
  {
    id: 's_st_1',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Акции "OK4U" (Фармацевтика)',
    description: 'Фармацевтическая компания. Торговый диапазон $5–$30.',
    cost: 10,
    downPayment: 10,
    cashflow: 0,
    symbol: 'OK4U',
    tradingRange: '$5 - $30'
  },
  {
    id: 's_st_2',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Акции "MYT4U" (IT & Технологии)',
    description: 'Разработчик ПО и микрочипов. Торговый диапазон $10–$40.',
    cost: 20,
    downPayment: 20,
    cashflow: 0,
    symbol: 'MYT4U',
    tradingRange: '$10 - $40'
  },
  {
    id: 's_st_3',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Акции "2BIG" (Энергетический холдинг)',
    description: 'Голубая фишка энергетического сектора. Диапазон $15–$50.',
    cost: 30,
    downPayment: 30,
    cashflow: 0,
    symbol: '2BIG',
    tradingRange: '$15 - $50'
  },
  {
    id: 's_st_4',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Акции "ON2U" (Биотех-стартап)',
    description: 'Венчурный стартап по низкой цене. Диапазон $1–$20.',
    cost: 5,
    downPayment: 5,
    cashflow: 0,
    symbol: 'ON2U',
    tradingRange: '$1 - $20'
  },
  {
    id: 's_st_5',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Дивидендные акции "GRO4U"',
    description: 'Фонд REIT с фиксированным ежемесячным дивидендом.',
    cost: 1000,
    downPayment: 1000,
    cashflow: 30,
    symbol: 'GRO4U'
  },
  {
    id: 's_st_6',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Банковский депозитный сертификат',
    description: 'Консервативный инструмент с защитой вклада.',
    cost: 2000,
    downPayment: 2000,
    cashflow: 40
  },

  // Драгметаллы и коллекционные активы
  {
    id: 's_cm_1',
    category: 'SMALL',
    type: 'COMMODITY',
    title: 'Золотая инвестиционная монета (1 oz)',
    description: 'Защитный актив от инфляции для последующей перепродажи.',
    cost: 1200,
    downPayment: 1200,
    cashflow: 0,
    symbol: 'GOLD'
  },
  {
    id: 's_cm_2',
    category: 'SMALL',
    type: 'COMMODITY',
    title: 'Коллекция серебряных монет',
    description: 'Нумизматический лот, продаваемый с дисконтом.',
    cost: 600,
    downPayment: 600,
    cashflow: 0,
    symbol: 'SILVER'
  },
  {
    id: 's_cm_3',
    category: 'SMALL',
    type: 'COMMODITY',
    title: 'Антикварные механические часы',
    description: 'Швейцарский хронометр в идеальной сохранности.',
    cost: 1500,
    downPayment: 1500,
    cashflow: 0,
    symbol: 'ANTIQUES'
  }
];

// ---------------------------------------------------------------------------
// 2. КРУПНЫЕ СДЕЛКИ (ВЗНОС $8,000–$45,000 | ПОТОК +$400–$1,500/МЕС)
// ---------------------------------------------------------------------------
export const BIG_DEALS: DealCard[] = [
  // Распределительные центры и склады
  {
    id: 'b_rc_1',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Складской комплекс «РЦ Тамбовская»',
    description: 'Логистический хаб класса «А» со стабильными федеральными арендаторами.',
    cost: 180000,
    downPayment: 28000,
    mortgage: 152000,
    cashflow: 1100
  },
  {
    id: 'b_rc_2',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Логистический центр «РЦ Агротерминал»',
    description: 'Специализированный склад с охлаждаемыми камерами под продовольствие.',
    cost: 210000,
    downPayment: 34000,
    mortgage: 176000,
    cashflow: 1300
  },
  {
    id: 'b_rc_3',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Грузовой терминал «РЦ Пограничников»',
    description: 'Перевалочный логистический терминал с ж/д веткой и зоной погрузки.',
    cost: 240000,
    downPayment: 40000,
    mortgage: 200000,
    cashflow: 1500
  },

  // Доходные многоквартирные дома
  {
    id: 'b_re_1',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: '4-квартирный жилой дом (4-Plex)',
    description: 'Все 4 квартиры сданы постоянным семьям.',
    cost: 80000,
    downPayment: 12000,
    mortgage: 68000,
    cashflow: 500
  },
  {
    id: 'b_re_2',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: '8-квартирный жилой комплекс (8-Plex)',
    description: 'Доходный комплекс рядом с транспортным узлом.',
    cost: 140000,
    downPayment: 22000,
    mortgage: 118000,
    cashflow: 850
  },
  {
    id: 'b_re_3',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: '12-квартирный дом у парка',
    description: 'Стабильный арендный дом с управляющим на объекте.',
    cost: 190000,
    downPayment: 30000,
    mortgage: 160000,
    cashflow: 1150
  },
  {
    id: 'b_re_4',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: '24-квартирный жилой комплекс (24-Plex)',
    description: 'Крупный доходный объект с высокой заполняемостью.',
    cost: 260000,
    downPayment: 42000,
    mortgage: 218000,
    cashflow: 1450
  },
  {
    id: 'b_re_5',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Коттеджный поселок (3 дома в аренде)',
    description: 'Загородные дома, сданные в долгосрочный наем.',
    cost: 160000,
    downPayment: 26000,
    mortgage: 134000,
    cashflow: 950
  },
  {
    id: 'b_re_6',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Бутик-отель на 10 номеров',
    description: 'Небольшая гостиница с постоянной загрузкой туристами.',
    cost: 150000,
    downPayment: 24000,
    mortgage: 126000,
    cashflow: 900
  },

  // Коммерческая недвижимость
  {
    id: 'b_re_7',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Торговая галерея «Районная»',
    description: 'Торговые площади с продуктовым супермаркетом и аптекой.',
    cost: 220000,
    downPayment: 36000,
    mortgage: 184000,
    cashflow: 1350
  },
  {
    id: 'b_re_8',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Офисный центр класса «B»',
    description: 'Трехэтажное офисное здание с парковкой.',
    cost: 250000,
    downPayment: 40000,
    mortgage: 210000,
    cashflow: 1400
  },
  {
    id: 'b_re_9',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Медицинский центр (Аренда)',
    description: 'Здание сдано в долгосрочную аренду сети частных клиник.',
    cost: 170000,
    downPayment: 27000,
    mortgage: 143000,
    cashflow: 1000
  },
  {
    id: 'b_re_10',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Фитнес-клуб с залом',
    description: 'Спортивный объект с договором с сетевым оператором.',
    cost: 185000,
    downPayment: 29000,
    mortgage: 156000,
    cashflow: 1100
  },
  {
    id: 'b_re_11',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Придорожный мотель с кафе',
    description: 'Комплекс у трассы с постоянным потоком водителей.',
    cost: 135000,
    downPayment: 20000,
    mortgage: 115000,
    cashflow: 800
  },
  {
    id: 'b_re_12',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Стрит-ритейл на проспекте',
    description: 'Линейка коммерческих помещений под рестораны и магазины.',
    cost: 145000,
    downPayment: 22000,
    mortgage: 123000,
    cashflow: 850
  },

  // Крупный бизнес и франшизы
  {
    id: 'b_bs_1',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Автоматическая автомойка (2 поста)',
    description: 'Бесконтактная робот-мойка с минимальными расходами на персонал.',
    cost: 65000,
    downPayment: 14000,
    mortgage: 51000,
    cashflow: 600
  },
  {
    id: 'b_bs_2',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Франшиза пиццерии с доставкой',
    description: 'Популярная городская точка фастфуда с налаженной логистикой.',
    cost: 95000,
    downPayment: 18000,
    mortgage: 77000,
    cashflow: 750
  },
  {
    id: 'b_bs_3',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Сеть аптечных пунктов (2 филиала)',
    description: 'Бизнес товаров первой необходимости со стабильной выручкой.',
    cost: 110000,
    downPayment: 20000,
    mortgage: 90000,
    cashflow: 800
  },
  {
    id: 'b_bs_4',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Парк спецтехники (Автокраны)',
    description: '3 единицы строительной техники по долгосрочным договорам подряда.',
    cost: 130000,
    downPayment: 24000,
    mortgage: 106000,
    cashflow: 900
  },
  {
    id: 'b_bs_5',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Производство гофроупаковки',
    description: 'Линия по изготовлению картонных коробок для интернет-магазинов.',
    cost: 175000,
    downPayment: 30000,
    mortgage: 145000,
    cashflow: 1150
  },
  {
    id: 'b_bs_6',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Типография полного цикла',
    description: 'Печатное производство с пулом постоянных корпоративных клиентов.',
    cost: 120000,
    downPayment: 22000,
    mortgage: 98000,
    cashflow: 800
  },
  {
    id: 'b_bs_7',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Сеть прачечных самообслуживания',
    description: '4 точки возле студгородков с автоматическим приемом оплаты.',
    cost: 75000,
    downPayment: 15000,
    mortgage: 60000,
    cashflow: 650
  },
  {
    id: 'b_bs_8',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Частный детский сад',
    description: 'Лицензированный центр с постоянным набором детей.',
    cost: 105000,
    downPayment: 19000,
    mortgage: 86000,
    cashflow: 750
  },
  {
    id: 'b_bs_9',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Крафтовая пивоварня',
    description: 'Варка напитков с прямыми поставками в городские пабы.',
    cost: 125000,
    downPayment: 23000,
    mortgage: 102000,
    cashflow: 850
  },
  {
    id: 'b_bs_10',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Автосервис на 4 поста',
    description: 'Слесарный цех со стендом сход-развала и клиентской базой.',
    cost: 135000,
    downPayment: 25000,
    mortgage: 110000,
    cashflow: 900
  },
  {
    id: 'b_bs_11',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Серверный дата-центр',
    description: 'Стойки размещения серверов с бесперебойным питанием.',
    cost: 200000,
    downPayment: 35000,
    mortgage: 165000,
    cashflow: 1300
  },
  {
    id: 'b_bs_12',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Сеть кофеен формата «Take Away»',
    description: '3 точки в деловых центрах города с высоким трафиком.',
    cost: 115000,
    downPayment: 21000,
    mortgage: 94000,
    cashflow: 800
  },
  {
    id: 'b_bs_13',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Швейный цех спецодежды',
    description: 'Контракты на пошив униформы для промышленных предприятий.',
    cost: 140000,
    downPayment: 25000,
    mortgage: 115000,
    cashflow: 950
  },
  {
    id: 'b_re_13',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Загородный пансионат',
    description: 'База отдыха с круглогодичной арендой номеров.',
    cost: 195000,
    downPayment: 32000,
    mortgage: 163000,
    cashflow: 1200
  }
];

// ---------------------------------------------------------------------------
// 3. ВСЯКАЯ ВСЯЧИНА / РАСХОДЫ (DOODADS)
// ---------------------------------------------------------------------------
export const DOODADS: DoodadCard[] = [
  { id: 'd_1', title: 'Ремонт автомобиля', description: 'Замена сцепления и тормозных колодок.', cost: 600 },
  { id: 'd_2', title: 'Новый смартфон', description: 'Покупка новой модели телефона взамен разбитого.', cost: 900 },
  { id: 'd_3', title: 'Ужин в ресторане', description: 'Праздничный вечер с друзьями.', cost: 200 },
  { id: 'd_4', title: 'Шопинг выходного дня', description: 'Обновление гардероба на сезон.', cost: 350 },
  { id: 'd_5', title: 'Услуги стоматолога', description: 'Срочное лечение и пломбирование зубов.', cost: 750 },
  { id: 'd_6', title: 'Отпуск на море', description: 'Билеты и неделя проживания в отеле.', cost: 1400 },
  { id: 'd_7', title: 'Замена стиральной машины', description: 'Покупка новой техники взамен сломавшейся.', cost: 650 },
  { id: 'd_8', title: 'Городской электросамокат', description: 'Покупка электротранспорта для прогулок.', cost: 450 },
  { id: 'd_9', title: 'Подарок на свадьбу', description: 'Конверт и поздравление близких друзей.', cost: 300 },
  { id: 'd_10', title: 'Онлайн-курсы', description: 'Оплата профессионального обучающего интенсива.', cost: 400 },
  { id: 'd_11', title: 'Штрафы и парковка', description: 'Оплата штрафов за нарушение ПДД.', cost: 150 },
  { id: 'd_12', title: 'Годовой фитнес-абонемент', description: 'Клубная карта в спортзал с бассейном.', cost: 550 },
  { id: 'd_13', title: 'Ветеринарная клиника', description: 'Осмотр и вакцинация домашнего питомца.', cost: 250 },
  { id: 'd_14', title: 'Игровая приставка', description: 'Консоль и подписка на игры.', cost: 600 },
  { id: 'd_15', title: 'Косметический ремонт кухни', description: 'Покраска стен и замена столешницы.', cost: 850 },
  { id: 'd_16', title: 'Доставка еды и кофе', description: 'Мелкие ежедневные траты на перекусы за месяц.', cost: 220 },
  { id: 'd_17', title: 'Налоговая пеня', description: 'Оплата пени за просрочку имущественного налога.', cost: 120 },
  { id: 'd_18', title: 'Празднование дня рождения', description: 'Банкет в кругу семьи.', cost: 450 },
  { id: 'd_19', title: 'Замена дверного замка', description: 'Срочный вызов мастера и замена фурнитуры.', cost: 140 }
];

// ---------------------------------------------------------------------------
// 4. КАРТОЧКИ РЫНКА (СОПРЯЖЕНЫ СО ВСЕМИ АКТИВАМИ)
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// 4. КАРТОЧКИ РЫНКА (ЩЕДРЫЕ РЫНОЧНЫЕ ОЦЕНКИ С РЕАЛЬНОЙ ПРИБЫЛЬЮ)
// ---------------------------------------------------------------------------
export const MARKET_CARDS: MarketCard[] = [
  // Склады и РЦ (Себестоимость $180k–$240k, Ипотека ~$150k–$200k ➔ Выкуп за $400k–$550k)
  {
    id: 'm_rc_1',
    title: 'Федеральный ритейлер выкупает «РЦ Тамбовская»',
    description: 'Инвестор предлагает выкупить РЦ Тамбовская за 420 000 $! (Чистая прибыль на руки более $260,000).',
    targetType: 'REAL_ESTATE',
    offerPrice: 420000
  },
  {
    id: 'm_rc_2',
    title: 'Агрохолдинг скупает «РЦ Агротерминал»',
    description: 'Предложение о выкупе терминала Агротерминал за 480 000 $ наличными.',
    targetType: 'REAL_ESTATE',
    offerPrice: 480000
  },
  {
    id: 'm_rc_3',
    title: 'Логистическая корпорация забирает «РЦ Пограничников»',
    description: 'Выкуп узлового терминала РЦ Пограничников за рекордные 550 000 $!',
    targetType: 'REAL_ESTATE',
    offerPrice: 550000
  },

  // Автотранспорт (Взнос $2k–$2.5k, Ипотека ~$8k–$9.5k ➔ Выкуп за $20k–$25k = профит $10k–$15k)
  {
    id: 'm_veh_1',
    title: 'Спрос на автомобили в таксопарках',
    description: 'Таксопарк готов выкупить легковые авто за 22 000 $ за штуку! (Чистый профит ~$14,000).',
    targetType: 'VEHICLE',
    offerPrice: 22000
  },
  {
    id: 'm_veh_2',
    title: 'Дефицит авто на вторичном рынке',
    description: 'Покупатели скупают любые легковые авто и хэтчбеки за 25 000 $!',
    targetType: 'VEHICLE',
    offerPrice: 25000
  },

  // Жилая недвижимость (Взнос $3k–$5k, Ипотека ~$25k–$45k ➔ Выкуп за $65k–$95k = чистыми на руки $30k–$50k!)
  {
    id: 'm_re_1',
    title: 'Покупатель на 1-2 комнатные квартиры',
    description: 'Инвестиционный фонд скупает 1-2 комнатные квартиры и кондо по 85 000 $ за объект (прибыль на руки ~$40,000 - $50,000)!',
    targetType: 'REAL_ESTATE',
    offerPrice: 85000
  },
  {
    id: 'm_re_2',
    title: 'Девелопер выкупает 4-квартирные дома',
    description: 'Готовы выкупить 4-квартирные дома (4-Plex) по цене 170 000 $ за объект (прибыль на руки более $100,000)!',
    targetType: 'REAL_ESTATE',
    offerPrice: 170000
  },
  {
    id: 'm_re_3',
    title: 'Инвестор скупает 8-квартирные дома',
    description: 'Выкуп 8-квартирных жилых комплексов (8-Plex) по цене 280 000 $ (прибыль на руки ~$160,000).',
    targetType: 'REAL_ESTATE',
    offerPrice: 280000
  },
  {
    id: 'm_re_4',
    title: 'Институциональный фонд скупает 12-24 кв. дома',
    description: 'Предложение о выкупе крупных домов (12 и 24 кв.) по цене 520 000 $ (прибыль на руки ~$300,000)!',
    targetType: 'REAL_ESTATE',
    offerPrice: 520000
  },
  {
    id: 'm_re_5',
    title: 'Спрос на земельные участки',
    description: 'Застройщики выкупают дачные участки и землю у озера за 45 000 $ (чистая прибыль $33,000)!',
    targetType: 'REAL_ESTATE',
    offerPrice: 45000
  },
  {
    id: 'm_re_6',
    title: 'Покупатели на гаражи и машиноместа',
    description: 'Жители квартала выкупают гаражи и паркинги по 20 000 $ (чистая прибыль ~$14,000).',
    targetType: 'REAL_ESTATE',
    offerPrice: 20000
  },

  // Коммерческая недвижимость
  {
    id: 'm_re_7',
    title: 'Торговый фонд выкупает ТЦ',
    description: 'Крупный ритейлер выкупает Торговые галереи и ТЦ за 480 000 $ наличными (прибыль ~$290,000)!',
    targetType: 'REAL_ESTATE',
    offerPrice: 480000
  },
  {
    id: 'm_re_8',
    title: 'Корпорация скупает Офисные центры',
    description: 'Выкуп офисных БЦ за 540 000 $ наличными (прибыль ~$330,000).',
    targetType: 'REAL_ESTATE',
    offerPrice: 540000
  },
  {
    id: 'm_re_9',
    title: 'Гостиничная сеть выкупает отели и пансионаты',
    description: 'Готовы выкупить Бутик-отели и Пансионаты за 350 000 $!',
    targetType: 'REAL_ESTATE',
    offerPrice: 350000
  },

  // Готовый бизнес
  {
    id: 'm_bs_1',
    title: 'Покупатель на автомойки и автосервисы',
    description: 'Автохолдинг выкупает любые автомойки и автосервисы за 180 000 $ за точку (прибыль ~$70,000–$120,000).',
    targetType: 'BUSINESS',
    offerPrice: 180000
  },
  {
    id: 'm_bs_2',
    title: 'Ресторанный конгломерат выкупает пиццерии и кофейни',
    description: 'Готовы выкупить точки общепита за 250 000 $ (прибыль ~$150,000)!',
    targetType: 'BUSINESS',
    offerPrice: 250000
  },
  {
    id: 'm_bs_3',
    title: 'Аптечная сеть скупает филиалы',
    description: 'Выкуп любых аптечных пунктов за 240 000 $ (прибыль ~$150,000).',
    targetType: 'BUSINESS',
    offerPrice: 240000
  },
  {
    id: 'm_bs_4',
    title: 'Вендинговый оператор выкупает автоматы',
    description: 'Выкуп любых кофейных и снековых автоматов по 8 000 $ за шт (прибыль x2 к цене покупки).',
    targetType: 'BUSINESS',
    offerPrice: 8000
  },

  // Фондовый рынок (Акции)
  {
    id: 'm_st_1',
    title: 'Взлет фарм-сектора: "OK4U" по 40 $',
    description: 'Фармацевтический гигант получил одобрение препарата. Акции взлетели до 40 $!',
    targetType: 'STOCK',
    symbol: 'OK4U',
    offerPrice: 40
  },
  {
    id: 'm_st_2',
    title: 'IT-бум: акции "MYT4U" по 50 $',
    description: 'Рекордная квартальная прибыль IT-корпорации. Акции торгуются по 50 $!',
    targetType: 'STOCK',
    symbol: 'MYT4U',
    offerPrice: 50
  },
  {
    id: 'm_st_3',
    title: 'Энергетический спрос: "2BIG" по 55 $',
    description: 'Высокие дивиденды подняли котировки 2BIG до 55 $ за акцию!',
    targetType: 'STOCK',
    symbol: '2BIG',
    offerPrice: 55
  },
  {
    id: 'm_st_4',
    title: 'Прорыв биотеха: "ON2U" по 30 $',
    description: 'Стартап получил международный патент. Акции выросли до 30 $!',
    targetType: 'STOCK',
    symbol: 'ON2U',
    offerPrice: 30
  },

  // Сплиты
  {
    id: 'm_split_1',
    title: 'Сплит акций "OK4U" (2 к 1)',
    description: 'Количество всех имеющихся у вас акций OK4U удваивается!',
    targetType: 'SPLIT',
    symbol: 'OK4U',
    splitRatio: 2
  },
  {
    id: 'm_split_2',
    title: 'Сплит акций "MYT4U" (2 к 1)',
    description: 'Количество всех имеющихся у вас акций MYT4U удваивается!',
    targetType: 'SPLIT',
    symbol: 'MYT4U',
    splitRatio: 2
  },

  // Драгметаллы
  {
    id: 'm_cm_1',
    title: 'Ралли на рынке драгметаллов и антиквариата',
    description: 'Выкуп: монеты GOLD по 4 000 $, SILVER по 2 000 $, Антиквариат по 5 000 $!',
    targetType: 'COMMODITY',
    offerPrice: 4000
  }
];