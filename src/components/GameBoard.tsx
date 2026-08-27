import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { BOARD_TILES, BoardTile } from '../data/board.data';
import type { RatColor } from './ProfileSetupScreen';

export interface BoardPlayer {
  id: string;
  name: string;
  position: number;
  color: RatColor;
  isCurrentTurn: boolean;
}

interface GameBoardProps {
  players: BoardPlayer[];
  activePlayerId?: string;
}

export const GameBoard: FC<GameBoardProps> = ({
  players = [],
  activePlayerId
}) => {
  const TOTAL_TILES = 24;
  const CENTER_X = 600;
  const CENTER_Y = 375;
  const INNER_R = 175;
  const OUTER_R = 305;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const safePlayers = Array.isArray(players)
    ? players.filter(Boolean).map((p) => ({
        ...p,
        position: p?.position ?? 0
      }))
    : [];

  const activePlayer = safePlayers.find((p) => p.id === activePlayerId) || safePlayers[0] || {
    id: 'default',
    name: 'Игрок',
    position: 0,
    color: { id: 'purple', name: 'Фиолетовая', hex: '#a855f7', bgClass: '', borderClass: '', textClass: '' },
    isCurrentTurn: true
  };

  const currentTile = BOARD_TILES[activePlayer.position] || BOARD_TILES[0];

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

  const getTileFill = (type: BoardTile['type']) => {
    switch (type) {
      case 'PAYDAY': return '#065f46';
      case 'DEAL': return '#1e3a8a';
      case 'DOODAD': return '#881337';
      case 'MARKET': return '#78350f';
      case 'CHARITY': return '#115e59';
      case 'DOWNTURN': return '#581c87';
      case 'BABY': return '#831843';
      default: return '#1e293b';
    }
  };

  // На мобильном берем плотный квадрат ровно по границам внешнего круга
  const viewBoxValue = isMobile ? '280 55 640 640' : '0 0 1200 750';

  return (
    <div className="bg-[#1c082e]/80 border border-purple-900/40 rounded-2xl p-1.5 sm:p-3 flex flex-col justify-between shadow-2xl w-full h-full overflow-hidden">
      {/* Верхний статус */}
      <div className="flex items-center justify-between gap-1 border-b border-purple-800/40 pb-1.5 px-1 shrink-0">
        <div className="flex items-center space-x-1">
          <span className="text-[11px] font-black text-amber-300">CASHFLOW</span>
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto py-0.5 max-w-[65%]">
          {safePlayers.map((p) => (
            <div
              key={p.id}
              className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-md text-[10px] border shrink-0 ${
                p.id === activePlayer.id
                  ? 'border-amber-400 bg-amber-400/20 text-amber-300 font-bold'
                  : 'border-slate-800 bg-slate-950/80 text-slate-400'
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color?.hex || '#a855f7' }} />
              <span className="truncate max-w-[50px]">{p.name}</span>
              <span className="text-[9px] opacity-75 font-mono">#{p.position}</span>
            </div>
          ))}
        </div>

        <div className="text-[10px] font-mono font-bold text-emerald-400 shrink-0">
          #{activePlayer.position} {currentTile.title}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-0 overflow-hidden py-1">
        <svg
          viewBox={viewBoxValue}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full max-h-full select-none"
        >
          {/* Фон скоростной дорожки на ПК */}
          {!isMobile && (
            <rect
              x="15"
              y="15"
              width="1170"
              height="720"
              rx="28"
              fill="#12041f"
              stroke="#eab308"
              strokeWidth="3.5"
            />
          )}

          {/* Фоновый круг */}
          <circle cx={CENTER_X} cy={CENTER_Y} r={OUTER_R + 6} fill="#2e0854" stroke="#eab308" strokeWidth="3.5" />
          <circle cx={CENTER_X} cy={CENTER_Y} r={INNER_R - 5} fill="#120324" stroke="#a855f7" strokeWidth="2.5" />

          {/* 24 сектора малого круга */}
          {BOARD_TILES.map((tile, i) => {
            const path = getSectorPath(i);
            const deg = getSectorAngle(i);
            const isTargeted = activePlayer.position === i;

            // Разворачиваем текст, если он попадает в нижнюю полусферу (от 90 до 270 град)
            const isBottomHalf = deg > 90 && deg < 270;
            const textRotation = isBottomHalf ? deg + 180 : deg;
            const textYOffset = isBottomHalf ? (INNER_R + OUTER_R) / 2 : -((INNER_R + OUTER_R) / 2);

            return (
              <g key={tile.id}>
                <path
                  d={path}
                  fill={getTileFill(tile.type)}
                  stroke={isTargeted ? (activePlayer.color?.hex || '#eab308') : '#4c1d95'}
                  strokeWidth={isTargeted ? '4.5' : '1.5'}
                />

                {/* Номер и Иконка */}
                <g transform={`translate(${CENTER_X}, ${CENTER_Y}) rotate(${deg})`}>
                  <text
                    x="0"
                    y={-OUTER_R + 13}
                    textAnchor="middle"
                    fill="#cbd5e1"
                    fontSize="7"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    #{tile.id}
                  </text>
                  <text
                    x="0"
                    y={-INNER_R + 14}
                    textAnchor="middle"
                    fontSize="10"
                  >
                    {tile.icon}
                  </text>
                </g>

                {/* Название сектора (всегда ориентировано читаемо) */}
                <g transform={`translate(${CENTER_X}, ${CENTER_Y}) rotate(${textRotation})`}>
                  <text
                    x="0"
                    y={textYOffset + 3}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="7.5"
                    fontWeight="800"
                    letterSpacing="0.2"
                  >
                    {tile.title}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Центр круга */}
          <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
            <circle cx="0" cy="0" r="145" fill="#240742" stroke="#f59e0b" strokeWidth="3" />
            <text x="0" y="-70" textAnchor="middle" fill="#facc15" fontSize="24" fontWeight="900" letterSpacing="1.5">
              CASHFLOW
            </text>
            <text x="0" y="-52" textAnchor="middle" fill="#e2e8f0" fontSize="8.5" fontWeight="bold">
              КАК ВЫРВАТЬСЯ ИЗ КРЫСИНЫХ БЕГОВ
            </text>

            <text x="0" y="22" textAnchor="middle" fontSize="64">
              🐀
            </text>

            <rect x="-70" y="60" width="140" height="22" rx="11" fill="#090314" stroke="#eab308" strokeWidth="1.5" />
            <text x="0" y="75" textAnchor="middle" fill="#4ade80" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
              МАЛЫЙ КРУГ
            </text>
          </g>

          {/* Мультиплеерные фишки игроков */}
          {BOARD_TILES.map((tile) => {
            const playersOnTile = safePlayers.filter((p) => (p.position ?? 0) === tile.id);
            if (playersOnTile.length === 0) return null;

            const deg = getSectorAngle(tile.id);
            const rad = ((deg - 90) * Math.PI) / 180;
            const markerR = OUTER_R - 22;

            const posX = CENTER_X + markerR * Math.cos(rad);
            const posY = CENTER_Y + markerR * Math.sin(rad);

            return (
              <g key={`players-tile-${tile.id}`} transform={`translate(${posX}, ${posY})`}>
                {playersOnTile.map((p, idx) => {
                  const offsetX = ((idx % 3) - 1) * 12;
                  const offsetY = Math.floor(idx / 3) * 12 - 5;
                  const isCur = p.id === activePlayer.id;

                  return (
                    <g key={p.id || idx} transform={`translate(${offsetX}, ${offsetY})`}>
                      {isCur && (
                        <circle
                          cx="0"
                          cy="0"
                          r="11"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2"
                          className="animate-ping opacity-75"
                        />
                      )}
                      <circle
                        cx="0"
                        cy="0"
                        r="7.5"
                        fill={p.color?.hex || '#ec4899'}
                        stroke="#0f172a"
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="2.5"
                        textAnchor="middle"
                        fill="#020617"
                        fontSize="6.5"
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
        </svg>
      </div>
    </div>
  );
};