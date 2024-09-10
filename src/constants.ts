export const DEFAULT_ROOM_LENGTH = 15;
export const DEFAULT_TILE_SIZE = 48;

export enum TILE_TYPE {
  NULL = 0,
  FLOOR = 1,
  OBSTACLE = 2,
  WALL = 3,
  DOOR = 4,
  CHEST = 5,
}

export const enum FILE_TYPE {
  FLOOR = 'floor',
  OBSTACLE = 'obstacle',
  WALL = 'wall',
  DOOR = 'door',
}
