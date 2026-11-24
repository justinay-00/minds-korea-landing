import type { Language } from '../types';
import type { AppRoute } from './routing';

export function getPageMetadata(route: AppRoute, language: Language) {
  const origin = 'https://join.hellominds.ai';
  const description = language === 'ko'
    ? '마인즈는 나를 기억하고 맡긴 일을 이어서 처리하는 개인 AI 파트너입니다. 확인이 필요한 순간 먼저 알려 드립니다.'
    : 'Minds is your personal AI partner that remembers you, continues assigned tasks, and reaches out when it needs your input.';

  if (route === '/kr/privacy') {
    return {
      title: language === 'ko' ? '개인정보 처리방침 | Minds' : 'Privacy Policy | Minds',
      description: language === 'ko'
        ? '마인즈 서비스의 개인정보 수집, 이용, 보관 및 보호에 관한 내용을 확인하세요.'
        : 'Learn how Minds collects, uses, stores, and protects personal information.',
      canonical: `${origin}/kr/privacy`,
    };
  }

  if (route === '/kr/terms') {
    return {
      title: language === 'ko' ? '이용약관 | Minds' : 'Terms of Use | Minds',
      description: language === 'ko'
        ? '마인즈 서비스 이용에 적용되는 약관과 사용자의 권리 및 책임을 확인하세요.'
        : 'Review the terms, rights, and responsibilities that apply to using Minds.',
      canonical: `${origin}/kr/terms`,
    };
  }

  if (route === '/not-found') {
    return {
      title: language === 'ko' ? '페이지를 찾을 수 없습니다 | Minds' : 'Page Not Found | Minds',
      description: language === 'ko' ? '요청하신 페이지를 찾을 수 없습니다.' : 'The requested page could not be found.',
      robots: 'noindex, nofollow',
    };
  }

  return {
    title: language === 'ko'
      ? '마인즈 (Minds) — 당신의 일상을 함께 움직이는 AI'
      : 'Minds — Your AI partner for everyday life',
    description,
    canonical: `${origin}/kr`,
  };
}
