import { useState } from 'react';
import type { FC } from 'react';

export interface RatColor {
  id: string;
  name: string;
  hex: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

export const RAT_COLORS: RatColor[] = [
  { id: 'red', name: 'Красная', hex: '#ef4444', bgClass: 'bg-red-500', borderClass: 'border-red-500', textClass: 'text-red-500' },
  { id: 'blue', name: 'Синяя', hex: '#3b82f6', bgClass: 'bg-blue-500', borderClass: 'border-blue-500', textClass: 'text-blue-500' },
  { id: 'green', name: 'Зеленая', hex: '#10b981', bgClass: 'bg-emerald-500', borderClass: 'border-emerald-500', textClass: 'text-emerald-500' },
  { id: 'yellow', name: 'Желтая', hex: '#eab308', bgClass: 'bg-yellow-500', borderClass: 'border-yellow-500', textClass: 'text-yellow-500' },
  { id: 'purple', name: 'Фиолетовая', hex: '#a855f7', bgClass: 'bg-purple-500', borderClass: 'border-purple-500', textClass: 'text-purple-500' },
  { id: 'orange', name: 'Оранжевая', hex: '#f97316', bgClass: 'bg-orange-500', borderClass: 'border-orange-500', textClass: 'text-orange-500' },
  { id: 'cyan', name: 'Бирюзовая', hex: '#06b6d4', bgClass: 'bg-cyan-500', borderClass: 'border-cyan-500', textClass: 'text-cyan-500' },
  { id: 'pink', name: 'Розовая', hex: '#ec4899', bgClass: 'bg-pink-500', borderClass: 'border-pink-500', textClass: 'text-pink-500' },
  { id: 'lime', name: 'Лаймовая', hex: '#84cc16', bgClass: 'bg-lime-500', borderClass: 'border-lime-500', textClass: 'text-lime-500' },
  { id: 'emerald', name: 'Изумрудная', hex: '#059669', bgClass: 'bg-emerald-600', borderClass: 'border-emerald-600', textClass: 'text-emerald-600' }
];

interface ProfileSetupScreenProps {
  onComplete: (name: string) => void;
}

export const ProfileSetupScreen: FC<ProfileSetupScreenProps> = ({ onComplete }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onComplete(name.trim());
  };

  return (
    <div className="min-h-screen bg-[#130620] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-purple-900/60 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center space-y-2">
          <span className="text-4xl block">🐀</span>
          <h2 className="text-2xl font-black text-slate-100">Создание профиля</h2>
          <p className="text-xs text-slate-400">Введите ваш игровой никнейм для входа в мультиплеер</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">Ваше имя / Никнейм:</label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Уоррен Баффет"
              className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-2xl px-4 py-3 text-sm font-bold text-slate-100 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-amber-400 hover:bg-amber-300 active:scale-95 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black py-3.5 rounded-2xl text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            К СПИСКУ КОМНАТ ➔
          </button>
        </form>
      </div>
    </div>
  );
};