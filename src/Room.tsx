import { FC } from 'react';
import { useAppStore } from './store';
import clsx from 'clsx';
import { TILE_TYPE } from './constants';

export const Room: FC = () => {
  const { roomLength, tileSize, displayGrid, roomMatrix } = useAppStore();

  console.log('room', roomMatrix);

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${roomLength}, ${tileSize}px)`,
        gridTemplateRows: `repeat(${roomLength}, ${tileSize}px)`,
      }}
    >
      {roomMatrix.map((row, rowIndex) =>
        row.map((tileType, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}`}
            tileType={tileType}
            size={tileSize}
            displayOutline={displayGrid}
          />
        ))
      )}
    </div>
  );
};

const Tile: FC<{
  size: number;
  displayOutline: boolean;
  tileType: TILE_TYPE;
}> = ({ size, displayOutline, tileType = TILE_TYPE.FLOOR }) => {
  console.log('tileType', tileType);

  return (
    <div className="relative" style={{ width: size, height: size, padding: 1 }}>
      <div
        className={clsx('w-full h-full', {
          border: displayOutline,
          'border-none': tileType === TILE_TYPE.NULL,
          'border-white': tileType === TILE_TYPE.FLOOR,
          'border-red-600': tileType === TILE_TYPE.WALL,
          'border-2 border-yellow-300': tileType === TILE_TYPE.DOOR,
        })}
      ></div>
    </div>
  );
};
