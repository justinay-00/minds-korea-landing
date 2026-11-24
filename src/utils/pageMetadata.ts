import type { Language } from '../types';
import type { AppRoute } from './routing';

export function getPageMetadata(route: AppRoute, language: Language) {
  const description = language === 'ko'
    ? '마인즈는 당신의 일상을 함께하는 AI 파트너입니다. 번거로운 일은 덜고 필요한 순간 먼저 다가갑니다.'
    : 'Minds is your AI partner for everyday life, helping with the busywork and reaching out when you need a hand.';

  if (route === '/kr/privacy') {
    return {
      title: language === 'ko' ? '개인정보 처리방침 | Minds' : 'Privacy Policy | Minds',
      description,
    };
  }

  if (route === '/kr/terms') {
    return {
      title: language === 'ko' ? '이용약관 | Minds' : 'Terms of Use | Minds',
      description,
    };
  }

  if (route === '/not-found') {
    return {
      title: language === 'ko' ? '페이지를 찾을 수 없습니다 | Minds' : 'Page Not Found | Minds',
      description,
    };
  }

  return {
    title: language === 'ko'
      ? '마인즈 (Minds) — 당신의 일상을 함께 움직이는 AI'
      : 'Minds — Your AI partner for everyday life',
    description,
  };
}
