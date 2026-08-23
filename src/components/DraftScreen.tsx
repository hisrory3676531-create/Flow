import { useState, useMemo } from 'react';
import type { FC } from 'react';
import type { Profession } from '../types/game.types';
import { PROFESSIONS } from '../data/professions.data';
import { ProfessionCard } from './ProfessionCard';
import { ProfessionModal } from './ProfessionModal';

interface DraftScreenProps {
  onStartGame: (selectedProfession: Profession) => void;
}

export const DraftScreen: FC<DraftScreenProps> = ({ onStartGame }) => {
  const [selectedProf, setSelectedProf] = useState<Profession | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  // Перемешиваем карточки один раз при монтировании экрана
  const shuffledCards = useMemo(() => {
    return [...PROFESSIONS].sort(() => Math.random() - 0.5);
  }, []);

  const handleCardClick = (profession: Profession, index: number) => {
    setFlippedIndex(index);
    setTimeout(() => {
      setSelectedProf(profession);
    }, 450);
  };

  return (
    <section className="min-h-screen bg-slate-950 flex flex-col items-center justify-between p-6 overflow-y-auto">
      {/* Заголовок */}
      <div className="text-center mt-2">
        <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-mono mb-2">
          <span>● СЕССИЯ: #GAME-77</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-wide text-slate-100">
          ВЫБЕРИТЕ СВОЮ КАРТОЧКУ СУДЬБЫ
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Перед вами 25 карточек профессий вслепую. Нажмите на любую наугад.
        </p>
      </div>

      {/* Сетка 5x5 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl w-full my-auto py-6">
        {shuffledCards.map((prof, index) => (
          <ProfessionCard
            key={prof.id}
            index={index}
            profession={prof}
            isFlipped={flippedIndex === index}
            onSelect={() => handleCardClick(prof, index)}
          />
        ))}
      </div>

      <div className="text-xs text-slate-600 font-mono pb-2">
        Всего в пуле: 25 уникальных профессий
      </div>

      {/* Модальное окно аудита выбранной карты */}
      {selectedProf && (
        <ProfessionModal
          profession={selectedProf}
          onConfirm={() => onStartGame(selectedProf)}
        />
      )}
    </section>
  );
};