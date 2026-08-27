import type { FC } from 'react';

interface SpectatorCardModalProps {
  cardData: any;
  onClose?: () => void;
}

export const SpectatorCardModal: FC<SpectatorCardModalProps> = ({ cardData }) => {
  if (!cardData) return null;

  const isStock = cardData.type === 'STOCK';
  const isFastTrackBiz = cardData.type === 'BUSINESS' || cardData.type === 'FAST_TRACK_BIZ';
  const isDream = cardData.type === 'DREAM';
  const owner = cardData.ownerName || 'Игрок';

  // Определение подходящей иконки для карточки
  const getIcon = () => {
    if (cardData.icon) return cardData.icon;
    if (isStock) return '📈';
    if (cardData.type === 'REAL_ESTATE') return '🏠';
    if (isFastTrackBiz) return '🏢';
    if (isDream) return '🌟';
    if (cardData.type === 'TAX_AUDIT') return '⚖️';
    if (cardData.type === 'LAWSUIT') return '🏛️';
    if (cardData.type === 'DONATION' || cardData.type === 'CHARITY') return '🤝';
    return '💼';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-none">
      <div className="bg-slate-900 border-2 border-purple-500/80 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Шапка зрителя */}
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
              👀 ХОД СОПЕРНИКА ({owner})
            </span>
            <h3 className="text-base font-black text-slate-100">
              {cardData.title || cardData.cardType || 'Карточка события'}
            </h3>
          </div>
          <span className="text-2xl">{getIcon()}</span>
        </div>

        {/* Текст описания */}
        <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 leading-relaxed">
          {cardData.description || 'Игрок принимает решение по сделке или событию...'}
        </p>

        {/* Финансовая таблица параметров */}
        {(cardData.cost || cardData.downPayment || cardData.cashflow !== undefined) && (
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5 font-mono text-xs">
            {cardData.cost ? (
              <div className="flex justify-between text-slate-400">
                <span>Стоимость:</span>
                <span className="text-slate-200 font-bold">
                  {isStock ? `${cardData.cost} $ / акция` : `${cardData.cost.toLocaleString()} $`}
                </span>
              </div>
            ) : null}

            {cardData.mortgage ? (
              <div className="flex justify-between text-slate-400">
                <span>Ипотека объекта:</span>
                <span className="text-slate-300 font-bold">{cardData.mortgage.toLocaleString()} $</span>
              </div>
            ) : null}

            {cardData.downPayment ? (
              <div className="flex justify-between text-slate-400">
                <span>Первый взнос:</span>
                <span className="text-emerald-400 font-bold">{cardData.downPayment.toLocaleString()} $</span>
              </div>
            ) : null}

            {cardData.cashflow !== undefined ? (
              <div className="flex justify-between text-slate-400">
                <span>Доход актива (Поток):</span>
                <span className="text-emerald-400 font-bold">
                  +{cardData.cashflow.toLocaleString()} ${isFastTrackBiz ? '/ход' : '/мес'}
                </span>
              </div>
            ) : null}
          </div>
        )}

        <div className="text-center text-[11px] text-purple-300 animate-pulse font-bold">
          ⏳ Ожидание решения игрока {owner}...
        </div>
      </div>
    </div>
  );
};