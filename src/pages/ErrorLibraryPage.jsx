import { BookOpen, Search } from 'lucide-react';

// ================================================================
//  ErrorLibraryPage – Placeholder for Phase 2
// ================================================================

const ERROR_TYPES = [
  { emoji: '🟡', name: 'Syntax Error', desc: 'Typos, missing colons, brackets', count: 12 },
  { emoji: '🔴', name: 'Runtime Error', desc: 'Crashes during program execution', count: 8 },
  { emoji: '🟣', name: 'Logic Error', desc: 'Wrong output, no crash', count: 5 },
  { emoji: '🔵', name: 'Type Error', desc: 'Wrong data type operations', count: 9 },
  { emoji: '🟤', name: 'Name Error', desc: 'Undefined variable or function', count: 6 },
  { emoji: '⚪', name: 'Index / Bounds Error', desc: 'Accessing invalid array position', count: 7 },
];

export default function ErrorLibraryPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Error Library</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Browse common error types across all supported languages</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {ERROR_TYPES.map((err) => (
          <div key={err.name} className="card" style={{ cursor: 'default' }}>
            <div className="card-body" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{err.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{err.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{err.desc}</div>
                <div style={{ fontSize: 11, color: 'var(--accent-purple)', fontWeight: 600 }}>{err.count} examples</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 32,
        padding: 24,
        background: 'rgba(99,102,241,0.06)',
        border: '1px dashed rgba(99,102,241,0.25)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
      }}>
        <BookOpen size={32} color="var(--accent-blue)" style={{ marginBottom: 12 }} />
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Searchable library with detailed explanations coming in <strong style={{ color: 'var(--accent-purple)' }}>Phase 2</strong>.
        </p>
      </div>
    </div>
  );
}
