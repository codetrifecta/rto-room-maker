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
}));
