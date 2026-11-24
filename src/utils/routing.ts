import type { Language } from '../types';

export type AppRoute = '/' | '/privacy' | '/terms';

export function getCurrentRoute(): AppRoute {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return path === '/privacy' || path === '/terms' ? path : '/';
}
