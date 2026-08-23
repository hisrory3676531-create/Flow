import type { FC } from 'react';
import type { Player, Asset } from '../types/game.types';

interface BankruptcyModalProps {
  player: Player;
  deficit: number;
  onLiquidateAsset: (asset: Asset) => void;
  onDeclareBankruptcy: () => void;
}

export const BankruptcyModal: FC<BankruptcyModalProps> = ({
  player,
  deficit,
  onLiquidateAsset,
  onDeclareBankruptcy
}) => {
  const { assets } = player;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-rose-600 w-full max-w-lg rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start border-b border-rose-900/40 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
              ⚠️ УГРОЗА БАНКРОТСТВА!
            </span>
            <h3 className="text-lg font-black text-rose-300">Кассовый разрыв</h3>
          </div>
          <span className="text-3xl">🚨</span>
        </div>

        <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 leading-relaxed">
          У вас отрицательный баланс. Нехватка средств составляет:{' '}
          <strong className="text-rose-400 font-mono">-{deficit.toLocaleString()} $</strong>.
          По правилам вы должны продать активы банку за <strong>50% их стоимости</strong> либо объявить банкротство.
        </p>

        {/* Список активов для экстренной продажи */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Экстренная ликвидация активов (50% от взноса/стоимости):
          </span>

          {assets.length === 0 ? (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center text-xs text-slate-500">
              У вас нет активов для экстренной продажи.
            </div>
          ) : (
            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {assets.map((asset) => {
                const liquidationValue = Math.round(asset.downPayment * 0.5);

                return (
                  <div
                    key={asset.id}
                    className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-200">{asset.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Потеря пассива: -{asset.cashflow}$/мес
                      </div>
                    </div>

                    <button
                      onClick={() => onLiquidateAsset(asset)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3.5 py-2 rounded-xl text-xs transition cursor-pointer shrink-0"
                    >
                      ПРОДАТЬ (+{liquidationValue.toLocaleString()}$)
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Кнопка объявления банкротства */}
        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={onDeclareBankruptcy}
            className="w-full bg-rose-600 hover:bg-rose-500 active:scale-95 transition py-3 rounded-xl text-xs font-black text-white shadow-lg shadow-rose-600/30 cursor-pointer"
          >
            ОБЪЯВИТЬ БАНКРОТСТВО (ПРОПУСК 3 ХОДОВ) ➔
          </button>
        </div>
      </div>
    </div>
  );
};