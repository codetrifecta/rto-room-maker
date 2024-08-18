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
}));
