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
  type: 'REAL_ESTATE' | 'STOCK' | 'BUSINESS';
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