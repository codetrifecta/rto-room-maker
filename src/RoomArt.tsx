import { FC, useEffect, useRef } from 'react';
import { useAppStore } from './store';

export const RoomArt: FC<{
  width: number;
  height: number;
  imgSrc: string;
  defaultImgSrc?: string;
  disabled?: boolean;
  grayscale?: boolean;
}> = ({
  width,
  height,
  imgSrc,
  defaultImgSrc = '',
  disabled = false,
  grayscale,
}) => {
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

    context.reset();

    const image = new Image();

    if (!imgSrc) {
      if (defaultImgSrc) {
        imgSrc = defaultImgSrc;
      }
    }

    if (disabled) {
      imgSrc = '';
    }

    image.src = imgSrc;

    image.onload = function () {
      if (!context) return;

      context.imageSmoothingEnabled = false;

      if (grayscale) {
        context.filter = 'grayscale(1)';
      }

      const width = (image.naturalWidth / 16) * tileSize;
      const height = (image.naturalHeight / 16) * tileSize;

      context.drawImage(image, 0, 0, width, height);
    };
  }, [canvasRef.current, width, height, imgSrc, grayscale, disabled]);

  return (
    <canvas
      className="relative"
      ref={canvasRef}
      width={width}
      height={height}
    ></canvas>
  );
};
