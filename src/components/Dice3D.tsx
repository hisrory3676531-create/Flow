import { useState, useEffect } from 'react';
import type { FC } from 'react';

interface Dice3DProps {
  value: number | null;
  isRolling: boolean;
  size?: number;
}

// Карты поворотов 3D куба для каждой грани от 1 до 6
const FACE_ROTATIONS: Record<number, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: 180 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  5: { x: -90, y: 0 },
  6: { x: 90, y: 0 }
};

export const SingleDie: FC<{ value: number; isRolling: boolean; size?: number }> = ({
  value,
  isRolling,
  size = 48
}) => {
  const [rotation, setRotation] = useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (isRolling) {
      // Случайное хаотичное вращение во время броска
      const randomX = Math.floor(Math.random() * 4 + 3) * 360 + (Math.random() * 90 - 45);
      const randomY = Math.floor(Math.random() * 4 + 3) * 360 + (Math.random() * 90 - 45);
      const randomZ = Math.floor(Math.random() * 2) * 180;
      setRotation({ x: randomX, y: randomY, z: randomZ });
    } else {
      // Четкая фиксация нужной гранью вперед
      const target = FACE_ROTATIONS[value] || FACE_ROTATIONS[1];
      setRotation({
        x: target.x + 720, // 2 полных оборота до финальной точки для плавности
        y: target.y + 720,
        z: 0
      });
    }
  }, [isRolling, value]);

  const halfSize = size / 2;

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{
        width: size,
        height: size,
        perspective: size * 6
      }}
    >
      <div
        className="w-full h-full relative preserve-3d transition-transform duration-[650ms] ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`
        }}
      >
        {/* Грань 1 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl border border-amber-300 shadow-inner flex items-center justify-center"
          style={{ transform: `rotateY(0deg) translateZ(${halfSize}px)` }}
        >
          <div className="w-2.5 h-2.5 bg-slate-950 rounded-full shadow-sm" />
        </div>

        {/* Грань 2 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl border border-amber-300 shadow-inner p-2 flex justify-between"
          style={{ transform: `rotateY(180deg) translateZ(${halfSize}px)` }}
        >
          <div className="w-2.5 h-2.5 bg-slate-950 rounded-full shadow-sm self-start" />
          <div className="w-2.5 h-2.5 bg-slate-950 rounded-full shadow-sm self-end" />
        </div>

        {/* Грань 3 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl border border-amber-300 shadow-inner p-2 flex justify-between"
          style={{ transform: `rotateY(90deg) translateZ(${halfSize}px)` }}
        >
          <div className="w-2.5 h-2.5 bg-slate-950 rounded-full shadow-sm self-start" />
          <div className="w-2.5 h-2.5 bg-slate-950 rounded-full shadow-sm self-center" />
          <div className="w-2.5 h-2.5 bg-slate-950 rounded-full shadow-sm self-end" />
        </div>

        {/* Грань 4 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl border border-amber-300 shadow-inner p-2 grid grid-cols-2 gap-1 place-items-center"
          style={{ transform: `rotateY(-90deg) translateZ(${halfSize}px)` }}
        >
          <div className="w-2.5 h-2.5 bg-slate-950 rounded-full shadow-sm" />
          <div className="w-2.5 h-2.5 bg-slate-950 rounded-full shadow-sm" />
          <div className="w-2.5 h-2.5 bg-slate-950 rounded-full shadow-sm" />
          <div className="w-2.5 h-2.5 bg-slate-950 rounded-full shadow-sm" />
        </div>

        {/* Грань 5 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl border border-amber-300 shadow-inner p-2 grid grid-cols-3 place-items-center"
          style={{ transform: `rotateX(90deg) translateZ(${halfSize}px)` }}
        >
          <div className="w-2 h-2 bg-slate-950 rounded-full col-start-1" />
          <div className="w-2 h-2 bg-slate-950 rounded-full col-start-3" />
          <div className="w-2 h-2 bg-slate-950 rounded-full col-start-2" />
          <div className="w-2 h-2 bg-slate-950 rounded-full col-start-1" />
          <div className="w-2 h-2 bg-slate-950 rounded-full col-start-3" />
        </div>

        {/* Грань 6 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl border border-amber-300 shadow-inner p-1.5 grid grid-cols-2 gap-1 place-items-center"
          style={{ transform: `rotateX(-90deg) translateZ(${halfSize}px)` }}
        >
          <div className="w-2 h-2 bg-slate-950 rounded-full" />
          <div className="w-2 h-2 bg-slate-950 rounded-full" />
          <div className="w-2 h-2 bg-slate-950 rounded-full" />
          <div className="w-2 h-2 bg-slate-950 rounded-full" />
          <div className="w-2 h-2 bg-slate-950 rounded-full" />
          <div className="w-2 h-2 bg-slate-950 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const Dice3DContainer: FC<Dice3DProps> = ({ value, isRolling, size = 44 }) => {
  if (!value && !isRolling) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <SingleDie value={1} isRolling={false} size={size} />
      </div>
    );
  }

  // Расчет значений отдельных кубиков, если сумма больше 6
  let diceList: number[] = [value || 1];
  if (value && value > 6 && value <= 12) {
    const d1 = Math.min(6, Math.floor(value / 2));
    const d2 = value - d1;
    diceList = [d1, d2];
  } else if (value && value > 12) {
    const d1 = 6;
    const d2 = Math.min(6, Math.floor((value - 6) / 2));
    const d3 = value - 6 - d2;
    diceList = [d1, d2, d3];
  }

  return (
    <div className={`flex items-center justify-center gap-3 transition-transform ${isRolling ? 'scale-110' : 'scale-100'}`}>
      {diceList.map((val, idx) => (
        <SingleDie key={idx} value={val} isRolling={isRolling} size={size} />
      ))}
    </div>
  );
};