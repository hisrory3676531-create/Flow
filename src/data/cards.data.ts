export interface DealCard {
  id: string;
  category: 'SMALL' | 'BIG';
  type: 'REAL_ESTATE' | 'STOCK' | 'BUSINESS';
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
  targetType: 'REAL_ESTATE' | 'STOCK' | 'SPLIT';
  offerPrice?: number;
  symbol?: string;
  splitRatio?: number; // 2 = удвоение количества акций
}

export const SMALL_DEALS: DealCard[] = [
  {
    id: 's_re_1',
    category: 'SMALL',
    type: 'REAL_ESTATE',
    title: '1-комнатная квартира (Кондо)',
    description: 'Владелец срочно уезжает из страны. Квартира полностью меблирована и готова к сдаче.',
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
    description: 'Банковский залоговый объект с дисконтом. Требуется минимальный косметический ремонт.',
    cost: 55000,
    downPayment: 5000,
    mortgage: 50000,
    cashflow: 220
  },
  {
    id: 's_st_1',
    category: 'SMALL',
    type: 'STOCK',
    title: 'Акции "OK4U" (Фармацевтика)',
    description: 'Акции стабильной фармацевтической компании. Платят ежеквартальные дивиденды.',
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
    title: 'Акции "MYT4U" (Технологии)',
    description: 'Быстрорастущий IT-сектор. Высокая волатильность.',
    cost: 20,
    downPayment: 20,
    cashflow: 0,
    symbol: 'MYT4U',
    tradingRange: '10$ - 40$'
  }
];

export const BIG_DEALS: DealCard[] = [
  {
    id: 'b_re_1',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: '4-квартирный дом (Дуплекс-плюс)',
    description: 'Все квартиры заселены надежными арендаторами с долгосрочными договорами.',
    cost: 120000,
    downPayment: 16000,
    mortgage: 104000,
    cashflow: 800
  },
  {
    id: 'b_re_2',
    category: 'BIG',
    type: 'REAL_ESTATE',
    title: '8-квартирный жилой комплекс',
    description: 'Выгодное расположение возле университета. Высокий арендный спрос.',
    cost: 240000,
    downPayment: 32000,
    mortgage: 208000,
    cashflow: 1700
  },
  {
    id: 'b_bs_1',
    category: 'BIG',
    type: 'BUSINESS',
    title: 'Автоматическая автомойка',
    description: 'Полностью автономный бизнес без персонала. Земля в долгосрочной аренде.',
    cost: 100000,
    downPayment: 20000,
    mortgage: 80000,
    cashflow: 1200
  }
];

export const DOODADS: DoodadCard[] = [
  { id: 'd_1', title: 'Капитальный ремонт авто', description: 'Полетела коробка передач на вашем авто.', cost: 800 },
  { id: 'd_2', title: 'Новый флагманский смартфон', description: 'Вышел телефон нового поколения — нельзя упустить новинку.', cost: 1200 },
  { id: 'd_3', title: 'Поход в элитный ресторан', description: 'Ужин с друзьями в честь праздника.', cost: 250 },
  { id: 'd_4', title: 'Шопинг выходного дня', description: 'Покупка новой брендовой одежды и аксессуаров.', cost: 450 }
];

export const MARKET_CARDS: MarketCard[] = [
  {
    id: 'm_re_1',
    title: 'Покупатель на 1-2 комнатные квартиры',
    description: 'Инвестиционный фонд скупает малогабаритные квартиры по завышенной цене!',
    targetType: 'REAL_ESTATE',
    offerPrice: 65000
  },
  {
    id: 'm_re_2',
    title: 'Крупный девелопер ищет доходные дома',
    description: 'Готовы выкупить многоквартирный дом (4-квартирный или дуплекс) по щедрой оценке.',
    targetType: 'REAL_ESTATE',
    offerPrice: 180000
  },
  {
    id: 'm_st_1',
    title: 'Взлет акций фарм-сектора "OK4U"',
    description: 'Компания выпустила революционный препарат. Акции торгуются по пиковой цене!',
    targetType: 'STOCK',
    symbol: 'OK4U',
    offerPrice: 40
  },
  {
    id: 'm_st_2',
    title: 'Бум IT-технологий "MYT4U"',
    description: 'Отчетность превзошла ожидания аналитиков. Акции на историческом максимуме.',
    targetType: 'STOCK',
    symbol: 'MYT4U',
    offerPrice: 50
  },
  {
    id: 'm_split_1',
    title: 'Дробление акций "OK4U" (Сплит 2 к 1)',
    description: 'Совет директоров утвердил дробление. Количество всех ваших акций OK4U удваивается бесплатно!',
    targetType: 'SPLIT',
    symbol: 'OK4U',
    splitRatio: 2
  },
  {
    id: 'm_split_2',
    title: 'Дробление акций "MYT4U" (Сплит 2 к 1)',
    description: 'Высокий спрос на IT-акции привел к сплиту 2 к 1. Количество акций MYT4U в портфеле удваивается!',
    targetType: 'SPLIT',
    symbol: 'MYT4U',
    splitRatio: 2
  }
];