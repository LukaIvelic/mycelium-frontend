interface CenteredProps {
  children: React.ReactNode;
}

export function Centered({ children }: CenteredProps) {
  return <div className="w-300 h-full mx-auto py-12 px-6">{children}</div>;
}
