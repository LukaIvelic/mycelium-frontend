import { useEffect, useState } from 'react';

export function useProjectGraphMounted(): boolean {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
