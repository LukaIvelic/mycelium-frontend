'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  getMushroomImageStyle,
  MUSHROOM_DISPLAY_TIME_MS,
  MUSHROOM_EAGER_LOADING,
  MUSHROOM_FIRST_VISIBLE_INDEX,
  MUSHROOM_HREFS,
  MUSHROOM_IMAGE_BASE_PATH,
  MUSHROOM_IMAGE_SIZE,
  MUSHROOM_LAZY_LOADING,
} from './mushroom-carousel.config';
import type { MushroomCarouselProps } from './mushroom-carousel.types';

export function MushroomCarousel({ className }: MushroomCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MUSHROOM_HREFS.length);
    }, MUSHROOM_DISPLAY_TIME_MS);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={className}>
      {MUSHROOM_HREFS.map((src, index) => {
        const altName = src
          .replace(MUSHROOM_IMAGE_BASE_PATH, '')
          .replace('.svg', '');
        const isActive = activeIndex === index;
        const loading =
          index === MUSHROOM_FIRST_VISIBLE_INDEX
            ? MUSHROOM_EAGER_LOADING
            : MUSHROOM_LAZY_LOADING;
        const imageStyle = getMushroomImageStyle(isActive);

        return (
          <Image
            src={src}
            width={MUSHROOM_IMAGE_SIZE}
            height={MUSHROOM_IMAGE_SIZE}
            alt={altName}
            loading={loading}
            style={imageStyle}
            key={src}
          />
        );
      })}
    </div>
  );
}
