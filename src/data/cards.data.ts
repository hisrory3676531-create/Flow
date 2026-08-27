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
// 1. МАЛЫЕ СДЕЛКИ (30 КАРТОЧЕК)
// ---------------------------------------------------------------------------
export const SMALL_DEALS: DealCard[] = [
  // Легковые авто
  {
    id: 's_veh_1',
    category: 'SMALL',
    type: 'VEHICLE',
    title: 'Легковое авто в таксопарк (Седан)',
    description: 'Экономичный седан со свежей страховкой. Сдан водителю в долгосрочную субаренду.',
    cost: 12000,
    downPayment: 2500,
    mortgage: 9500,
    cashflow: 250
  },
  {
    id: 's_veh_2',
    category: 'SMALL',
    type: 'VEHICLE',
    title: 'Легковое авто под каршеринг (Хэтчбек)',
    description: 'Новый компактный хэтчбек, подключенный к городской партнерской сети проката.',
    cost: 15000,
    downPayment: 3000,
    mortgage: 12000,
    cashflow: 300
  },

  // Недвижимость малая
  {
    id: 's_re_1',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: '1-комнатная квартира (Кондо)',
    description: 'Срочная продажа от собственника. Квартира полностью меблирована и сдана жильцам.',
    cost: 40000,
    downPayment: 4000,
    mortgage: 36000,
    cashflow: 180
  },
  {
    id: 's_re_2',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: '2-комнатная квартира',
    description: 'Банковский залоговый объект с дисконтом. Требуется минимальный косметический ремонт.',
    cost: 55000,
    downPayment: 5000,
    mortgage: 50000,
    cashflow: 220
  },
  {
    id: 's_re_3',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Студия у метро',
    description: 'Компактное жилье с гарантированным арендным спросом от студентов.',
    cost: 32000,
    downPayment: 3000,
    mortgage: 29000,
    cashflow: 150
  },
  {
    id: 's_re_4',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Капитальный гаражный бокс',
    description: 'Сухой охраняемый гараж в густонаселенном спальном квартале.',
    cost: 8000,
    downPayment: 1500,
    mortgage: 6500,
    cashflow: 90
  },
  {
    id: 's_re_5',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Парковочное место в ЖК',
    description: 'Подземный охраняемый паркинг с постоянным долгосрочным арендатором.',
    cost: 10000,
    downPayment: 2000,
    mortgage: 8000,
    cashflow: 110
  },
  {
    id: 's_re_6',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Кладовое помещение (Стрит-склад)',
    description: 'Помещение цокольного этажа для сезонного хранения вещей жильцов.',
    cost: 6000,
    downPayment: 1000,
    mortgage: 5000,
    cashflow: 75
  },
  {
    id: 's_re_7',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Дачный участок под застройку',
    description: 'Земельный участок с подведенным электричеством в развивающемся пригороде.',
    cost: 15000,
    downPayment: 3000,
    mortgage: 12000,
    cashflow: 0
  },
  {
    id: 's_re_8',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Квартира после пожара',
    description: 'Объект продается вдвое ниже рынка. Нужен быстрый ремонт для сдачи в аренду.',
    cost: 25000,
    downPayment: 4000,
    mortgage: 21000,
    cashflow: 140
  },
  {
    id: 's_re_9',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Комната в коммунальной квартире',
    description: 'Комната в историческом центре города, стабильная сдача командировочным.',
    cost: 18000,
    downPayment: 2500,
    mortgage: 15500,
    cashflow: 120
  },
  {
    id: 's_re_10',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Участок у озера',
    description: 'Перспективная земля у водоема. Высокий потенциал роста цены при смене статуса.',
    cost: 20000,
    downPayment: 4000,
    mortgage: 16000,
    cashflow: 0
  },

  // Малый бизнес и франшизы
  {
    id: 's_bs_1',
    category: 'SMALL',
    type: 'BUSINESS',
    title: 'Кофейный автомат (Вендинг)',
    description: 'Установлен на проходном этаже государственного учреждения.',
    cost: 4000,
    downPayment: 4000,
    cashflow: 160
  },
  {
    id: 's_bs_2',
    category: 'SMALL',
    type: 'BUSINESS',
    title: 'Снековый вендинговый аппарат',
    description: 'Расположен в зоне ожидания крупного автосервиса.',
    cost: 3500,
    downPayment: 3500,
    cashflow: 130
  },
  {
    id: 's_bs_3',
    category: 'SMALL',
    type: 'BUSINESS',
    title: 'Постамат выдачи интернет-заказов',
    description: 'Франшиза автоматического пункта выдачи посылок в супермаркете.',
    cost: 5000,
    downPayment: 5000,
    cashflow: 210
  },
  {
    id: 's_bs_4',
    category: 'SMALL',
    type: 'BUSINESS',
    title: 'Островок экспресс-маникюра',
    description: 'Оборудованное место в торговом центре, персонал укомплектован.',
    cost: 8000,
    downPayment: 4000,
    mortgage: 4000,
    cashflow: 320
  },
  {
    id: 's_bs_5',
    category: 'SMALL',
    type: 'BUSINESS',
    title: 'Паевая доля в веб-студии',
    description: '10% доля в прибыльном агентстве заказной веб-разработки.',
    cost: 6000,
    downPayment: 6000,
    cashflow: 240
  },
  {
    id: 's_bs_6',
    category: 'SMALL',
    type: 'BUSINESS',
    title: 'Киоск мороженого в парке',
    description: 'Сезонная торговая точка с высоким трафиком выходного дня.',
    cost: 4500,
    downPayment: 4500,
    cashflow: 190
  },

  // Акции и ценные бумаги
  {
    id: 's_st_1',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Акции "OK4U" (Фармацевтика)',
    description: 'Крупная фармацевтическая корпорация с регулярными выплатами дивидендов.',
    cost: 10,
    downPayment: 10,
    cashflow: 0,
    symbol: 'OK4U',
    tradingRange: '5$ - 30$'
  },
  {
    id: 's_st_2',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Акции "MYT4U" (IT & Технологии)',
    description: 'Технологический гигант. Высокая динамика роста котировок.',
    cost: 20,
    downPayment: 20,
    cashflow: 0,
    symbol: 'MYT4U',
    tradingRange: '10$ - 40$'
  },
  {
    id: 's_st_3',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Акции "2BIG" (Энергетический холдинг)',
    description: 'Стабильная дивидендная фишка с государственным участием.',
    cost: 30,
    downPayment: 30,
    cashflow: 0,
    symbol: '2BIG',
    tradingRange: '15$ - 50$'
  },
  {
    id: 's_st_4',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Акции "ON2U" (Биотех-стартап)',
    description: 'Рискованный венчурный актив с потенциалом взрывного роста.',
    cost: 5,
    downPayment: 5,
    cashflow: 0,
    symbol: 'ON2U',
    tradingRange: '1$ - 20$'
  },
  {
    id: 's_st_5',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Привилегированные акции "GRO4U"',
    description: 'Фонд недвижимости REIT с гарантированной фиксированной доходностью.',
    cost: 1200,
    downPayment: 1200,
    cashflow: 40,
    symbol: 'GRO4U'
  },
  {
    id: 's_st_6',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Депозитный сертификат банка',
    description: 'Надежный процентный инструмент с защитой капитала.',
    cost: 3000,
    downPayment: 3000,
    cashflow: 60
  },

  // Товары и драгметаллы
  {
    id: 's_cm_1',
    category: 'SMALL',
    type: 'COMMODITY',
    title: 'Золотые инвестиционные монеты (1 унция)',
    description: 'Классический защитный актив от рыночной инфляции.',
    cost: 1500,
    downPayment: 1500,
    cashflow: 0,
    symbol: 'GOLD'
  },
  {
    id: 's_cm_2',
    category: 'SMALL',
    type: 'COMMODITY',
    title: 'Коллекция старинных серебряных монет',
    description: 'Редкий нумизматический лот с аукциона банкротов.',
    cost: 800,
    downPayment: 800,
    cashflow: 0,
    symbol: 'SILVER'
  },
  {
    id: 's_cm_3',
    category: 'SMALL',
    type: 'COMMODITY',
    title: 'Партия антикварных часов',
    description: 'Набор механических швейцарских хронометров в идеальном состоянии.',
    cost: 2200,
    downPayment: 2200,
    cashflow: 0,
    symbol: 'ANTIQUES'
  },
  {
    id: 's_re_11',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: 'Таунхаус под косметический ремонт',
    description: 'Небольшой угловой таунхаус в черте города с прилегающим двориком.',
    cost: 60000,
    downPayment: 6000,
    mortgage: 54000,
    cashflow: 260
  }
];

