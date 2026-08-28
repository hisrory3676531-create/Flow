export type FastTrackTileType =
  | 'PAYDAY'
  | 'BUSINESS'
  | 'DREAM'
  | 'TAX_AUDIT'
  | 'LAWSUIT'
  | 'DIVORCE'
  | 'DONATION';

export interface FastTrackTile {
  id: number;
  title: string;
  type: FastTrackTileType;
  icon: string;
  color: string;
  description: string;
  cost?: number;
  cashflow?: number;
  downPayment?: number;
  dreamId?: string;
}

export const FAST_TRACK_TILES: FastTrackTile[] = [
  // 0 - 4
  {
    id: 0,
    title: 'День инвестора',
    type: 'PAYDAY',
    icon: '💰',
    color: '#10b981',
    description: 'Получите ваш увеличенный денежный поток Скоростной дорожки!'
  },
  {
    id: 1,
    title: 'Сеть автозаправок',
    type: 'BUSINESS',
    icon: '⛽',
    color: '#0284c7',
    description: 'Покупка сети АЗС на федеральной трассе.',
    cost: 120000,
    downPayment: 120000,
    cashflow: 12000
  },
  {
    id: 2,
    title: 'Остров на Багамах',
    type: 'DREAM',
    icon: '🏝️',
    color: '#f59e0b',
    dreamId: 'dream_island',
    description: 'Сектор Мечты: Собственный тропический рай для семьи и отдыха.',
    cost: 1500000
  },
  {
    id: 3,
    title: 'Сеть кофеен (Франшиза)',
    type: 'BUSINESS',
    icon: '☕',
    color: '#0284c7',
    description: '12 кофеен самообслуживания в бизнес-центрах.',
    cost: 80000,
    downPayment: 80000,
    cashflow: 8500
  },
  {
    id: 4,
    title: 'Налоговый аудит',
    type: 'TAX_AUDIT',
    icon: '⚖️',
    color: '#ef4444',
    description: 'Внеплановая проверка. Выплата 50% от текущих наличных средств!'
  },

  // 5 - 9
  {
    id: 5,
    title: 'Торговый Комплекс',
    type: 'BUSINESS',
    icon: '🏬',
    color: '#0284c7',
    description: 'Инвестиция в 3-этажный торгово-развлекательный молл.',
    cost: 200000,
    downPayment: 200000,
    cashflow: 22000
  },
  {
    id: 6,
    title: 'Личный бизнес-джет',
    type: 'DREAM',
    icon: '✈️',
    color: '#f59e0b',
    dreamId: 'dream_jet',
    description: 'Сектор Мечты: Свобода путешествий по всему миру без пересадок.',
    cost: 2100000
  },
  {
    id: 7,
    title: 'День инвестора',
    type: 'PAYDAY',
    icon: '💰',
    color: '#10b981',
    description: 'Получите ваш увеличенный денежный поток Скоростной дорожки!'
  },
  {
    id: 8,
    title: 'Отель в Альпах',
    type: 'BUSINESS',
    icon: '🏔️',
    color: '#0284c7',
    description: 'Горнолыжный курортный комплекс на 45 номеров.',
    cost: 160000,
    downPayment: 160000,
    cashflow: 16000
  },
  {
    id: 9,
    title: 'Судебный иск инвесторов',
    type: 'LAWSUIT',
    icon: '🏛️',
    color: '#f43f5e',
    description: 'Юридические расходы и компенсация ущерба: штраф 50 000 $.'
  },

  // 10 - 14
  {
    id: 10,
    title: 'Фармацевтический завод',
    type: 'BUSINESS',
    icon: '🏭',
    color: '#0284c7',
    description: 'Контрактное производство дженериков.',
    cost: 180000,
    downPayment: 180000,
    cashflow: 19000
  },
  {
    id: 11,
    title: 'Океанская супер-яхта',
    type: 'DREAM',
    icon: '🛥️',
    color: '#f59e0b',
    dreamId: 'dream_yacht',
    description: 'Сектор Мечты: Кругосветные круизы по лазурным побережьям.',
    cost: 1900000
  },
  {
    id: 12,
    title: 'Сеть фитнес-клубов',
    type: 'BUSINESS',
    icon: '🏋️',
    color: '#0284c7',
    description: 'Премиальная сеть спортзалов с бассейнами.',
    cost: 130000,
    downPayment: 130000,
    cashflow: 13500
  },
  {
    id: 13,
    title: 'Благотворительный фонд Fast Track',
    type: 'DONATION',
    icon: '🤝',
    color: '#8b5cf6',
    description: 'Пожертвование 50 000 $ дает право бросать 3 кубика на Fast Track!'
  },
  {
    id: 14,
    title: 'ИТ-Корпорация SaaS',
    type: 'BUSINESS',
    icon: '💻',
    color: '#0284c7',
    description: 'Облачная B2B-платформа с глобальной подпиской.',
    cost: 220000,
    downPayment: 220000,
    cashflow: 25000
  },

  // 15 - 19
  {
    id: 15,
    title: 'День инвестора',
    type: 'PAYDAY',
    icon: '💰',
    color: '#10b981',
    description: 'Получите ваш увеличенный денежный поток Скоростной дорожки!'
  },
  {
    id: 16,
    title: 'Исторический замок',
    type: 'DREAM',
    icon: '🏰',
    color: '#f59e0b',
    dreamId: 'dream_castle',
    description: 'Сектор Мечты: Семейная резиденция в предгорьях Альп.',
    cost: 2000000
  },
  {
    id: 17,
    title: 'Логистический парк',
    type: 'BUSINESS',
    icon: '🚛',
    color: '#0284c7',
    description: 'Складской терминал класса А возле международного порта.',
    cost: 140000,
    downPayment: 140000,
    cashflow: 14500
  },
  {
    id: 18,
    title: 'Развод',
    type: 'DIVORCE',
    icon: '💔',
    color: '#dc2626',
    description: 'Раздел имущества! Вы теряете все свободные наличные средства.'
  },
  {
    id: 19,
    title: 'Сеть автосалонов',
    type: 'BUSINESS',
    icon: '🏎️',
    color: '#0284c7',
    description: 'Официальный дилер электрокаров и спорткаров.',
    cost: 210000,
    downPayment: 210000,
    cashflow: 24000
  },

  // 20 - 24
  {
    id: 20,
    title: 'Благотворительный фонд',
    type: 'DREAM',
    icon: '🏛️',
    color: '#f59e0b',
    dreamId: 'dream_charity',
    description: 'Сектор Мечты: Финансирование школ и медицинских программ.',
    cost: 1500000
  },
  {
    id: 21,
    title: 'Сеть ресторанов Мишлен',
    type: 'BUSINESS',
    icon: '🍽️',
    color: '#0284c7',
    description: '5 ресторанов авторской кухни в столице.',
    cost: 170000,
    downPayment: 170000,
    cashflow: 18000
  },
  {
    id: 22,
    title: 'День инвестора',
    type: 'PAYDAY',
    icon: '💰',
    color: '#10b981',
    description: 'Получите ваш увеличенный денежный поток Скоростной дорожки!'
  },
  {
    id: 23,
    title: 'Налоговый аудит',
    type: 'TAX_AUDIT',
    icon: '⚖️',
    color: '#ef4444',
    description: 'Внеплановая проверка. Выплата 50% от текущих наличных средств!'
  },
  {
    id: 24,
    title: 'Вилла и сафари-парк',
    type: 'DREAM',
    icon: '🦁',
    color: '#f59e0b',
    dreamId: 'dream_safari',
    description: 'Сектор Мечты: Заповедник дикой природы в Африке.',
    cost: 1800000
  },

  // 25 - 29
  {
    id: 25,
    title: 'Солнечная электростанция',
    type: 'BUSINESS',
    icon: '☀️',
    color: '#0284c7',
    description: 'Зеленая энергетика с долгосрочным государственным тарифом.',
    cost: 190000,
    downPayment: 190000,
    cashflow: 20500
  },
  {
    id: 26,
    title: 'Сеть частных клиник',
    type: 'BUSINESS',
    icon: '🏥',
    color: '#0284c7',
    description: 'Многопрофильные диагностические медицинские центры.',
    cost: 230000,
    downPayment: 230000,
    cashflow: 26000
  },
  {
    id: 27,
    title: 'День инвестора',
    type: 'PAYDAY',
    icon: '💰',
    color: '#10b981',
    description: 'Получите ваш увеличенный денежный поток Скоростной дорожки!'
  },
  {
    id: 28,
    title: 'Киностудия и медиахолдинг',
    type: 'BUSINESS',
    icon: '🎬',
    color: '#0284c7',
    description: 'Производство стримингового контента и CGI графики.',
    cost: 250000,
    downPayment: 250000,
    cashflow: 28000
  },
  {
    id: 29,
    title: 'Венчурный фонд AI',
    type: 'BUSINESS',
    icon: '🤖',
    color: '#0284c7',
    description: 'Инвестиции в портфель быстрорастущих стартапов искусственного интеллекта.',
    cost: 280000,
    downPayment: 280000,
    cashflow: 32000
  },

  // 30 - 33 (Новые 4 карточки для сетки из 34 ячеек)
  {
    id: 30,
    title: 'Космический туризм',
    type: 'DREAM',
    icon: '🚀',
    color: '#f59e0b',
    dreamId: 'dream_space',
    description: 'Сектор Мечты: Полет на околоземную орбиту и космическая станция.',
    cost: 2500000
  },
  {
    id: 31,
    title: 'Сеть дата-центров',
    type: 'BUSINESS',
    icon: '🗄️',
    color: '#0284c7',
    description: 'Инфраструктура облачных вычислений и серверов для ИИ.',
    cost: 260000,
    downPayment: 260000,
    cashflow: 30000
  },
  {
    id: 32,
    title: 'Коллекция суперкаров',
    type: 'DREAM',
    icon: '🏎️',
    color: '#f59e0b',
    dreamId: 'dream_cars',
    description: 'Сектор Мечты: Гараж из 10 легендарных раритетных гиперкаров.',
    cost: 1600000
  },
  {
    id: 33,
    title: 'Судебный иск партнеров',
    type: 'LAWSUIT',
    icon: '🏛️',
    color: '#f43f5e',
    description: 'Корпоративный спор по акциям: выплата компенсации 60 000 $.'
  }
];