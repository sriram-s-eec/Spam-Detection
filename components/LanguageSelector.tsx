
import React from 'react';
import { LANGUAGES } from '../constants';
import { LanguageOption } from '../types';

interface Props {
  currentLang: string;
  onSelect: (lang: string) => void;
  filterCodes?: string[];
}

const LanguageSelector: React.FC<Props> = ({ currentLang, onSelect, filterCodes }) => {
  const displayedLanguages = filterCodes 
    ? LANGUAGES.filter(l => filterCodes.includes(l.code))
    : LANGUAGES;

  return (
    <div className="grid grid-cols-2 gap-2 mb-6">
      {displayedLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onSelect(lang.code)}
          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 border ${
            currentLang === lang.code
              ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="text-lg">{lang.flag}</span>
          <span className="truncate">{lang.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
