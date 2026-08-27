export interface Dream {
  id: string;
  title: string;
  cost: number;
  icon: string;
  description: string;
}

export const DREAMS_LIST: Dream[] = [
  { id: 'dream_island', title: 'Остров на Багамах', cost: 1500000, icon: '🏝️', description: 'Собственный тропический рай для семьи и отдыха' },
  { id: 'dream_jet', title: 'Личный бизнес-джет', cost: 2100000, icon: '✈️', description: 'Свобода путешествий по всему миру без пересадок' },
  { id: 'dream_yacht', title: 'Океанская супер-яхта', cost: 1900000, icon: '🛥️', description: 'Кругосветные круизы по лазурным побережьям' },
  { id: 'dream_castle', title: 'Исторический замок', cost: 2000000, icon: '🏰', description: 'Семейная резиденция в предгорьях Альп' },
  { id: 'dream_charity', title: 'Благотворительный фонд', cost: 1500000, icon: '🏛️', description: 'Финансирование школ и медицинских программ' },
  { id: 'dream_safari', title: 'Вилла и сафари-парк', cost: 1800000, icon: '🦁', description: 'Заповедник дикой природы в Африке' }
];

export interface Profession {
  id: string;
  title: string;
  salary: number;
  savings: number;
  taxes: number;
  homeMortgagePayment: number;
  carLoanPayment: number;
  creditCardPayment: number;
  otherExpenses: number;
  childExpensePerCount: number;
  homeDebt: number;
  carDebt: number;
  creditCardDebt: number;
}

export interface PlayerFinancials {
  salary: number;
  passiveIncome: number;
  totalIncome: number;
  taxes: number;
  homeMortgagePayment: number;
  carLoanPayment: number;
  creditCardPayment: number;
  otherExpenses: number;
  childExpensePerCount: number;
  childCount: number;
  bankLoanPayment: number;
  totalExpenses: number;
  monthlyCashflow: number;
}

export interface Asset {
  id: string;
  title: string;
  type: 'REAL_ESTATE' | 'STOCK' | 'BUSINESS' | 'VEHICLE' | 'COMMODITY' | 'FAST_TRACK_BIZ';
  cost: number;
  cashflow: number;
  downPayment: number;
  sharesCount?: number;
  mortgage?: number;
}

export interface Player {
  id: string;
  userId: string;
  name: string;
  profession: Profession;
  currentTrack: 'RAT_RACE' | 'FAST_TRACK';
  boardPosition: number;
  cash: number;
  bankDebt: number;
  financials: PlayerFinancials;
  assets: Asset[];
  isBankrupt: boolean;
  skippedTurns: number;
  dream?: Dream;
  
  // Поля состояния Скоростной дорожки (Fast Track)
  fastTrackPosition?: number;
  fastTrackCashflow?: number;
  fastTrackInitialCashflow?: number;
}

export interface Tile {
  id: number;
  title: string;
  type: 'PAYDAY' | 'DEAL' | 'DOODAD' | 'MARKET' | 'CHARITY' | 'DOWNTURN' | 'BABY';
}

export interface GameSettings {
  roomId: string;
  maxPlayers: number;
  autoPayday: boolean; // true = авто, false = ручной клик
}