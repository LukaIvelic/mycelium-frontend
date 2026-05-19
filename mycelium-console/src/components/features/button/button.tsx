'use client';

import Image from 'next/image';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import {
  BUTTON_CENTER_CONTENT_DEFAULT,
  BUTTON_ICON_SIZE,
  BUTTON_IMAGE_ALT,
  BUTTON_IMAGE_SIZE,
} from './button.config';
import type { ButtonProps } from './button.types';

export function Button({
  children,
  isLoading,
  imageSrc,
  icon: Icon,
  centerContent = BUTTON_CENTER_CONTENT_DEFAULT,
  className,
  ...rest
}: ButtonProps) {
  const hasLeadingVisual = Boolean(imageSrc || Icon);
  const shouldShiftButtonText = hasLeadingVisual && !centerContent;
  const buttonTextShiftClass = shouldShiftButtonText ? '-translate-x-5' : '';
  const loadingContentClass = isLoading ? 'justify-center' : 'justify-start';

  return (
    <button
      className={cn('mycelium-btn', className)}
      {...rest}
      disabled={isLoading}
    >
      {imageSrc && (
        <div className='mycelium-btn-icon-wrapper'>
          <Image
            src={imageSrc}
            fill
            sizes={BUTTON_IMAGE_SIZE}
            alt={BUTTON_IMAGE_ALT}
            className='mycelium-btn-image'
          />
        </div>
      )}

      {Icon && (
        <div className='mycelium-btn-icon-wrapper'>
          <Icon size={BUTTON_ICON_SIZE} />
        </div>
      )}

      <div
        className={cn(
          'mycelium-btn-text-wrapper',
          buttonTextShiftClass,
          loadingContentClass,
        )}
      >
        {isLoading && <Spinner />}
        {children}
      </div>
    </button>
  );
}
