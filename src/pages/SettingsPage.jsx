import { Settings, Bell, Palette, Globe, ShieldCheck } from 'lucide-react';

// ================================================================
//  SettingsPage – Placeholder for Phase 2
// ================================================================

const SETTING_SECTIONS = [
  { icon: Palette,    title: 'Appearance',          desc: 'Theme, font size, color accents',         comingSoon: true  },
  { icon: Bell,       title: 'Notifications',        desc: 'Analysis alerts and update preferences',  comingSoon: true  },
  { icon: Globe,      title: 'Language Preferences', desc: 'Default programming language',            comingSoon: false },
  { icon: ShieldCheck,title: 'Privacy & Data',       desc: 'How your code is handled',                comingSoon: true  },
];

export default function SettingsPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Settings</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Application preferences and configuration</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SETTING_SECTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="card">
              <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="card-icon blue" style={{ width: 40, height: 40 }}>
                  <Icon size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.desc}</div>
                </div>
                {s.comingSoon ? (
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: 'var(--accent-amber)',
                    background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
                    padding: '3px 10px', borderRadius: 99,
                  }}>
                    Phase 2
                  </span>
                ) : (
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: 'var(--accent-emerald)',
                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                    padding: '3px 10px', borderRadius: 99,
                  }}>
                    Available
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 32,
        padding: 24,
        background: 'rgba(99,102,241,0.06)',
        border: '1px dashed rgba(99,102,241,0.25)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
      }}>
        <Settings size={32} color="var(--accent-blue)" style={{ marginBottom: 12 }} />
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          Full settings panel with persistence coming in <strong style={{ color: 'var(--accent-purple)' }}>Phase 2</strong>.
        </p>
      </div>
    </div>
  );
}
