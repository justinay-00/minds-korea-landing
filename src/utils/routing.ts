export type AppRoute = '/kr' | '/kr/privacy' | '/kr/terms' | '/not-found';

export function getCurrentRoute(): AppRoute {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/') {
    window.location.replace('/kr');
    return '/not-found';
  }

  if (path === '/kr' || path === '/kr/privacy' || path === '/kr/terms') {
    return path;
  }

  return '/not-found';
}
