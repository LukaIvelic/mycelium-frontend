'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface MushroomCarouselProps {
  className?: string;
}

const base_path = '/console/images/shrooms/';
const mushroom_hrefs = Array.from({ length: 6 }).map((_, index) => {
  return `${base_path}shroom_${index + 1}.svg`;
});

export function MushroomCarousel({ className }: MushroomCarouselProps) {
  const mushroomDisplayTimeMs = 500;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mushroom_hrefs.length);
    }, mushroomDisplayTimeMs);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={className}>
      {mushroom_hrefs.map((src, index) => {
        const altName = src.replace(base_path, '').replace('.svg', '');
        return (
          <Image
            src={src}
            width={100}
            height={100}
            alt={altName}
            loading={index === 0 ? 'eager' : 'lazy'}
            style={{
              display: activeIndex === index ? 'block' : 'none',
              height: 'auto',
            }}
            key={index}
          />
        );
      })}
    </div>
  );
}