// ---------------------------------------------------------------------------
// 2. КРУПНЫЕ СДЕЛКИ (30 КАРТОЧЕК)
// ---------------------------------------------------------------------------
export const BIG_DEALS: DealCard[] = [
  // Ваши целевые логистические центры (РЦ)
  {
    id: 'b_rc_1',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Складской комплекс «РЦ Тамбовская»',
    description: 'Крупный распределительный логистический хаб класса «А» с якорными федеральными арендаторами.',
    cost: 380000,
    downPayment: 55000,
    mortgage: 325000,
    cashflow: 3100
  },
  {
    id: 'b_rc_2',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Логистический центр «РЦ Агротерминал»',
    description: 'Специализированный распределительный терминал с температурными камерами и оптовыми складами.',
    cost: 450000,
    downPayment: 65000,
    mortgage: 385000,
    cashflow: 3800
  },
  {
    id: 'b_rc_3',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Грузовой терминал «РЦ Пограничников»',
    description: 'Стратегический перевалочный склад с удобной железнодорожной веткой и площадкой для фур.',
    cost: 520000,
    downPayment: 75000,
    mortgage: 445000,
    cashflow: 4400
  },

  // Жилая доходная недвижимость
  {
    id: 'b_re_1',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: '4-квартирный дом (Дуплекс-плюс)',
    description: 'Все квартиры заселены надежными арендаторами с долгосрочными договорами.',
    cost: 120000,
    downPayment: 16000,
    mortgage: 104000,
    cashflow: 850
  },
  {
    id: 'b_re_2',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: '8-квартирный жилой комплекс',
    description: 'Выгодное расположение возле университета. Постоянная 100% заполняемость.',
    cost: 240000,
    downPayment: 32000,
    mortgage: 208000,
    cashflow: 1750
  },
  {
    id: 'b_re_3',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: '12-квартирный дом у набережной',
    description: 'Престижный район, консьерж-сервис, видовые апартаменты с высоким чеком.',
    cost: 350000,
    downPayment: 50000,
    mortgage: 300000,
    cashflow: 2600
  },
  {
    id: 'b_re_4',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: '24-квартирный жилой дом',
    description: 'Крупный доходный дом с собственной управляющей компанией.',
    cost: 650000,
    downPayment: 90000,
    mortgage: 560000,
    cashflow: 5200
  },
  {
    id: 'b_re_5',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Коттеджный поселок (5 домов)',
    description: 'Закрытый пригородный поселок с централизованной сдачей в долгосрочную аренду.',
    cost: 400000,
    downPayment: 60000,
    mortgage: 340000,
    cashflow: 3000
  },
  {
    id: 'b_re_6',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Бутик-отель на 15 номеров',
    description: 'Готовый гостиничный бизнес в исторической части города.',
    cost: 320000,
    downPayment: 45000,
    mortgage: 275000,
    cashflow: 2400
  },

  // Коммерческая недвижимость
  {
    id: 'b_re_7',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Торговый центр «Районный»',
    description: 'Торговая галерея с якорным продуктовым супермаркетом и аптекой.',
    cost: 580000,
    downPayment: 85000,
    mortgage: 495000,
    cashflow: 4800
  },
  {
    id: 'b_re_8',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Бизнес-центр класса «B+»',
    description: 'Пятиэтажное офисное здание с подземной парковкой и конференц-залами.',
    cost: 720000,
    downPayment: 110000,
    mortgage: 610000,
    cashflow: 6100
  },
  {
    id: 'b_re_9',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Медицинский центр',
    description: 'Специализированное здание с долгосрочным договором сети частных клиник.',
    cost: 420000,
    downPayment: 60000,
    mortgage: 360000,
    cashflow: 3300
  },
  {
    id: 'b_re_10',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Фитнес-комплекс с бассейном',
    description: 'Здание сдано в аренду крупному федеральному спортивному оператору.',
    cost: 490000,
    downPayment: 70000,
    mortgage: 420000,
    cashflow: 3900
  },
  {
    id: 'b_re_11',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Придорожный сервисный комплекс',
    description: 'АЗС, мотель, круглосуточное кафе и стоянка для большегрузов.',
    cost: 360000,
    downPayment: 50000,
    mortgage: 310000,
    cashflow: 2800
  },
  {
    id: 'b_re_12',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Стрит-ритейл на пешеходной улице',
    description: 'Линейка фасадных коммерческих помещений с арендаторами ресторанного сектора.',
    cost: 290000,
    downPayment: 40000,
    mortgage: 250000,
    cashflow: 2200
  },

  // Крупный бизнес и франшизы
  {
    id: 'b_bs_1',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Автоматическая автомойка (Сеть)',
    description: '3 роботизированных моечных бокса без персонала. Земля в долгосрочной аренде.',
    cost: 110000,
    downPayment: 22000,
    mortgage: 88000,
    cashflow: 1300
  },
  {
    id: 'b_bs_2',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Сеть пиццерий (Франшиза 3 точки)',
    description: 'Раскрученный бренд доставки с налаженной цепочкой поставок.',
    cost: 160000,
    downPayment: 30000,
    mortgage: 130000,
    cashflow: 1800
  },
  {
    id: 'b_bs_3',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Сеть аптек (4 филиала)',
    description: 'Устойчивый бизнес первой необходимости с прямыми дистрибьюторскими контрактами.',
    cost: 210000,
    downPayment: 40000,
    mortgage: 170000,
    cashflow: 2100
  },
  {
    id: 'b_bs_4',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Парк спецтехники (Автокраны и экскаваторы)',
    description: '10 единиц строительной техники с договорами подряда на крупных стройках.',
    cost: 280000,
    downPayment: 50000,
    mortgage: 230000,
    cashflow: 2700
  },
  {
    id: 'b_bs_5',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Завод упаковочных материалов',
    description: 'Автоматизированная линия производства гофрокартона и полимерной тары.',
    cost: 500000,
    downPayment: 80000,
    mortgage: 420000,
    cashflow: 4600
  },
  {
    id: 'b_bs_6',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Типография полного цикла',
    description: 'Промышленное печатное оборудование со стабильным пулом корпоративных заказчиков.',
    cost: 190000,
    downPayment: 35000,
    mortgage: 155000,
    cashflow: 1650
  },
  {
    id: 'b_bs_7',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Сеть круглосуточных прачечных',
    description: '6 точек самообслуживания в студенческих городках и спальных районах.',
    cost: 130000,
    downPayment: 25000,
    mortgage: 105000,
    cashflow: 1250
  },
  {
    id: 'b_bs_8',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Частный детский сад и центр развития',
    description: 'Лицензированное учреждение с государственной субсидией и полной группой.',
    cost: 175000,
    downPayment: 32000,
    mortgage: 143000,
    cashflow: 1550
  },
  {
    id: 'b_bs_9',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Крафтовая пивоварня с баром',
    description: 'Собственное варочное производство с дистрибуцией в городские рестораны.',
    cost: 220000,
    downPayment: 42000,
    mortgage: 178000,
    cashflow: 2000
  },
  {
    id: 'b_bs_10',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Автосервис на 8 постов',
    description: 'Кузовной и слесарный цех со стендом сход-развала и клиентской зоной.',
    cost: 260000,
    downPayment: 48000,
    mortgage: 212000,
    cashflow: 2500
  },
  {
    id: 'b_bs_11',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'ИТ-серверный дата-центр',
    description: 'Стойки colocation с резервным дизель-генератором и оптоволоконным каналом.',
    cost: 390000,
    downPayment: 60000,
    mortgage: 330000,
    cashflow: 3400
  },
  {
    id: 'b_bs_12',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Крупная сеть кофеен (5 филиалов)',
    description: 'Узнаваемый городской бренд в формате «кофе с собой» и посадочными залами.',
    cost: 250000,
    downPayment: 45000,
    mortgage: 205000,
    cashflow: 2350
  },
  {
    id: 'b_bs_13',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Швейная фабрика спецодежды',
    description: 'Действующие контракты на поставку униформы для промышленных предприятий.',
    cost: 310000,
    downPayment: 52000,
    mortgage: 258000,
    cashflow: 2850
  },
  {
    id: 'b_re_13',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: 'Пансионат отдыха в сосновом бору',
    description: '3 спальных корпуса и SPA-зона с круглогодичной загрузкой.',
    cost: 440000,
    downPayment: 68000,
    mortgage: 372000,
    cashflow: 3600
  }
];

