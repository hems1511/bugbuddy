import { Bug, Code2, BookOpen, History, Settings, Zap, ChevronRight, Star } from 'lucide-react';

// ================================================================
//  Sidebar – Navigation panel
// ================================================================

const NAV_ITEMS = [
  { icon: Zap,      label: 'Analyzer',      id: 'analyzer', badge: null },
  { icon: History,  label: 'Recent Fixes',  id: 'history',  badge: '3'  },
  { icon: BookOpen, label: 'Error Library', id: 'library',  badge: null },
  { icon: Code2,    label: 'Code Snippets', id: 'snippets', badge: null },
];

const TOOL_ITEMS = [
  { icon: Settings, label: 'Settings',   id: 'settings' },
];

export default function Sidebar({ activeNav, onNavChange, isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon" aria-hidden="true">
            <Bug size={18} color="#fff" strokeWidth={2.5} />
          </div>
          <div className="logo-text">
            <span className="logo-name">BugBuddy AI</span>
            <span className="logo-tagline">Code Error Explainer</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <span className="nav-section-label">Tools</span>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => onNavChange(item.id)}
              aria-current={activeNav === item.id ? 'page' : undefined}
            >
              <Icon className="nav-icon" size={16} />
              {item.label}
              {item.badge && (
                <span className="nav-badge" aria-label={`${item.badge} new`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <span className="nav-section-label" style={{ marginTop: 24 }}>System</span>

        {TOOL_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => onNavChange(item.id)}
            >
              <Icon className="nav-icon" size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer promo card */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-card">
          <Star size={20} color="#f59e0b" style={{ marginBottom: 8 }} />
          <p>
            Phase 1 MVP – Frontend only.
            <br />
            AI backend coming in Phase 2!
          </p>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
              color: 'var(--accent-purple)',
              fontWeight: 600,
              cursor: 'default',
            }}
          >
            Coming Soon <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </aside>
  );
}
