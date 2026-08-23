// src/components/ProfessionCard.tsx
import React from 'react';
import { Profession } from '../types/game.types';

interface ProfessionCardProps {
  index: number;
  profession: Profession;
  isFlipped: boolean;
  onSelect: (profession: Profession) => void;
}

export const ProfessionCard: React.FC<ProfessionCardProps> = ({
  index,
  profession,
  isFlipped,
  onSelect,
}) => {
  return (
    <div
      className="perspective h-24 sm:h-28 cursor-pointer select-none"
      onClick={() => onSelect(profession)}
    >
      <div
        className={`relative w-full h-full rounded-xl transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Рубашка карточки */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-xl flex flex-col items-center justify-center p-2 shadow-lg transition-colors [backface-visibility:hidden]">
          <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-emerald-400 font-black text-sm mb-1 shadow-inner">
            ?
          </div>
          <span className="text-[10px] text-slate-500 font-mono tracking-wider">
            КАРТА #{index + 1}
          </span>
        </div>

        {/* Лицевая сторона (после выбора) */}
        <div className="absolute inset-0 bg-emerald-950 border-2 border-emerald-500 rounded-xl flex flex-col items-center justify-center p-2 [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-emerald-500/20 shadow-lg">
          <span className="text-xs font-bold text-emerald-300 text-center">
            {profession.title}
          </span>
          <span className="text-[10px] text-emerald-400/80 font-mono mt-1">
            Выбрано
          </span>
        </div>
      </div>
    </div>
  );
};