// ---------------------------------------------------------------------------
// 3. ВСЯКАЯ ВСЯЧИНА / РАСХОДЫ (19 КАРТОЧЕК)
// ---------------------------------------------------------------------------
export const DOODADS: DoodadCard[] = [
  { id: 'd_1', title: 'Капитальный ремонт авто', description: 'Полетела коробка передач и подвеска на вашем авто.', cost: 800 },
  { id: 'd_2', title: 'Новый флагманский смартфон', description: 'Вышел телефон нового поколения — нельзя упустить новинку.', cost: 1200 },
  { id: 'd_3', title: 'Поход в элитный ресторан', description: 'Праздничный ужин в компании друзей и коллег.', cost: 250 },
  { id: 'd_4', title: 'Шопинг выходного дня', description: 'Обновление сезонного брендового гардероба.', cost: 450 },
  { id: 'd_5', title: 'Срочный визит к стоматологу', description: 'Установка импланта и лечение зубов.', cost: 950 },
  { id: 'd_6', title: 'Отпуск в теплых странах', description: 'Билеты на самолет и бронь отеля на неделю.', cost: 1800 },
  { id: 'd_7', title: 'Замена бытовой техники', description: 'Сломался холодильник и стиральная машина.', cost: 1100 },
  { id: 'd_8', title: 'Покупка электросамоката', description: 'Модный городской транспорт для прогулок.', cost: 600 },
  { id: 'd_9', title: 'Подарок на свадьбу близких', description: 'Конверт молодоженам и праздничный костюм.', cost: 350 },
  { id: 'd_10', title: 'Дизайнерские курсы саморазвития', description: 'Оплата модного онлайн-марафона и тренингов.', cost: 500 },
  { id: 'd_11', title: 'Штрафы ГИБДД и эвакуация авто', description: 'Парковка в неположенном месте и штраф за скорость.', cost: 200 },
  { id: 'd_12', title: 'Премиальный абонемент в фитнес', description: 'Годовая карта с бассейном и SPA-комплексом.', cost: 750 },
  { id: 'd_13', title: 'Ветеринарная помощь питомцу', description: 'Внезапная операция и курс лечения любимой собаки.', cost: 400 },
  { id: 'd_14', title: 'Игровая приставка нового поколения', description: 'Консоль, два геймпада и набор топовых игр.', cost: 850 },
  { id: 'd_15', title: 'Косметический ремонт гостиной', description: 'Покупка новых обоев, ламината и заказ услуг мастера.', cost: 1300 },
  { id: 'd_16', title: 'Кофе на вынос и доставка еды', description: 'Накопившиеся мелкие чеки за регулярные доставки за месяц.', cost: 300 },
  { id: 'd_17', title: 'Штраф от налоговой инспекции', description: 'Пени за несвоевременную сдачу декларации.', cost: 150 },
  { id: 'd_18', title: 'Юбилей в караоке-клубе', description: 'Празднование дня рождения с размахом.', cost: 650 },
  { id: 'd_19', title: 'Утеря ключей и взлом замка', description: 'Вызов аварийной службы и замена входного замка.', cost: 180 }
];

