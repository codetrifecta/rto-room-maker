import { FC, useEffect, useRef } from 'react';
import { useAppStore } from './store';
import clsx from 'clsx';
import { TILE_TYPE } from './constants';

export const Room: FC = () => {
  const {
    roomLength,
    tileSize,
    displayGrid,
    roomMatrix,
    selectedTiles,
    isLeftMouseDown,
    setSelectedTiles,
    setRoomMatrix,
    setIsLeftMouseDown,
    setIsRightMouseDown,
  } = useAppStore();

  const roomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!roomRef.current) return;

    // Add mousedown and mouseup event listeners to the room
    const room = roomRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();

      let isRightMB;
      e = e || window.event;

      if ('which' in e)
        // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = e.which == 3;

      if (isRightMB) {
        setIsRightMouseDown(true);
      } else {
        setIsLeftMouseDown(true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();

      let isRightMB;
      e = e || window.event;

      if ('which' in e)
        // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = e.which == 3;

      if (isRightMB) {
        setIsRightMouseDown(false);
      } else {
        setIsLeftMouseDown(false);
      }
    };

    room.addEventListener('mousedown', handleMouseDown);
    room.addEventListener('mouseup', handleMouseUp);

    return () => {
      room.removeEventListener('mousedown', handleMouseDown);
      room.removeEventListener('mouseup', handleMouseUp);
    };
  }, [roomRef.current]);

  //   If room length changes,
  // Reset selected tiles
  useEffect(() => {
    setSelectedTiles([]);
  }, [roomLength]);

  const onAddSelectedTile = (row: number, col: number) => {
    // Add selected tile to the list if it doesn't exist
    const doesTileExist = selectedTiles.some(
      ([r, c]) => r === row && c === col
    );

    if (!doesTileExist) {
      setSelectedTiles([...selectedTiles, [row, col]]);
    }
  };

  const onRemoveSelectedTile = (row: number, col: number) => {
    // Add selected tile to the list if it doesn't exist
    const doesTileExist = selectedTiles.some(
      ([r, c]) => r === row && c === col
    );

    if (doesTileExist) {
      setSelectedTiles(
        selectedTiles.filter(([r, c]) => !(r === row && c === col))
      );
    }
  };

  const onResetSelection = () => {
    setSelectedTiles([]);
  };

  const onSetTileType = (tileType: TILE_TYPE) => {
    const newRoomMatrix = roomMatrix.map((row, rowIndex) =>
      row.map((tile, colIndex) => {
        const isSelected = selectedTiles.some(
          ([row, col]) => row === rowIndex && col === colIndex
        );

        if (isSelected) {
          return tileType;
        }

        return tile;
      })
    );

    // setSelectedTiles([]);
    setRoomMatrix(newRoomMatrix);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-5">Room Visualizer</h2>
      <p className="mb-5">Selected tiles: {selectedTiles.length}</p>
      <div className="flex mb-5">
        <button
          disabled={selectedTiles.length === 0}
          onClick={onResetSelection}
        >
          Reset selection
        </button>
        <button
          disabled={selectedTiles.length === 0}
          onClick={() => onSetTileType(TILE_TYPE.NULL)}
        >
          Set to Null
        </button>
        <button
          disabled={selectedTiles.length === 0}
          onClick={() => onSetTileType(TILE_TYPE.FLOOR)}
        >
          Set to Floor
        </button>
        <button
          disabled={selectedTiles.length === 0}
          onClick={() => onSetTileType(TILE_TYPE.WALL)}
        >
          Set to Wall
        </button>
        <button
          disabled={selectedTiles.length === 0}
          onClick={() => onSetTileType(TILE_TYPE.DOOR)}
        >
          Set to Door
        </button>
      </div>

      <div
        ref={roomRef}
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
              selected={selectedTiles.some(
                ([row, col]) => row === rowIndex && col === colIndex
              )}
              onSelect={() => onAddSelectedTile(rowIndex, colIndex)}
              onUnselect={() => onRemoveSelectedTile(rowIndex, colIndex)}
              displayOutline={displayGrid}
              isLeftMouseDown={isLeftMouseDown}
            />
          ))
        )}
      </div>
    </div>
  );
};

const Tile: FC<{
  size: number;
  selected: boolean;
  onSelect: () => void;
  onUnselect?: () => void;
  displayOutline: boolean;
  isLeftMouseDown: boolean;
  tileType: TILE_TYPE;
}> = ({
  size,
  selected,
  onSelect,
  onUnselect,
  displayOutline,
  isLeftMouseDown = false,
  tileType = TILE_TYPE.FLOOR,
}) => {
  return (
    <div
      className="relative"
      style={{ width: size, height: size, padding: 1 }}
      onMouseOver={() => (isLeftMouseDown && !selected ? onSelect() : null)}
      onClick={selected ? onUnselect : onSelect}
    >
      <div
        className={clsx('relative w-full h-full', {
          border: displayOutline,
          'border-none': tileType === TILE_TYPE.NULL,
          'border-white': tileType === TILE_TYPE.FLOOR,
          'border-red-600': tileType === TILE_TYPE.WALL,
          'border-2 border-yellow-300': tileType === TILE_TYPE.DOOR,
        })}
      >
        <div
          className={clsx('relative w-full h-full', {
            'bg-white bg-opacity-10': selected,
          })}
        ></div>
      </div>
    </div>
  );
};
