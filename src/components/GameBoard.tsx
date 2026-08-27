import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { BOARD_TILES, BoardTile } from '../data/board.data';
import { FAST_TRACK_TILES, FastTrackTile } from '../data/fastTrack.data';
import type { RatColor } from './ProfileSetupScreen';

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
}

export const GameBoard: FC<GameBoardProps> = ({
  players = [],
  activePlayerId
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
  
  // Координаты центра и увеличенные радиусы для заполнения экрана
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
    color: { id: 'purple', name: 'Фиолетовая', hex: '#a855f7', bgClass: '', borderClass: '', textClass: '' },
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

  const getFastTrackTileFill = (tile: FastTrackTile) => {
    switch (tile.type) {
      case 'PAYDAY': return '#064e3b';
      case 'BUSINESS': return '#0c4a6e';
      case 'DREAM': return '#78350f';
      case 'TAX_AUDIT': return '#7f1d1d';
      case 'LAWSUIT': return '#831843';
      case 'DONATION': return '#4c1d95';
      default: return '#1e1b4b';
    }
  };

  const getFastTrackRect = (index: number) => {
    if (isMobile) {
      // Вертикальный формат 750 x 1200 под экраны смартфонов
      const W_TOP = 114;
      const H_TOP = 100;
      const W_SIDE = 100;
      const H_SIDE = 106;
      const LEFT_X = 14;
      const RIGHT_X = 636;
      const TOP_Y = 14;
      const BOTTOM_Y = 1086;

      // 0..5 (Верх)
      if (index >= 0 && index <= 5) {
        const x = LEFT_X + index * 120.4;
        return { x, y: TOP_Y, w: W_TOP, h: H_TOP, center: { x: x + W_TOP / 2, y: TOP_Y + H_TOP / 2 } };
      }
      // 6..14 (Правая колонка)
      if (index >= 6 && index <= 14) {
        const sub = index - 5;
        const y = TOP_Y + sub * 107.2;
        return { x: RIGHT_X, y, w: W_SIDE, h: H_SIDE, center: { x: RIGHT_X + W_SIDE / 2, y: y + H_SIDE / 2 } };
      }
      // 15..20 (Низ)
      if (index >= 15 && index <= 20) {
        const sub = index - 15;
        const x = RIGHT_X - sub * 120.4;
        return { x, y: BOTTOM_Y, w: W_TOP, h: H_TOP, center: { x: x + W_TOP / 2, y: BOTTOM_Y + H_TOP / 2 } };
      }
      // 21..29 (Левая колонка)
      const sub = index - 20;
      const y = BOTTOM_Y - sub * 107.2;
      return { x: LEFT_X, y, w: W_SIDE, h: H_SIDE, center: { x: LEFT_X + W_SIDE / 2, y: y + H_SIDE / 2 } };
    }

    // Десктоп 1200 x 750
    const W = 110;
    const H = 64;
    const LEFT_X = 25;
    const RIGHT_X = 1065;
    const TOP_Y = 25;
    const BOTTOM_Y = 660;

    if (index >= 0 && index <= 9) {
      const x = LEFT_X + index * 115.5;
      return { x, y: TOP_Y, w: 112, h: H, center: { x: x + 56, y: TOP_Y + 32 } };
    }
    if (index >= 10 && index <= 14) {
      const sub = index - 9;
      const y = TOP_Y + sub * 105.8;
      return { x: RIGHT_X, y, w: W, h: 102, center: { x: RIGHT_X + 55, y: y + 51 } };
    }
    if (index >= 15 && index <= 24) {
      const sub = index - 15;
      const x = RIGHT_X - sub * 115.5;
      return { x, y: BOTTOM_Y, w: 112, h: H, center: { x: x + 56, y: BOTTOM_Y + 32 } };
    }
    const sub = index - 24;
    const y = BOTTOM_Y - sub * 105.8;
    return { x: LEFT_X, y, w: W, h: 102, center: { x: LEFT_X + 55, y: y + 51 } };
  };

  const viewBoxValue = isMobile ? '0 0 750 1200' : '0 0 1200 750';

  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      {/* Верхний статус-бар */}
      <div className="flex items-center justify-between gap-1 bg-[#1c082e]/90 border border-purple-900/50 rounded-xl px-2 py-1 mb-1 shrink-0 shadow-md">
        <div className="flex items-center space-x-1.5">
          <span className="text-[11px] font-black text-amber-300 tracking-wider">CASHFLOW</span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950 border border-purple-700/60 font-mono text-purple-300">
            {activePlayer.isOnFastTrack ? 'FAST TRACK' : 'МАЛЫЙ КРУГ'}
          </span>
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto py-0.5 max-w-[60%]">
          {safePlayers.map((p) => (
            <div
              key={p.id}
              className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-md text-[10px] border shrink-0 ${
                p.id === activePlayer.id
                  ? 'border-amber-400 bg-amber-400/20 text-amber-300 font-bold shadow-sm'
                  : 'border-slate-800 bg-slate-950/80 text-slate-400'
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color?.hex || '#a855f7' }} />
              <span className="truncate max-w-[50px]">{p.name}</span>
              <span className="text-[9px] opacity-75 font-mono">
                {p.isOnFastTrack ? `🚀#${p.fastTrackPosition}` : `🐀#${p.position}`}
              </span>
            </div>
          ))}
        </div>

        <div className="text-[10px] font-mono font-bold text-emerald-400 shrink-0">
          #{currentTilePosition} {currentTileTitle}
        </div>
      </div>

      {/* Адаптивный SVG Canvas */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-0 overflow-hidden bg-[#1c082e]/90 border border-purple-900/50 rounded-2xl shadow-2xl p-1">
        <svg
          viewBox={viewBoxValue}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full max-h-full select-none"
        >
          {/* Фон доски */}
          <rect
            x="6"
            y="6"
            width={isMobile ? '738' : '1188'}
            height={isMobile ? '1188' : '738'}
            rx="24"
            fill="#10031c"
            stroke="#4c1d95"
            strokeWidth="2"
          />

          {/* ВНЕШНИЙ ТРЕК: FAST TRACK (30 ЯЧЕЕК) */}
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
                  rx="12"
                  fill={getFastTrackTileFill(tile)}
                  stroke={isTargeted ? (activePlayer.color?.hex || '#f59e0b') : tile.color}
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
                  fill="#f8fafc"
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
                  fill="#94a3b8"
                  fontSize={isMobile ? '8' : '6'}
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {tile.cost ? `$${tile.cost.toLocaleString()}` : `#${tile.id}`}
                </text>
              </g>
            );
          })}

          {/* ВНУТРЕННИЙ КРУГ: МАЛЫЙ КРУГ */}
          <circle cx={CENTER_X} cy={CENTER_Y} r={OUTER_R + 5} fill="#230640" stroke="#eab308" strokeWidth="3" />
          <circle cx={CENTER_X} cy={CENTER_Y} r={INNER_R - 4} fill="#0d0218" stroke="#a855f7" strokeWidth="2" />

          {/* 24 сектора малого круга */}
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
                  stroke={isTargeted ? (activePlayer.color?.hex || '#eab308') : '#4c1d95'}
                  strokeWidth={isTargeted ? '4' : '1.2'}
                />

                <g transform={`translate(${CENTER_X}, ${CENTER_Y}) rotate(${deg})`}>
                  <text
                    x="0"
                    y={-OUTER_R + 12}
                    textAnchor="middle"
                    fill="#cbd5e1"
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
            <circle cx="0" cy="0" r={isMobile ? 125 : 120} fill="#1b0533" stroke="#f59e0b" strokeWidth="2.5" />
            <text x="0" y="-55" textAnchor="middle" fill="#facc15" fontSize={isMobile ? '24' : '20'} fontWeight="900" letterSpacing="1.5">
              CASHFLOW
            </text>
            <text x="0" y="-38" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="bold">
              ВЫХОД ИЗ КРЫСИНЫХ БЕГОВ
            </text>

            <text x="0" y="20" textAnchor="middle" fontSize={isMobile ? '56' : '48'}>
              🐀
            </text>

            <rect x="-60" y="52" width="120" height="20" rx="10" fill="#090314" stroke="#eab308" strokeWidth="1" />
            <text x="0" y="65" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold" fontFamily="monospace">
              МАЛЫЙ КРУГ
            </text>
          </g>

          {/* ФИШКИ ИГРОКОВ: МАЛЫЙ КРУГ */}
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
                          stroke="#ffffff"
                          strokeWidth="2"
                          className="animate-ping opacity-75"
                        />
                      )}
                      <circle
                        cx="0"
                        cy="0"
                        r="8"
                        fill={p.color?.hex || '#ec4899'}
                        stroke="#0f172a"
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fill="#020617"
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

          {/* ФИШКИ ИГРОКОВ: FAST TRACK */}
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
                          stroke="#f59e0b"
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