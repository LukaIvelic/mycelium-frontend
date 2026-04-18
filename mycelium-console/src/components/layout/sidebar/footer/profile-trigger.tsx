'use client';

import { EllipsisVertical } from 'lucide-react';

type ProfileTriggerProps = {
  fullName?: string;
  initials?: string;
  onClick: () => void;
};

export function ProfileTrigger({ fullName, initials, onClick }: ProfileTriggerProps) {
  return (
    <button
      type="button"
      className="flex h-12 w-full items-center justify-between rounded-lg px-3 transition-colors hover:bg-[#434343] hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d9d9d9] text-xs text-[#252525]">
          {initials}
        </div>
        <span className="text-[14px] font-medium">{fullName}</span>
      </div>
      <EllipsisVertical className="size-4 text-foreground/50" />
    </button>
  );
}
