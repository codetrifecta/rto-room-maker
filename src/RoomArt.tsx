import { FC, useEffect, useRef } from 'react';
import { useAppStore } from './store';

import defaultRoomArt from './assets/default-room.png';

export const RoomArt: FC<{
  width: number;
  height: number;
  imgSrc: string;
  grayscale?: boolean;
}> = ({ width, height, imgSrc, grayscale }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { tileSize } = useAppStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const image = new Image();

    if (!imgSrc) {
      imgSrc = defaultRoomArt;
    }

    image.src = imgSrc;

    image.onload = function () {
      if (!context) return;
      context.reset();
      context.imageSmoothingEnabled = false;

      if (grayscale) {
        context.filter = 'grayscale(1)';
      }

      const width = (image.naturalWidth / 16) * tileSize;
      const height = (image.naturalHeight / 16) * tileSize;

      context.drawImage(image, 0, 0, width, height);
    };
  }, [canvasRef.current, width, height, imgSrc, grayscale]);

  return (
    <canvas
      className="relative"
      ref={canvasRef}
      width={width}
      height={height}
    ></canvas>
  );
};
