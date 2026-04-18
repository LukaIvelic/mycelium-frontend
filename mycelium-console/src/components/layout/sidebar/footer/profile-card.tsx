'use client';

type ProfileCardProps = {
  fullName?: string;
  email?: string;
  initials?: string;
};

export function ProfileCard({ fullName, email, initials }: ProfileCardProps) {
  return (
    <div className="rounded-xl border border-[#3a3a3a] bg-[#2e2e2e] p-4 py-5">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d9d9d9] text-sm font-medium text-[#252525]">
          {initials}
        </div>
        <div className="text-center">
          <p className="text-sm text-[#f5f5f5]">{fullName}</p>
          <p className="text-sm text-[#a0a0a0]">{email}</p>
        </div>
      </div>
    </div>
  );
}
