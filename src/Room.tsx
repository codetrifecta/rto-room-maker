import { FC } from 'react';
import { useAppStore } from './store';
import clsx from 'clsx';
import { TILE_TYPE } from './constants';

export const Room: FC = () => {
  const { roomLength, tileSize, displayGrid, roomMatrix } = useAppStore();

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
  return (
    <div className="relative" style={{ width: size, height: size, padding: 1 }}>
      <div
        className={clsx('w-full h-full', {
          border: displayOutline,
          'border-white': tileType === TILE_TYPE.FLOOR,
        })}
      ></div>
    </div>
  );
};
