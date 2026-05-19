export function formatLogOriginLabel(origin: string): string {
  try {
    const url = new URL(origin);
    return url.host;
  } catch {
    return origin;
  }
}
