import type { FC } from 'react';
import type { MarketCard } from '../data/cards.data';
import type { Asset } from '../types/game.types';
import { Tooltip } from './Tooltip';

interface MarketModalProps {
  card: MarketCard;
  playerAssets: Asset[];
  onSellAsset: (asset: Asset, salePrice: number) => void;
  onExecuteSplit: (symbol: string, ratio: number) => void;
  onPass: () => void;
}

export const MarketModal: FC<MarketModalProps> = ({
  card,
  playerAssets = [],
  onSellAsset,
  onExecuteSplit,
  onPass
}) => {
  const isSplit = card.targetType === 'SPLIT';
  const cardSymbol = (card as any).symbol || (card as any).targetSymbol || '';
  const cardSubtype = (card as any).targetSubtype || '';

  // Фильтруем подходящие активы игрока
  const matchingAssets = playerAssets.filter((asset) => {
    // 1. Акции и сплиты
    if (card.targetType === 'STOCK' || card.targetType === 'SPLIT') {
      return (
        asset.type === 'STOCK' &&
        asset.title.toUpperCase().includes(cardSymbol.toUpperCase())
      );
    }

    // 2. Легковые автомобили
    if (card.targetType === 'VEHICLE') {
      return asset.type === 'VEHICLE' || asset.title.toLowerCase().includes('авто');
    }

    // 3. Бизнес и франшизы
    if (card.targetType === 'BUSINESS') {
      if (card.title.toLowerCase().includes('автомойк') || card.title.toLowerCase().includes('автосервис')) {
        return asset.title.toLowerCase().includes('автомойка') || asset.title.toLowerCase().includes('автосервис');
      }
      if (card.title.toLowerCase().includes('пиццери') || card.title.toLowerCase().includes('кофейн')) {
        return asset.title.toLowerCase().includes('пиццери') || asset.title.toLowerCase().includes('кофе');
      }
      if (card.title.toLowerCase().includes('аптек')) {
        return asset.title.toLowerCase().includes('аптек');
      }
      if (card.title.toLowerCase().includes('вендинг') || card.title.toLowerCase().includes('автомат')) {
        return asset.title.toLowerCase().includes('автомат') || asset.title.toLowerCase().includes('постамат') || asset.title.toLowerCase().includes('киоск');
      }
      return asset.type === 'BUSINESS';
    }

    // 4. Драгоценные металлы и антиквариат
    if (card.targetType === 'COMMODITY') {
      return asset.type === 'COMMODITY';
    }

    // 5. Недвижимость и логистические центры (РЦ)
    if (card.targetType === 'REAL_ESTATE') {
      if (asset.type !== 'REAL_ESTATE') return false;

      const cardTitleLower = card.title.toLowerCase();
      const cardDescLower = card.description.toLowerCase();
      const assetTitleLower = asset.title.toLowerCase();

      // Проверка на конкретные РЦ
      if (cardDescLower.includes('рц тамбовская') || cardTitleLower.includes('рц тамбовская')) {
        return assetTitleLower.includes('тамбовская');
      }
      if (cardDescLower.includes('рц агротерминал') || cardTitleLower.includes('рц агротерминал')) {
        return assetTitleLower.includes('агротерминал');
      }
      if (cardDescLower.includes('рц пограничников') || cardTitleLower.includes('рц пограничников')) {
        return assetTitleLower.includes('пограничников');
      }

      // Проверка на типы жилья и коммерции
      if (cardTitleLower.includes('1-2 комнатные') || cardDescLower.includes('малогабаритные')) {
        return assetTitleLower.includes('1-комнатная') || assetTitleLower.includes('2-комнатная') || assetTitleLower.includes('студия') || assetTitleLower.includes('комната');
      }
      if (cardTitleLower.includes('4-квартирные')) {
        return assetTitleLower.includes('4-квартирный') || assetTitleLower.includes('дуплекс');
      }
      if (cardTitleLower.includes('8-квартирные')) {
        return assetTitleLower.includes('8-квартирный');
      }
      if (cardTitleLower.includes('12-24 кв')) {
        return assetTitleLower.includes('12-квартирный') || assetTitleLower.includes('24-квартирный');
      }
      if (cardTitleLower.includes('участк')) {
        return assetTitleLower.includes('участок') || assetTitleLower.includes('земля');
      }
      if (cardTitleLower.includes('гараж') || cardTitleLower.includes('паркинг')) {
        return assetTitleLower.includes('гараж') || assetTitleLower.includes('парковочное');
      }
      if (cardTitleLower.includes('торговые центры')) {
        return assetTitleLower.includes('торговый центр');
      }
      if (cardTitleLower.includes('бизнес-центры')) {
        return assetTitleLower.includes('бизнес-центр');
      }
      if (cardTitleLower.includes('пансионат') || cardTitleLower.includes('отел')) {
        return assetTitleLower.includes('отель') || assetTitleLower.includes('пансионат');
      }

      if (cardSubtype) {
        return assetTitleLower.includes(cardSubtype.toLowerCase());
      }
      return true;
    }

    return false;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-amber-500/50 w-full max-w-lg rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 text-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        
        {/* Шапка */}
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                📈 КЛЕТКА «РЫНОК» ({isSplit ? 'ДРОБЛЕНИЕ АКЦИЙ' : 'СОБЫТИЕ'})
              </span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                ОБЩИЙ РЫНОК
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-100 mt-1">{card.title}</h3>
          </div>
          <span className="text-2xl sm:text-3xl">{isSplit ? '✂️' : '🏦'}</span>
        </div>

        <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-2xl border border-slate-800 leading-relaxed">
          {card.description}
        </p>

        {/* Сценарий 1: Сплит акций */}
        {isSplit ? (
          <div className="space-y-3">
            <div className="bg-purple-950/30 border border-purple-800/60 p-3 rounded-2xl text-xs flex justify-between items-center">
              <span className="text-purple-200 font-semibold">Коэффициент сплита:</span>
              <span className="text-base font-black font-mono text-purple-400">×{card.splitRatio || 2}</span>
            </div>

            {matchingAssets.length === 0 ? (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center text-xs text-slate-500 italic">
                У вас нет акций {cardSymbol} в портфеле.
              </div>
            ) : (
              <div className="bg-slate-950 p-3 rounded-2xl border border-emerald-500/40 space-y-2">
                <div className="text-xs text-slate-300">
                  Ваши акции {cardSymbol}: <strong className="text-emerald-400">{matchingAssets[0].sharesCount} шт</strong> ➔ станут: <strong className="text-amber-400">{(matchingAssets[0].sharesCount || 0) * (card.splitRatio || 2)} шт</strong>
                </div>
                <button
                  onClick={() => onExecuteSplit(cardSymbol, card.splitRatio || 2)}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  ПРИМЕНИТЬ СПЛИТ АКЦИЙ ➔
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Сценарий 2: Выкуп активов */
          <>
            <div className="bg-amber-950/30 border border-amber-800/60 p-3 rounded-2xl flex justify-between items-center text-xs font-mono">
              <span className="text-amber-200 font-semibold">Цена предложения рынка:</span>
              <span className="text-sm sm:text-base font-black text-amber-400">
                {card.offerPrice?.toLocaleString()} $ {card.targetType === 'STOCK' ? '/ шт' : ''}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Ваши активы под это предложение ({matchingAssets.length}):
              </span>

              {matchingAssets.length === 0 ? (
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center text-xs text-slate-500 italic">
                  У вас пока нет подходящих объектов для продажи по этой цене.
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {matchingAssets.map((asset) => {
                    const isStock = asset.type === 'STOCK';
                    const mortgage = asset.mortgage || 0;
                    const offerPrice = card.offerPrice || 0;
                    const netPayout = isStock
                      ? offerPrice * (asset.sharesCount || 1)
                      : offerPrice - mortgage;

                    return (
                      <div
                        key={asset.id}
                        className="bg-slate-950 p-2.5 sm:p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-slate-200 truncate">{asset.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center space-x-1">
                            {!isStock && mortgage > 0 && (
                              <>
                                <span>Ипотека: {mortgage.toLocaleString()}$</span>
                                <Tooltip text={`Банк спишет остаток ипотеки (${mortgage.toLocaleString()} $), а чистую прибыль начислит вам на баланс.`} />
                              </>
                            )}
                            {isStock && <span>Количество: {asset.sharesCount} шт</span>}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <div className="text-right">
                            <span className="text-[9px] text-slate-500 block uppercase font-semibold">На руки</span>
                            <span className="font-mono font-black text-emerald-400 text-xs sm:text-sm">
                              +{netPayout.toLocaleString()} $
                            </span>
                          </div>

                          <button
                            onClick={() => onSellAsset(asset, offerPrice)}
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs transition cursor-pointer shadow-md shadow-emerald-500/20"
                          >
                            ПРОДАТЬ
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        <button
          onClick={onPass}
          className="w-full bg-slate-800 hover:bg-slate-700 active:scale-95 transition py-2.5 sm:py-3 rounded-xl text-xs font-bold text-slate-300 cursor-pointer"
        >
          Закрыть окно
        </button>
      </div>
    </div>
  );
};