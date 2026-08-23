import { Tile } from '../types/game.types';

export interface BoardTile extends Tile {
  icon: string;
  badgeColor: string;
  borderColor: string;
}

export const BOARD_TILES: BoardTile[] = [
  { id: 0, title: 'День получки', type: 'PAYDAY', icon: '💰', badgeColor: 'bg-emerald-500/20 text-emerald-300', borderColor: 'border-emerald-500/40' },
  { id: 1, title: 'Возможность', type: 'DEAL', icon: '💼', badgeColor: 'bg-blue-500/20 text-blue-300', borderColor: 'border-blue-500/40' },
  { id: 2, title: 'Всякая всячина', type: 'DOODAD', icon: '💸', badgeColor: 'bg-rose-500/20 text-rose-300', borderColor: 'border-rose-500/40' },
  { id: 3, title: 'Возможность', type: 'DEAL', icon: '💼', badgeColor: 'bg-blue-500/20 text-blue-300', borderColor: 'border-blue-500/40' },
  { id: 4, title: 'Благотворительность', type: 'CHARITY', icon: '🤝', badgeColor: 'bg-teal-500/20 text-teal-300', borderColor: 'border-teal-500/40' },
  { id: 5, title: 'Возможность', type: 'DEAL', icon: '💼', badgeColor: 'bg-blue-500/20 text-blue-300', borderColor: 'border-blue-500/40' },
  { id: 6, title: 'День получки', type: 'PAYDAY', icon: '💰', badgeColor: 'bg-emerald-500/20 text-emerald-300', borderColor: 'border-emerald-500/40' },
  { id: 7, title: 'Возможность', type: 'DEAL', icon: '💼', badgeColor: 'bg-blue-500/20 text-blue-300', borderColor: 'border-blue-500/40' },
  { id: 8, title: 'Рынок', type: 'MARKET', icon: '📈', badgeColor: 'bg-amber-500/20 text-amber-300', borderColor: 'border-amber-500/40' },
  { id: 9, title: 'Возможность', type: 'DEAL', icon: '💼', badgeColor: 'bg-blue-500/20 text-blue-300', borderColor: 'border-blue-500/40' },
  { id: 10, title: 'Ребенок', type: 'BABY', icon: '👶', badgeColor: 'bg-pink-500/20 text-pink-300', borderColor: 'border-pink-500/40' },
  { id: 11, title: 'Возможность', type: 'DEAL', icon: '💼', badgeColor: 'bg-blue-500/20 text-blue-300', borderColor: 'border-blue-500/40' },
  { id: 12, title: 'День получки', type: 'PAYDAY', icon: '💰', badgeColor: 'bg-emerald-500/20 text-emerald-300', borderColor: 'border-emerald-500/40' },
  { id: 13, title: 'Возможность', type: 'DEAL', icon: '💼', badgeColor: 'bg-blue-500/20 text-blue-300', borderColor: 'border-blue-500/40' },
  { id: 14, title: 'Всякая всячина', type: 'DOODAD', icon: '💸', badgeColor: 'bg-rose-500/20 text-rose-300', borderColor: 'border-rose-500/40' },
  { id: 15, title: 'Возможность', type: 'DEAL', icon: '💼', badgeColor: 'bg-blue-500/20 text-blue-300', borderColor: 'border-blue-500/40' },
  { id: 16, title: 'Рынок', type: 'MARKET', icon: '📈', badgeColor: 'bg-amber-500/20 text-amber-300', borderColor: 'border-amber-500/40' },
  { id: 17, title: 'Возможность', type: 'DEAL', icon: '💼', badgeColor: 'bg-blue-500/20 text-blue-300', borderColor: 'border-blue-500/40' },
  { id: 18, title: 'День получки', type: 'PAYDAY', icon: '💰', badgeColor: 'bg-emerald-500/20 text-emerald-300', borderColor: 'border-emerald-500/40' },
  { id: 19, title: 'Возможность', type: 'DEAL', icon: '💼', badgeColor: 'bg-blue-500/20 text-blue-300', borderColor: 'border-blue-500/40' },
  { id: 20, title: 'Всякая всячина', type: 'DOODAD', icon: '💸', badgeColor: 'bg-rose-500/20 text-rose-300', borderColor: 'border-rose-500/40' },
  { id: 21, title: 'Возможность', type: 'DEAL', icon: '💼', badgeColor: 'bg-blue-500/20 text-blue-300', borderColor: 'border-blue-500/40' },
  { id: 22, title: 'Увольнение', type: 'DOWNTURN', icon: '🛑', badgeColor: 'bg-purple-500/20 text-purple-300', borderColor: 'border-purple-500/40' },
  { id: 23, title: 'Возможность', type: 'DEAL', icon: '💼', badgeColor: 'bg-blue-500/20 text-blue-300', borderColor: 'border-blue-500/40' }
];