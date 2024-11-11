import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

interface HeroProps {
  onBookRide: () => void;
}

export function Hero({ onBookRide }: HeroProps) {
  const { t } = useTranslation();

  return (
    <div id="hero" className="relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&q=80"
          alt="Luxembourg City"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/75"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="space-x-4">
            <button 
              onClick={onBookRide}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              {t('hero.bookRide')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}