import { useState, useCallback } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import { ToastContainer, useToast } from './components/Toast';
import AnalyzerPage from './pages/AnalyzerPage';
import RecentFixesPage from './pages/RecentFixesPage';
import ErrorLibraryPage from './pages/ErrorLibraryPage';
import CodeSnippetsPage from './pages/CodeSnippetsPage';
import SettingsPage from './pages/SettingsPage';

// ================================================================
//  Page titles for the top bar
// ================================================================
const PAGE_META = {
  analyzer: {
    title: 'Code Analyzer',
    subtitle: 'Paste code & error → get instant explanation + fix',
  },
  history: {
    title: 'Recent Fixes',
    subtitle: 'Your recently analyzed errors',
  },
  library: {
    title: 'Error Library',
    subtitle: 'Common error types with examples',
  },
  snippets: {
    title: 'Code Snippets',
    subtitle: 'Saved and example snippets',
  },
  settings: {
    title: 'Settings',
    subtitle: 'App preferences and configuration',
  },
};

// ================================================================
//  App – Root component with layout, routing, and toast
// ================================================================

export default function App() {
  const [activeNav, setActiveNav]     = useState('analyzer');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toasts, addToast }          = useToast();

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), []);

  const handleNavChange = useCallback((id) => {
    setActiveNav(id);
    setSidebarOpen(false); // close mobile sidebar on nav
  }, []);

  const meta = PAGE_META[activeNav] ?? PAGE_META.analyzer;

  function renderPage() {
    switch (activeNav) {
      case 'analyzer': return <AnalyzerPage addToast={addToast} />;
      case 'history':  return <RecentFixesPage />;
      case 'library':  return <ErrorLibraryPage />;
      case 'snippets': return <CodeSnippetsPage addToast={addToast} />;
      case 'settings': return <SettingsPage />;
      default:
        return (
          <div className="empty-state">
            <div className="empty-state-title">Coming Soon</div>
            <div className="empty-state-desc">This section is under development for Phase 2.</div>
          </div>
        );
    }
  }

  return (
    <div className="app-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="mobile-overlay"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={handleNavChange}
        isOpen={sidebarOpen}
      />

      {/* Main Content */}
      <main className="main-content" id="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Hamburger (mobile only) */}
            <button
              id="hamburger-btn"
              className="hamburger-btn"
              onClick={toggleSidebar}
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div className="topbar-left">
              <h1 className="topbar-title">{meta.title}</h1>
              <p className="topbar-subtitle">{meta.subtitle}</p>
            </div>
          </div>

          <div className="topbar-right">
            {/* Live status */}
            <div className="status-badge" aria-label="System status: Online">
              <span className="status-dot" aria-hidden="true" />
              Online
            </div>

            {/* Notification bell */}
            <button
              id="notifications-btn"
              className="topbar-icon-btn"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell size={16} />
            </button>
          </div>
        </header>

        {/* Page body */}
        <div className="page-body">
          {renderPage()}
        </div>
      </main>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
