import { useApp } from '../context/AppContext';
import { translations } from '../translations';

export function useTranslation() {
  const { language } = useApp();

  const t = (key: string): string => {
    if (!translations[language.code] || !translations[language.code][key]) {
      console.warn(`Translation missing for key: ${key} in language: ${language.code}`);
      return key;
    }
    return translations[language.code][key];
  };

  return { t };
}