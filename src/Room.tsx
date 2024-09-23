import { FC, useEffect, useRef } from 'react';
import { useAppStore } from './store';
import clsx from 'clsx';
import { TILE_TYPE } from './constants';
import { RoomArt } from './RoomArt';

import room_tutorial_floor from './assets/room_tutorial_floor.png';
import room_tutorial_obstacle from './assets/room_tutorial_obstacle.png';
import room_tutorial_wall from './assets/room_tutorial_wall.png';
import room_tutorial_door from './assets/room_tutorial_door.png';

export const Room: FC = () => {
  const {
    fileArtRoomFloor,
    fileArtRoomObstacle,
    fileArtRoomWall,
    fileArtRoomDoor,
    roomLength,
    tileSize,
    displayGrid,
    roomMatrix,
    selectedTiles,
    isLeftMouseDown,
    fileArtRoomFloorDisabled,
    fileArtRoomObstacleDisabled,
    fileArtRoomWallDisabled,
    fileArtRoomDoorDisabled,
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

  // console.log('roomMatrix', roomMatrix);

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-3">Tile - Art Visualizer</h2>
      <p className="mb-3">Selected tiles: {selectedTiles.length}</p>
      <div className="flex mb-3">
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
          onClick={() => onSetTileType(TILE_TYPE.OBSTACLE)}
        >
          Set to Obstacle
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
        <button
          disabled={selectedTiles.length === 0}
          onClick={() => onSetTileType(TILE_TYPE.CHEST)}
        >
          Set to Chest
        </button>
      </div>

      <div
        className="relative"
        style={{ width: roomLength * tileSize, height: roomLength * tileSize }}
      >
        <div
          ref={roomRef}
          className="absolute top-0 left-0 grid z-10"
          style={{
            gridTemplateColumns: `repeat(${roomLength}, ${tileSize}px)`,
            gridTemplateRows: `repeat(${roomLength}, ${tileSize}px)`,
          }}
        >
          {roomMatrix.map((row, rowIndex) =>
            row.map((tileType, colIndex) => (
              <Tile
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
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

        <div className="absolute top-0 left-0">
          <RoomArt
            width={roomLength * tileSize}
            height={roomLength * tileSize}
            imgSrc={fileArtRoomFloor}
            grayscale={false}
            disabled={fileArtRoomFloorDisabled}
            defaultImgSrc={room_tutorial_floor}
          />
        </div>
        <div className="absolute top-0 left-0 z-[1]">
          <RoomArt
            width={roomLength * tileSize}
            height={roomLength * tileSize}
            imgSrc={fileArtRoomWall}
            grayscale={false}
            disabled={fileArtRoomWallDisabled}
            defaultImgSrc={room_tutorial_wall}
          />
        </div>
        <div className="absolute top-0 left-0 z-[2]">
          <RoomArt
            width={roomLength * tileSize}
            height={roomLength * tileSize}
            imgSrc={fileArtRoomDoor}
            grayscale={false}
            disabled={fileArtRoomDoorDisabled}
            defaultImgSrc={room_tutorial_door}
          />
        </div>
        <div className="absolute top-0 left-0 z-[3]">
          <RoomArt
            width={roomLength * tileSize}
            height={roomLength * tileSize}
            imgSrc={fileArtRoomObstacle}
            grayscale={false}
            disabled={fileArtRoomObstacleDisabled}
            defaultImgSrc={room_tutorial_obstacle}
          />
        </div>
      </div>
    </div>
  );
};

const Tile: FC<{
  size: number;
  row: number;
  col: number;
  selected: boolean;
  onSelect: () => void;
  onUnselect?: () => void;
  displayOutline: boolean;
  isLeftMouseDown: boolean;
  tileType: TILE_TYPE;
}> = ({
  size,
  row,
  col,
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
      style={{ width: size, height: size, padding: 2 }}
      onMouseOver={() => (isLeftMouseDown && !selected ? onSelect() : null)}
      onClick={selected ? onUnselect : onSelect}
    >
      <div
        className={clsx('group relative w-full h-full', {
          'border-2': displayOutline,
          'border-none': tileType === TILE_TYPE.NULL,
          'border-white': tileType === TILE_TYPE.FLOOR,
          'border-yellow-300': tileType === TILE_TYPE.OBSTACLE,
          'border-red-600': tileType === TILE_TYPE.WALL,
          'border-green-600': tileType === TILE_TYPE.DOOR,
          'border-pink-300': tileType === TILE_TYPE.CHEST,
        })}
      >
        <div
          className={clsx('relative w-full h-full', {
            'bg-white bg-opacity-50': selected,
          })}
        ></div>
        <div
          className="absolute top-[50%] left-[50%] invisible group-hover:visible"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {row + ',' + col}
        </div>
      </div>
    </div>
  );
};
