import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { BOARD_TILES, BoardTile } from '../data/board.data';
import { FAST_TRACK_TILES, FastTrackTile } from '../data/fastTrack.data';
import type { RatColor } from './ProfileSetupScreen';
import { Dice3DContainer } from './Dice3D';

export interface BoardPlayer {
  id: string;
  name: string;
  position: number;
  color?: RatColor;
  isCurrentTurn?: boolean;
  isOnFastTrack?: boolean;
  fastTrackPosition?: number;
}

interface GameBoardProps {
  players: BoardPlayer[];
  activePlayerId?: string;
  diceValue?: number | null;
  isRolling?: boolean;
}

export const GameBoard: FC<GameBoardProps> = ({
  players = [],
  activePlayerId,
  diceValue = null,
  isRolling = false
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const TOTAL_TILES = 24;
  
  const CENTER_X = isMobile ? 375 : 600;
  const CENTER_Y = isMobile ? 600 : 375;
  const INNER_R = isMobile ? 155 : 145;
  const OUTER_R = isMobile ? 265 : 255;

  const safePlayers = Array.isArray(players)
    ? players.filter(Boolean).map((p) => ({
        ...p,
        position: p?.position ?? 0,
        fastTrackPosition: p?.fastTrackPosition ?? 0,
        isOnFastTrack: Boolean(p?.isOnFastTrack)
      }))
    : [];

  const activePlayer = safePlayers.find((p) => p.id === activePlayerId) || safePlayers[0] || {
    id: 'default',
    name: 'Игрок',
    position: 0,
    fastTrackPosition: 0,
    isOnFastTrack: false,
    color: { id: 'purple', name: 'Фиолетовая', hex: '#8b5cf6', bgClass: '', borderClass: '', textClass: '' },
    isCurrentTurn: true
  };

  const currentRatTile = BOARD_TILES[activePlayer.position] || BOARD_TILES[0];
  const currentFastTile = FAST_TRACK_TILES[activePlayer.fastTrackPosition] || FAST_TRACK_TILES[0];
  const currentTileTitle = activePlayer.isOnFastTrack ? currentFastTile.title : currentRatTile.title;
  const currentTilePosition = activePlayer.isOnFastTrack ? activePlayer.fastTrackPosition : activePlayer.position;

  const getSectorPath = (index: number) => {
    const angleStep = (2 * Math.PI) / TOTAL_TILES;
    const startAngle = index * angleStep - Math.PI / 2;
    const endAngle = (index + 1) * angleStep - Math.PI / 2;

    const x1 = CENTER_X + OUTER_R * Math.cos(startAngle);
    const y1 = CENTER_Y + OUTER_R * Math.sin(startAngle);
    const x2 = CENTER_X + OUTER_R * Math.cos(endAngle);
    const y2 = CENTER_Y + OUTER_R * Math.sin(endAngle);

    const x3 = CENTER_X + INNER_R * Math.cos(endAngle);
    const y3 = CENTER_Y + INNER_R * Math.sin(endAngle);
    const x4 = CENTER_X + INNER_R * Math.cos(startAngle);
    const y4 = CENTER_Y + INNER_R * Math.sin(startAngle);

    return `M ${x1} ${y1} A ${OUTER_R} ${OUTER_R} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${INNER_R} ${INNER_R} 0 0 0 ${x4} ${y4} Z`;
  };

  const getSectorAngle = (index: number) => {
    const angleStep = 360 / TOTAL_TILES;
    return index * angleStep + angleStep / 2;
  };

  // Аутентичные матовые цвета настолки Cashflow 101
  const getTileFill = (type: BoardTile['type']) => {
    switch (type) {
      case 'PAYDAY': return '#15803d'; // Зеленый чек
      case 'DEAL': return '#1d4ed8';   // Синяя возможность
      case 'DOODAD': return '#be185d'; // Розовая всякая всячина
      case 'MARKET': return '#ea580c'; // Оранжевый рынок
      case 'CHARITY': return '#0f766e'; // Благотворительность
      case 'DOWNTURN': return '#6b21a8'; // Увольнение
      case 'BABY': return '#a21caf';     // Ребенок
      default: return '#334155';
    }
  };

  const getFastTrackTileFill = (tile: FastTrackTile) => {
    switch (tile.type) {
      case 'PAYDAY': return '#166534';
      case 'BUSINESS': return '#0369a1';
      case 'DREAM': return '#b45309';
      case 'TAX_AUDIT': return '#b91c1c';
      case 'DIVORCE': return '#991b1b';
      case 'LAWSUIT': return '#9f1239';
      case 'DONATION': return '#5b21b6';
      default: return '#1e293b';
    }
  };

const getFastTrackRect = (index: number) => {
    if (isMobile) {
      const W_TOP = 114;
      const H_TOP = 100;
      const W_SIDE = 100;
      const H_SIDE = 106;
      const LEFT_X = 14;
      const RIGHT_X = 636;
      const TOP_Y = 14;
      const BOTTOM_Y = 1086;

      if (index >= 0 && index <= 8) {
        const x = LEFT_X + index * 77.7;
        return { x, y: TOP_Y, w: W_TOP, h: H_TOP, center: { x: x + W_TOP / 2, y: TOP_Y + H_TOP / 2 } };
      }
      if (index >= 9 && index <= 16) {
        const sub = index - 8;
        const y = TOP_Y + sub * 120;
        return { x: RIGHT_X, y, w: W_SIDE, h: H_SIDE, center: { x: RIGHT_X + W_SIDE / 2, y: y + H_SIDE / 2 } };
      }
      if (index >= 17 && index <= 25) {
        const sub = index - 17;
        const x = RIGHT_X - sub * 77.7;
        return { x, y: BOTTOM_Y, w: W_TOP, h: H_TOP, center: { x: x + W_TOP / 2, y: BOTTOM_Y + H_TOP / 2 } };
      }
      const sub = index - 25;
      const y = BOTTOM_Y - sub * 120;
      return { x: LEFT_X, y, w: W_SIDE, h: H_SIDE, center: { x: LEFT_X + W_SIDE / 2, y: y + H_SIDE / 2 } };
    }

    // ДЕСКТОП: 34 карточки (11 сверху, 6 справа, 11 снизу, 6 слева)
    // Размеры и отступы подогнаны с математической точностью
    const W = 100;
    const H = 64;
    const H_SIDE = 84;       // Комфортная высота боковых карточек
    const STEP_SIDE_Y = 91.5; // Шаг по вертикали между центрами

    const LEFT_X = 25;
    const RIGHT_X = 1075;
    const TOP_Y = 25;
    const BOTTOM_Y = 660;

    // 0..10: Верхний ряд (11 карточек, от X=25 до X=1075)
    if (index >= 0 && index <= 10) {
      const x = LEFT_X + index * 105;
      return { x, y: TOP_Y, w: W, h: H, center: { x: x + W / 2, y: TOP_Y + H / 2 } };
    }

    // 11..16: Правый ряд (6 карточек СТРОГО МЕЖДУ верхним и нижним углами)
    if (index >= 11 && index <= 16) {
      const sub = index - 11;
      const y = 100 + sub * STEP_SIDE_Y;
      return { x: RIGHT_X, y, w: W, h: H_SIDE, center: { x: RIGHT_X + W / 2, y: y + H_SIDE / 2 } };
    }

    // 17..27: Нижний ряд (11 карточек, справа налево от X=1075 до X=25)
    if (index >= 17 && index <= 27) {
      const sub = index - 17;
      const x = RIGHT_X - sub * 105;
      return { x, y: BOTTOM_Y, w: W, h: H, center: { x: x + W / 2, y: BOTTOM_Y + H / 2 } };
    }

    // 28..33: Левый ряд (6 карточек СТРОГО МЕЖДУ нижним и верхним углами, снизу вверх)
    const sub = index - 28;
    const y = 557.5 - sub * STEP_SIDE_Y;
    return { x: LEFT_X, y, w: W, h: H_SIDE, center: { x: LEFT_X + W / 2, y: y + H_SIDE / 2 } };
  };

  const viewBoxValue = isMobile ? '0 0 750 1200' : '0 0 1200 750';

  return (
    <div className="w-full h-full flex flex-col justify-between select-none relative">
      {/* Верхний статус-бар игровой доски */}
      <div className="flex items-center justify-between gap-1 bg-[#240a2c] border border-amber-500/40 rounded-xl px-2.5 py-1 mb-1.5 shrink-0 shadow-md">
        <div className="flex items-center space-x-1.5">
          <span className="text-[11px] font-black text-amber-400 tracking-wider">CASHFLOW</span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#3b1247] border border-amber-500/30 font-bold text-amber-200">
            {activePlayer.isOnFastTrack ? 'FAST TRACK' : 'МАЛЫЙ КРУГ'}
          </span>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5 max-w-[60%]">
          {safePlayers.map((p) => (
            <div
              key={p.id}
              className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-lg text-[10px] border shrink-0 transition ${
                p.id === activePlayer.id
                  ? 'border-amber-400 bg-amber-500/20 text-amber-200 font-black shadow'
                  : 'border-purple-900/60 bg-[#19061f] text-slate-400'
              }`}
            >
              <div className="w-2 h-2 rounded-full ring-1 ring-black/40" style={{ backgroundColor: p.color?.hex || '#8b5cf6' }} />
              <span className="truncate max-w-[55px]">{p.name}</span>
              <span className="text-[9px] font-mono opacity-80">
                {p.isOnFastTrack ? `🚀#${p.fastTrackPosition}` : `🐀#${p.position}`}
              </span>
            </div>
          ))}
        </div>

        <div className="text-[10px] font-bold text-amber-300 bg-[#3b1247] px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
          #{currentTilePosition} {currentTileTitle}
        </div>
      </div>

      {/* Игровое поле */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-0 overflow-hidden bg-[#240a2c] border-2 border-amber-500/30 rounded-2xl shadow-xl p-1">
        {isRolling && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl animate-in fade-in duration-150 pointer-events-none">
            <div className="bg-[#2d0d38] border-2 border-amber-400 p-5 sm:p-6 rounded-2xl shadow-2xl flex flex-col items-center space-y-3">
              <Dice3DContainer value={diceValue} isRolling={isRolling} size={58} />
              <span className="text-xs font-black text-amber-300 uppercase tracking-widest animate-pulse">
                🎲 Бросок ({activePlayer.name})...
              </span>
            </div>
          </div>
        )}

        <svg
          viewBox={viewBoxValue}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full max-h-full select-none"
        >
          {/* Фон картонной доски Fast Track */}
          <rect
            x="6"
            y="6"
            width={isMobile ? '738' : '1188'}
            height={isMobile ? '1188' : '738'}
            rx="20"
            fill="#1d0724"
            stroke="#b45309"
            strokeWidth="3"
          />

          {/* Клетки Fast Track */}
          {FAST_TRACK_TILES.map((tile) => {
            const r = getFastTrackRect(tile.id);
            const isTargeted = activePlayer.isOnFastTrack && activePlayer.fastTrackPosition === tile.id;

            return (
              <g key={`ft_${tile.id}`}>
                <rect
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx="8"
                  fill={getFastTrackTileFill(tile)}
                  stroke={isTargeted ? '#fbbf24' : '#78350f'}
                  strokeWidth={isTargeted ? '3.5' : '1.5'}
                />

                <text
                  x={r.center.x}
                  y={r.center.y - (isMobile ? 14 : 8)}
                  textAnchor="middle"
                  fontSize={isMobile ? '18' : '13'}
                >
                  {tile.icon}
                </text>

                <text
                  x={r.center.x}
                  y={r.center.y + (isMobile ? 8 : 7)}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={isMobile ? '9' : '7.5'}
                  fontWeight="800"
                  fontFamily="sans-serif"
                >
                  {tile.title.length > 13 ? `${tile.title.slice(0, 12)}...` : tile.title}
                </text>

                <text
                  x={r.center.x}
                  y={r.center.y + (isMobile ? 22 : 17)}
                  textAnchor="middle"
                  fill="#fde68a"
                  fontSize={isMobile ? '8' : '6'}
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {tile.cost ? `$${tile.cost.toLocaleString()}` : `#${tile.id}`}
                </text>
              </g>
            );
          })}

          {/* Внешний обод малого круга */}
          <circle cx={CENTER_X} cy={CENTER_Y} r={OUTER_R + 4} fill="#b45309" stroke="#78350f" strokeWidth="2" />
          <circle cx={CENTER_X} cy={CENTER_Y} r={INNER_R - 3} fill="#f5eedc" stroke="#d97706" strokeWidth="3" />

          {/* Сектора малого круга */}
          {BOARD_TILES.map((tile, i) => {
            const path = getSectorPath(i);
            const deg = getSectorAngle(i);
            const isTargeted = !activePlayer.isOnFastTrack && activePlayer.position === i;

            const isBottomHalf = deg > 90 && deg < 270;
            const textRotation = isBottomHalf ? deg + 180 : deg;
            const textYOffset = isBottomHalf ? (INNER_R + OUTER_R) / 2 : -((INNER_R + OUTER_R) / 2);

            return (
              <g key={tile.id}>
                <path
                  d={path}
                  fill={getTileFill(tile.type)}
                  stroke={isTargeted ? '#fef08a' : '#ffffff'}
                  strokeWidth={isTargeted ? '3.5' : '1'}
                />

                <g transform={`translate(${CENTER_X}, ${CENTER_Y}) rotate(${deg})`}>
                  <text
                    x="0"
                    y={-OUTER_R + 12}
                    textAnchor="middle"
                    fill="#fef08a"
                    fontSize={isMobile ? '8' : '6.5'}
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    #{tile.id}
                  </text>
                  <text
                    x="0"
                    y={-INNER_R + 14}
                    textAnchor="middle"
                    fontSize={isMobile ? '12' : '9'}
                  >
                    {tile.icon}
                  </text>
                </g>

                <g transform={`translate(${CENTER_X}, ${CENTER_Y}) rotate(${textRotation})`}>
                  <text
                    x="0"
                    y={textYOffset + 2.5}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={isMobile ? '8' : '6.5'}
                    fontWeight="900"
                    letterSpacing="0.2"
                  >
                    {tile.title}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Центральный круг «Крысиных бегов» в винтажно-бумажном стиле */}
          <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
            <circle cx="0" cy="0" r={isMobile ? 125 : 120} fill="#f5eedc" stroke="#d97706" strokeWidth="3" />
            
            <text x="0" y="-55" textAnchor="middle" fill="#4a154b" fontSize={isMobile ? '24' : '20'} fontWeight="900" letterSpacing="1.5">
              CASHFLOW
            </text>
            <text x="0" y="-38" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">
              ВЫХОД ИЗ КРЫСИНЫХ БЕГОВ
            </text>

            <text x="0" y="20" textAnchor="middle" fontSize={isMobile ? '56' : '48'}>
              🐀
            </text>

            <rect x="-60" y="52" width="120" height="20" rx="10" fill="#4a154b" stroke="#d97706" strokeWidth="1.5" />
            <text x="0" y="65" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold" fontFamily="monospace">
              МАЛЫЙ КРУГ
            </text>
          </g>

          {/* Фишки на малом круге */}
          {BOARD_TILES.map((tile) => {
            const playersOnTile = safePlayers.filter(
              (p) => !p.isOnFastTrack && (p.position ?? 0) === tile.id
            );
            if (playersOnTile.length === 0) return null;

            const deg = getSectorAngle(tile.id);
            const rad = ((deg - 90) * Math.PI) / 180;
            const markerR = OUTER_R - 20;

            const posX = CENTER_X + markerR * Math.cos(rad);
            const posY = CENTER_Y + markerR * Math.sin(rad);

            return (
              <g key={`rat-players-tile-${tile.id}`} transform={`translate(${posX}, ${posY})`}>
                {playersOnTile.map((p, idx) => {
                  const offsetX = ((idx % 3) - 1) * 14;
                  const offsetY = Math.floor(idx / 3) * 14 - 5;
                  const isCur = p.id === activePlayer.id;

                  return (
                    <g key={p.id || idx} transform={`translate(${offsetX}, ${offsetY})`}>
                      {isCur && (
                        <circle
                          cx="0"
                          cy="0"
                          r="12"
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="2.5"
                          className="animate-ping opacity-80"
                        />
                      )}
                      <circle
                        cx="0"
                        cy="0"
                        r="8"
                        fill={p.color?.hex || '#ec4899'}
                        stroke="#1e293b"
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="7"
                        fontWeight="900"
                        fontFamily="sans-serif"
                      >
                        {p.name ? p.name.charAt(0).toUpperCase() : 'P'}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Фишки на Скоростной дорожке */}
          {FAST_TRACK_TILES.map((tile) => {
            const playersOnTile = safePlayers.filter(
              (p) => p.isOnFastTrack && (p.fastTrackPosition ?? 0) === tile.id
            );
            if (playersOnTile.length === 0) return null;

            const r = getFastTrackRect(tile.id);

            return (
              <g key={`fast-players-tile-${tile.id}`} transform={`translate(${r.center.x}, ${r.center.y})`}>
                {playersOnTile.map((p, idx) => {
                  const offsetX = ((idx % 2) - 0.5) * 18;
                  const offsetY = Math.floor(idx / 2) * 16 - 5;
                  const isCur = p.id === activePlayer.id;

                  return (
                    <g key={`ft_p_${p.id || idx}`} transform={`translate(${offsetX}, ${offsetY})`}>
                      {isCur && (
                        <circle
                          cx="0"
                          cy="0"
                          r="13"
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="2.5"
                          className="animate-ping opacity-80"
                        />
                      )}
                      <circle
                        cx="0"
                        cy="0"
                        r="9"
                        fill={p.color?.hex || '#38bdf8'}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fill="#020617"
                        fontSize="8"
                        fontWeight="900"
                        fontFamily="sans-serif"
                      >
                        {p.name ? p.name.charAt(0).toUpperCase() : 'F'}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};