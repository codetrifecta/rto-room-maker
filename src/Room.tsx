import { FC } from 'react';
import { useAppStore } from './store';
import clsx from 'clsx';

export const Room: FC = () => {
  const { roomLength, tileSize, displayGrid } = useAppStore();

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${roomLength}, ${tileSize}px)`,
        gridTemplateRows: `repeat(${roomLength}, ${tileSize}px)`,
      }}
    >
      {Array.from({ length: roomLength * roomLength }, (_, i) => (
        <Tile key={i} size={tileSize} displayOutline={displayGrid} />
      ))}
    </div>
  );
};

const Tile: FC<{ size: number; displayOutline: boolean }> = ({
  size,
  displayOutline,
}) => {
  return (
    <div className="relative" style={{ width: size, height: size, padding: 1 }}>
      <div
        className={clsx('w-full h-full', {
          'border border-white': displayOutline,
        })}
      ></div>
    </div>
  );
};
