export function statusCodeColor(code: number): string {
  if (code >= 500) return 'text-red-400';
  if (code >= 400) return 'text-orange-400';
  if (code >= 300) return 'text-yellow-400';
  if (code >= 200) return 'text-green-400';
  if (code >= 100) return 'text-blue-400';
  return 'text-foreground';
}
