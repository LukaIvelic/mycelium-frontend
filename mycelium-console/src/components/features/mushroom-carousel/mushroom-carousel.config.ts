import type { MushroomImageStyle } from './mushroom-carousel.types';

export const MUSHROOM_IMAGE_BASE_PATH = '/console/images/shrooms/';
export const MUSHROOM_IMAGE_COUNT = 6;
export const MUSHROOM_IMAGE_FIRST_NUMBER = 1;
export const MUSHROOM_FIRST_VISIBLE_INDEX = 0;
export const MUSHROOM_DISPLAY_TIME_MS = 500;
export const MUSHROOM_IMAGE_SIZE = 100;
export const MUSHROOM_EAGER_LOADING = 'eager';
export const MUSHROOM_LAZY_LOADING = 'lazy';

function createMushroomHref(_: unknown, index: number): string {
  const imageNumber = index + MUSHROOM_IMAGE_FIRST_NUMBER;
  return `${MUSHROOM_IMAGE_BASE_PATH}shroom_${imageNumber}.svg`;
}

export const MUSHROOM_HREFS = Array.from(
  { length: MUSHROOM_IMAGE_COUNT },
  createMushroomHref,
);

export function getMushroomImageStyle(isActive: boolean): MushroomImageStyle {
  const display = isActive ? 'block' : 'none';

  return {
    display,
    height: 'auto',
  };
}
