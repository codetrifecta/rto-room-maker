import { create } from 'zustand';

interface AppStore {
  roomLength: number;
  setRoomLength: (roomLength: number) => void;

  tileSize: number;
  setTileSize: (tileSize: number) => void;

  displayGrid: boolean;
  setDisplayGrid: (displayGrid: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  roomLength: 11,
  setRoomLength: (roomLength: number) => {
    set({ roomLength });
  },

  tileSize: 48,
  setTileSize: (tileSize: number) => {
    set({ tileSize });
  },

  displayGrid: true,
  setDisplayGrid: (displayGrid: boolean) => {
    set({ displayGrid });
  },
}));
