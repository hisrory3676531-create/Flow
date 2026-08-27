import type { FC } from 'react';
import type { FastTrackTile } from '../data/fastTrack.data';

interface FastTrackEventModalProps {
  tile: FastTrackTile;
  playerCash: number;
  isMyDream?: boolean;
  onConfirm: () => void;
  onBuyDream?: () => void;
}

export const FastTrackEventModal: FC<FastTrackEventModalProps> = ({
  tile,
  playerCash,
  isMyDream = false,
  onConfirm,
  onBuyDream
}) => {
  const isTax = tile.type === 'TAX_AUDIT';
  const isLawsuit = tile.type === 'LAWSUIT';
  const isDonation = tile.type === 'DONATION';
  const isDream = tile.type === 'DREAM';

  const taxAmount = Math.round(playerCash * 0.2);
  const lawsuitCost = 50000;
  const donationCost = 50000;
  const dreamCost = tile.cost || 0;
  const canAffordDream = playerCash >= dreamCost;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-[#1b0630] border-2 border-amber-400/90 rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl space-y-4 text-center text-slate-100 relative overflow-hidden">
        
        {/* Иконка и тип события */}
        <div className="text-5xl my-1 animate-bounce">{tile.icon || '🌟'}</div>
        
        <div>
          <span className="text-[10px] font-mono uppercase font-black text-amber-400 tracking-wider block">
            СКОРОСТНАЯ ДОРОЖКА (FAST TRACK)
          </span>
          <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">{tile.title}</h3>
        </div>

        {/* Описание и расчет финансовых параметров */}
        <div className="bg-slate-950/80 border border-purple-900/60 p-3.5 rounded-2xl text-xs space-y-2.5 text-left">
          {isTax && (
            <>
              <p className="text-slate-300 leading-relaxed">
                Налоговая служба проводит аудит бизнеса. Штраф составляет <b className="text-amber-300">20%</b> от ваших наличных.
              </p>
              <div className="flex justify-between items-center border-t border-slate-800 pt-2 font-mono">
                <span className="text-slate-400">Сумма налога:</span>
                <span className="text-rose-400 font-black text-sm">-${taxAmount.toLocaleString()}</span>
              </div>
            </>
          )}

          {isLawsuit && (
            <>
              <p className="text-slate-300 leading-relaxed">
                Конкуренты подали судебный иск против вашей корпорации. Оплата издержек и компенсаций.
              </p>
              <div className="flex justify-between items-center border-t border-slate-800 pt-2 font-mono">
                <span className="text-slate-400">Сумма иска:</span>
                <span className="text-rose-400 font-black text-sm">-${lawsuitCost.toLocaleString()}</span>
              </div>
            </>
          )}

          {isDonation && (
            <>
              <p className="text-slate-300 leading-relaxed">
                Пожертвование $50,000 в благотворительный фонд даёт право бросать <b className="text-emerald-400">3 кубика</b> следующие 3 хода.
              </p>
              <div className="flex justify-between items-center border-t border-slate-800 pt-2 font-mono">
                <span className="text-slate-400">Взнос:</span>
                <span className="text-amber-300 font-black text-sm">${donationCost.toLocaleString()}</span>
              </div>
            </>
          )}

          {isDream && (
            <>
              <p className="text-slate-300 leading-relaxed">
                {isMyDream
                  ? '🌟 Это ВАША МЕЧТА! Купите её прямо сейчас для мгновенной абсолютной победы в игре!'
                  : 'Это сектор мечты другого игрока. Вы можете полюбоваться ею и продолжить путь.'}
              </p>
              <div className="flex justify-between items-center border-t border-slate-800 pt-2 font-mono">
                <span className="text-slate-400">Стоимость мечты:</span>
                <span className="text-emerald-400 font-black text-sm">${dreamCost.toLocaleString()}</span>
              </div>
              {isMyDream && !canAffordDream && (
                <div className="text-[10px] text-rose-400 font-mono font-bold">
                  Не хватает: ${(dreamCost - playerCash).toLocaleString()}
                </div>
              )}
            </>
          )}
        </div>

        {/* Кнопки действий */}
        <div className="space-y-2 pt-1">
          {isDream && isMyDream && onBuyDream && (
            <button
              onClick={onBuyDream}
              disabled={!canAffordDream}
              className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-black text-xs rounded-xl shadow-lg transition transform active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              {canAffordDream ? '🏆 ВЫКУПИТЬ МЕЧТУ И ПОБЕДИТЬ' : 'НЕДОСТАТОЧНО СРЕДСТВ'}
            </button>
          )}

          <button
            onClick={onConfirm}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-black text-xs rounded-xl shadow-lg transition cursor-pointer uppercase tracking-wider"
          >
            {isTax || isLawsuit
              ? 'Оплатить и продолжить'
              : isDonation
              ? 'Сделать взнос ($50k)'
              : 'Продолжить ход ➔'}
          </button>
        </div>

      </div>
    </div>
  );
};