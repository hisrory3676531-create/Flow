import type { FC } from 'react';
import type { FastTrackTile } from '../data/fastTrack.data';

interface FastTrackDealModalProps {
  tile: FastTrackTile;
  playerCash: number;
  onBuy: (tile: FastTrackTile) => void;
  onPass: () => void;
}

export const FastTrackDealModal: FC<FastTrackDealModalProps> = ({
  tile,
  playerCash,
  onBuy,
  onPass
}) => {
  const canAfford = playerCash >= (tile.cost || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#180929] border border-cyan-500/50 rounded-3xl p-5 max-w-sm w-full shadow-2xl text-slate-100">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-2xl">
            {tile.icon}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
              Крупная инвестиция
            </span>
            <h3 className="text-base font-black text-white">{tile.title}</h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 mb-4 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          {tile.description}
        </p>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 mb-4 space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Стоимость покупки:</span>
            <span className="font-mono font-bold text-amber-300">
              ${tile.cost?.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Денежный поток:</span>
            <span className="font-mono font-bold text-emerald-400">
              +${tile.cashflow?.toLocaleString()}/ход
            </span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onPass}
            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Пропустить
          </button>
          <button
            disabled={!canAfford}
            onClick={() => onBuy(tile)}
            className={`flex-1 py-2.5 font-black text-xs rounded-xl transition cursor-pointer ${
              canAfford
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {canAfford ? 'Купить бизнес' : 'Не хватает $'}
          </button>
        </div>
      </div>
    </div>
  );
};