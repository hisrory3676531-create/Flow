// src/components/Tooltip.tsx
import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={(e) => {
        e.stopPropagation();
        setIsVisible(!isVisible);
      }}
    >
      <button
        type="button"
        className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 flex items-center justify-center text-[10px] font-bold transition-colors cursor-help"
        aria-label="Справка"
      >
        ?
      </button>

      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-56 p-2.5 bg-slate-950/95 border border-slate-700 text-slate-200 text-xs rounded-xl shadow-2xl backdrop-blur-sm pointer-events-none leading-relaxed animate-in fade-in zoom-in-95 duration-150">
          <div className="font-normal text-[11px]">{text}</div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-700" />
        </div>
      )}
    </div>
  );
};