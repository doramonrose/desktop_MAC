import { useState, useEffect } from 'react';

export function getNormalizedPath(): string {
  if (typeof window === 'undefined') return '/';
  let path = window.location.pathname;
  if (!path.endsWith('/') && !path.includes('.')) {
    path += '/';
  }
  return path;
}

export function navigateTo(path: string) {
  if (typeof window === 'undefined') return;
  
  // Format path cleanly with trailing slash unless static asset
  let formattedPath = path;
  if (!formattedPath.endsWith('/') && !formattedPath.includes('.') && !formattedPath.includes('#')) {
    formattedPath += '/';
  }

  window.history.pushState({}, '', formattedPath);
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function usePathname(): string {
  const [pathname, setPathname] = useState<string>(getNormalizedPath());

  useEffect(() => {
    const handlePopState = () => {
      setPathname(getNormalizedPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return pathname;
}
