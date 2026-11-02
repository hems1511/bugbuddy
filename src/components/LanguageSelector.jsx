import { LANGUAGES } from '../data/sampleData';

// ================================================================
//  LanguageSelector – Pill-style buttons to pick coding language
// ================================================================

export default function LanguageSelector({ selected, onSelect }) {
  return (
    <div className="language-grid" role="radiogroup" aria-label="Programming language selection">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.id}
          id={`lang-btn-${lang.id}`}
          className={`lang-btn ${selected === lang.id ? 'selected' : ''}`}
          onClick={() => onSelect(lang.id)}
          role="radio"
          aria-checked={selected === lang.id}
          title={`Select ${lang.label}`}
        >
          <span className="lang-emoji" aria-hidden="true">{lang.emoji}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
