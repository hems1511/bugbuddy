import { History, Clock, Code2, Bug, ChevronRight } from 'lucide-react';

// ================================================================
//  RecentFixesPage – Placeholder for Phase 2
// ================================================================

const MOCK_HISTORY = [
  { lang: '🐍', langName: 'Python',     error: 'IndexError',            time: '2 min ago',  id: 'hist-1' },
  { lang: '🟨', langName: 'JavaScript', error: 'TypeError (null)',       time: '15 min ago', id: 'hist-2' },
  { lang: '☕', langName: 'Java',        error: 'NullPointerException',  time: '1 hr ago',   id: 'hist-3' },
];

export default function RecentFixesPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Recent Fixes</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Your last 3 analyzed errors this session</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {MOCK_HISTORY.map((item) => (
          <div key={item.id} className="card" style={{ cursor: 'default' }}>
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 28 }}>{item.lang}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                  {item.error}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.langName}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                <Clock size={12} />
                {item.time}
              </div>
              <ChevronRight size={16} color="var(--text-muted)" />
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
        <History size={32} color="var(--accent-blue)" style={{ marginBottom: 12 }} />
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Full history with search and filtering will be available in <strong style={{ color: 'var(--accent-purple)' }}>Phase 2</strong>.
        </p>
      </div>
    </div>
  );
}
