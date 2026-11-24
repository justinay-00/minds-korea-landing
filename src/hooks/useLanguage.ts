import { useState } from 'react';
import type { Language } from '../types';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => (
    window.localStorage.getItem('minds-language') === 'en' ? 'en' : 'ko'
  ));

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem('minds-language', nextLanguage);
  };

  return { language, changeLanguage };
}
