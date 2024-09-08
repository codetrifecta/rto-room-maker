import { create } from 'zustand';
import { DEFAULT_ROOM_LENGTH, DEFAULT_TILE_SIZE } from './constants';

interface AppStore {
  roomLength: number;
  setRoomLength: (roomLength: number) => void;

  tileSize: number;
  setTileSize: (tileSize: number) => void;

  displayGrid: boolean;
  setDisplayGrid: (displayGrid: boolean) => void;

  roomMatrix: number[][];
  setRoomMatrix: (roomMatrix: number[][]) => void;

  selectedTiles: [number, number][];
  setSelectedTiles: (selectedTiles: [number, number][]) => void;

  isLeftMouseDown: boolean;
  setIsLeftMouseDown: (isLeftMouseDown: boolean) => void;

  isRightMouseDown: boolean;
  setIsRightMouseDown: (isRightMouseDown: boolean) => void;

  file: string;
  setFile: (file: string) => void;

  fileArtRoomFloor: string;
  setFileArtRoomFloor: (fileArtRoomFloor: string) => void;

  fileArtRoomFloorDisabled: boolean;
  setArtRoomFloorDisabled: (fileArtRoomFloorDisabled: boolean) => void;

  fileArtRoomObstacle: string;
  setFileArtRoomObstacle: (fileArtRoomObstacle: string) => void;

  fileArtRoomObstacleDisabled: boolean;
  setArtRoomObstacleDisabled: (fileArtRoomObstacleDisabled: boolean) => void;

  fileArtRoomWall: string;
  setFileArtRoomWall: (fileArtRoomWall: string) => void;

  fileArtRoomWallDisabled: boolean;
  setArtRoomWallDisabled: (fileArtRoomWallDisabled: boolean) => void;

  fileArtRoomDoor: string;
  setFileArtRoomDoor: (fileArtRoomDoor: string) => void;

  fileArtRoomDoorDisabled: boolean;
  setArtRoomDoorDisabled: (fileArtRoomDoorDisabled: boolean) => void;
}

const DEFAULT_ROOM_MATRIX = Array.from({ length: DEFAULT_ROOM_LENGTH }, () =>
  Array.from({ length: DEFAULT_ROOM_LENGTH }, () => 0)
);

export const useAppStore = create<AppStore>((set) => ({
  roomLength: DEFAULT_ROOM_LENGTH,
  setRoomLength: (roomLength: number) => {
    set({ roomLength });
  },

  tileSize: DEFAULT_TILE_SIZE,
  setTileSize: (tileSize: number) => {
    set({ tileSize });
  },

  displayGrid: true,
  setDisplayGrid: (displayGrid: boolean) => {
    set({ displayGrid });
  },

  roomMatrix: DEFAULT_ROOM_MATRIX,
  setRoomMatrix: (roomMatrix: number[][]) => {
    set({ roomMatrix });
  },

  selectedTiles: [],
  setSelectedTiles: (selectedTiles: [number, number][]) => {
    set({ selectedTiles });
  },

  isLeftMouseDown: false,
  setIsLeftMouseDown: (isLeftMouseDown: boolean) => {
    set({ isLeftMouseDown });
  },

  isRightMouseDown: false,
  setIsRightMouseDown: (isRightMouseDown: boolean) => {
    set({ isRightMouseDown });
  },

  file: '',
  setFile: (file: string) => {
    set({ file });
  },

  fileArtRoomFloor: '',
  setFileArtRoomFloor: (fileArtRoomFloor: string) => {
    set({ fileArtRoomFloor });
  },

  fileArtRoomFloorDisabled: false,
  setArtRoomFloorDisabled: (fileArtRoomFloorDisabled: boolean) => {
    set({ fileArtRoomFloorDisabled });
  },

  fileArtRoomObstacle: '',
  setFileArtRoomObstacle: (fileArtRoomObstacle: string) => {
    set({ fileArtRoomObstacle });
  },

  fileArtRoomObstacleDisabled: false,
  setArtRoomObstacleDisabled: (fileArtRoomObstacleDisabled: boolean) => {
    set({ fileArtRoomObstacleDisabled });
  },

  fileArtRoomWall: '',
  setFileArtRoomWall: (fileArtRoomWall: string) => {
    set({ fileArtRoomWall });
  },

  fileArtRoomWallDisabled: false,
  setArtRoomWallDisabled: (fileArtRoomWallDisabled: boolean) => {
    set({ fileArtRoomWallDisabled });
  },

  fileArtRoomDoor: '',
  setFileArtRoomDoor: (fileArtRoomDoor: string) => {
    set({ fileArtRoomDoor });
  },

  fileArtRoomDoorDisabled: false,
  setArtRoomDoorDisabled: (fileArtRoomDoorDisabled: boolean) => {
    set({ fileArtRoomDoorDisabled });
  },
}));