// ---------------------------------------------------------------------------
// 4. РЫНОК (25 КАРТОЧЕК — СОПРЯЖЕНЫ СО ВСЕМИ СДЕЛКАМИ)
// ---------------------------------------------------------------------------
export const MARKET_CARDS: MarketCard[] = [
  // Рынок для ваших складов (РЦ)
 {
    id: 'm_rc_1',
    title: 'Федеральный маркетплейс скупает РЦ',
    description: 'Крупный онлайн-гигант готов выкупить «РЦ Тамбовская» по щедрой оценке 600 000 $!',
    targetType: 'REAL_ESTATE',
    offerPrice: 600000
  },
  {
    id: 'm_rc_2',
    title: 'Агрохолдинг расширяет логистику',
    description: 'Сельхоз-корпорация выкупает терминал «РЦ Агротерминал» за 720 000 $ наличными.',
    targetType: 'REAL_ESTATE',
    offerPrice: 720000
  },
  {
    id: 'm_rc_3',
    title: 'Транспортная монополия ищет узловой терминал',
    description: 'Предложение о выкупе «РЦ Пограничников» за рекордные 850 000 $!',
    targetType: 'REAL_ESTATE',
    offerPrice: 850000
  },

  // Рынок для легковых автомобилей
  {
    id: 'm_veh_1',
    title: 'Спрос на авто в таксопарках',
    description: 'Крупный таксопарк готов выкупить легковые авто за 20 000 $ каждое!',
    targetType: 'VEHICLE',
    offerPrice: 20000
  },
  {
    id: 'm_veh_2',
    title: 'Дефицит легковых машин на вторичном рынке',
    description: 'Частные покупатели скупают любые легковые авто и хэтчбеки за 23 000 $!',
    targetType: 'VEHICLE',
    offerPrice: 23000
  },

  // Рынок жилой недвижимости (Малые и Крупные сделки)
  {
    id: 'm_re_1',
    title: 'Покупатель на 1-2 комнатные квартиры',
    description: 'Инвестиционный фонд скупает малогабаритные квартиры по цене 75 000 $ за объект.',
    targetType: 'REAL_ESTATE',
    offerPrice: 75000
  },
  {
    id: 'm_re_2',
    title: 'Девелопер выкупает 4-квартирные дома',
    description: 'Готовы выкупить 4-квартирные дома и дуплексы по щедрой цене 200 000 $ за объект.',
    targetType: 'REAL_ESTATE',
    offerPrice: 200000
  },
  {
    id: 'm_re_3',
    title: 'Инвестор скупает 8-квартирные комплексы',
    description: 'Инвестиционная группа выкупает 8-квартирные дома по цене 380 000 $ за комплекс.',
    targetType: 'REAL_ESTATE',
    offerPrice: 380000
  },
  {
    id: 'm_re_4',
    title: 'Институциональный фонд скупает 12-24 кв. дома',
    description: 'Готовы выкупить крупные многоквартирные дома (12 и 24 кв.) по 950 000 $!',
    targetType: 'REAL_ESTATE',
    offerPrice: 950000
  },
  {
    id: 'm_re_5',
    title: 'Бум на рынке земельных участков',
    description: 'Застройщики выкупают пригородные дачные участки и землю у озера за 45 000 $!',
    targetType: 'REAL_ESTATE',
    offerPrice: 45000
  },
  {
    id: 'm_re_6',
    title: 'Спрос на гаражи и паркинги',
    description: 'Автолюбители в жилых массивах скупают гаражные боксы и парковочные места за 18 000 $.',
    targetType: 'REAL_ESTATE',
    offerPrice: 18000
  },

  // Рынок коммерческой недвижимости и гостиниц
  {
    id: 'm_re_7',
    title: 'Инвестиционный траст выкупает Торговые Центры',
    description: 'Крупный фонд готов забрать ТЦ за 850 000 $ наличными.',
    targetType: 'REAL_ESTATE',
    offerPrice: 850000
  },
  {
    id: 'm_re_8',
    title: 'Корпорация скупает Бизнес-Центры',
    description: 'Предложение о выкупе офисного БЦ за 1 100 000 $!',
    targetType: 'REAL_ESTATE',
    offerPrice: 1100000
  },
  {
    id: 'm_re_9',
    title: 'Федеральная сеть отелей выкупает пансионаты',
    description: 'Готовы выкупить Бутик-отель или Пансионат за 600 000 $!',
    targetType: 'REAL_ESTATE',
    offerPrice: 600000
  },

  // Рынок готового бизнеса
  {
    id: 'm_bs_1',
    title: 'Покупатель на сети автомоек и автосервисов',
    description: 'Автомобильный холдинг выкупает любые автомойки и автосервисы за 200 000 $ за точку.',
    targetType: 'BUSINESS',
    offerPrice: 200000
  },
  {
    id: 'm_bs_2',
    title: 'Ресторанный конгломерат скупает пиццерии и кофейни',
    description: 'Готовы выкупить сети пиццерий или кофеен за 380 000 $!',
    targetType: 'BUSINESS',
    offerPrice: 380000
  },
  {
    id: 'm_bs_3',
    title: 'Фармацевтический холдинг скупает аптеки',
    description: 'Выкуп сети аптек с лицензиями за 350 000 $.',
    targetType: 'BUSINESS',
    offerPrice: 350000
  },
  {
    id: 'm_bs_4',
    title: 'Оператор вендинга скупает кофейные и снековые автоматы',
    description: 'Готовы выкупить любые вендинговые аппараты и постаматы по 8 000 $ за шт.',
    targetType: 'BUSINESS',
    offerPrice: 8000
  },

  // Фондовый рынок (Акции)
  {
    id: 'm_st_1',
    title: 'Взлет акций фарм-сектора "OK4U"',
    description: 'Компания выпустила революционный препарат. Акции взлетели до 40 $!',
    targetType: 'STOCK',
    symbol: 'OK4U',
    offerPrice: 40
  },
  {
    id: 'm_st_2',
    title: 'Бум IT-технологий "MYT4U"',
    description: 'Квартальный отчет превзошел ожидания. Акции торгуются по 50 $!',
    targetType: 'STOCK',
    symbol: 'MYT4U',
    offerPrice: 50
  },
  {
    id: 'm_st_3',
    title: 'Энергетический кризис взвинтил акции "2BIG"',
    description: 'Цены на энергоносители бьют рекорды. Акции продаются по 60 $!',
    targetType: 'STOCK',
    symbol: '2BIG',
    offerPrice: 60
  },
  {
    id: 'm_st_4',
    title: 'Сенсация биотеха: прорыв "ON2U"',
    description: 'Стартап получил международный патент. Акции выросли до 30 $ за штуку!',
    targetType: 'STOCK',
    symbol: 'ON2U',
    offerPrice: 30
  },

  // Сплиты акций
  {
    id: 'm_split_1',
    title: 'Дробление акций "OK4U" (Сплит 2 к 1)',
    description: 'Совет директоров утвердил дробление: количество всех ваших акций OK4U удваивается бесплатно!',
    targetType: 'SPLIT',
    symbol: 'OK4U',
    splitRatio: 2
  },
  {
    id: 'm_split_2',
    title: 'Дробление акций "MYT4U" (Сплит 2 к 1)',
    description: 'Высокий спрос на IT-акции привел к сплиту 2 к 1: количество акций MYT4U удваивается!',
    targetType: 'SPLIT',
    symbol: 'MYT4U',
    splitRatio: 2
  },

  // Драгметаллы и товары
  {
    id: 'm_cm_1',
    title: 'Взлет цен на физическое золото и серебро',
    description: 'Мировой спрос поднял цену: выкуп монет GOLD по 4 000 $, SILVER — по 2 000 $, Антиквариата — по 5 000 $!',
    targetType: 'COMMODITY',
    offerPrice: 4000
  }
];