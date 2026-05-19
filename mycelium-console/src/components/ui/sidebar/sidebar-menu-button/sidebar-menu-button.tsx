'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { SidebarMenuButtonProps } from '../sidebar.types';
import { useSidebar } from '../sidebar-context';
import { sidebarMenuButtonVariants } from './sidebar-menu-button.variants';

export function SidebarMenuButton({
  render,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const { isMobile, state } = useSidebar();
  const tooltipProps = normalizeTooltip(tooltip);
  const renderedButton = useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      },
      props,
    ),
    render: tooltipProps ? <TooltipTrigger render={render} /> : render,
    state: {
      slot: 'sidebar-menu-button',
      sidebar: 'menu-button',
      size,
      active: isActive,
    },
  });

  if (!tooltipProps) {
    return renderedButton;
  }

  return (
    <Tooltip>
      {renderedButton}
      <TooltipContent
        side='right'
        align='center'
        hidden={state !== 'collapsed' || isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  );
}

function normalizeTooltip(tooltip: SidebarMenuButtonProps['tooltip']) {
  if (!tooltip) {
    return null;
  }

  if (typeof tooltip === 'string') {
    return { children: tooltip };
  }

  return tooltip;
}
