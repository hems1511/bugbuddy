import { Code2 } from 'lucide-react';
import { SAMPLE_EXAMPLES, LANGUAGES } from '../data/sampleData';
import { useState } from 'react';

// ================================================================
//  CodeSnippetsPage – Shows sample code snippets per language
// ================================================================

export default function CodeSnippetsPage({ addToast }) {
  const [expanded, setExpanded] = useState(null);

  function copySnippet(code) {
    navigator.clipboard.writeText(code).then(() => {
      if (addToast) addToast('Snippet copied!', 'success');
    });
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Code Snippets</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Example buggy code and errors for each language</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {LANGUAGES.map((lang) => {
          const ex = SAMPLE_EXAMPLES[lang.id];
          const isOpen = expanded === lang.id;
          return (
            <div key={lang.id} className="card">
              <div
                className="card-header"
                style={{ cursor: 'pointer' }}
                onClick={() => setExpanded(isOpen ? null : lang.id)}
              >
                <div className="card-title-group">
                  <span style={{ fontSize: 24 }}>{lang.emoji}</span>
                  <div>
                    <div className="card-title">{lang.label}</div>
                    <div className="card-subtitle">Tap to {isOpen ? 'collapse' : 'expand'} snippet</div>
                  </div>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: 18 }}>{isOpen ? '▲' : '▼'}</span>
              </div>

              {isOpen && (
                <div className="card-body">
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>Code</p>
                  <div className="code-block-wrapper" style={{ marginBottom: 16 }}>
                    <div className="code-block-header">
                      <div className="code-block-dots">
                        <span className="dot dot-red" /><span className="dot dot-yellow" /><span className="dot dot-green" />
                      </div>
                      <span className="code-block-lang">{lang.label}</span>
                      <button className="btn btn-sm btn-secondary" onClick={() => copySnippet(ex.code)}>Copy</button>
                    </div>
                    <div className="code-block"><pre>{ex.code}</pre></div>
                  </div>

                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-rose)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>Error Message</p>
                  <div className="code-block-wrapper">
                    <div className="code-block" style={{ background: 'rgba(244,63,94,0.05)' }}>
                      <pre style={{ color: '#fda4af' }}>{ex.error}</pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
