import { useState, useCallback } from 'react';
import {
  Code2, AlertCircle, Zap, Trash2, BookOpen,
  Loader2, Sparkles,
} from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import AnalysisResults from '../components/AnalysisResults';
import StatsBar from '../components/StatsBar';
import { SAMPLE_EXAMPLES, SAMPLE_RESULTS } from '../data/sampleData';

// ================================================================
//  AnalyzerPage – Main workspace
// ================================================================

const ANALYZE_DELAY_MS = 1600; // simulated "AI thinking" time

export default function AnalyzerPage({ addToast }) {
  const [language, setLanguage]       = useState('python');
  const [code, setCode]               = useState('');
  const [errorMsg, setErrorMsg]       = useState('');
  const [result, setResult]           = useState(null);
  const [isLoading, setIsLoading]     = useState(false);
  const [copied, setCopied]           = useState(false);
  const [analysisCount, setAnalysisCount] = useState(0);

  // ── Handle Analyze ─────────────────────────────────────────
  const handleAnalyze = useCallback(() => {
    if (!code.trim()) {
      addToast('Please paste your source code first.', 'error');
      return;
    }
    if (!errorMsg.trim()) {
      addToast('Please paste the error message too.', 'error');
      return;
    }
    setIsLoading(true);
    setResult(null);

    // Simulate AI processing delay
    setTimeout(() => {
      const sample = SAMPLE_RESULTS[language];
      setResult(sample);
      setIsLoading(false);
      setAnalysisCount((c) => c + 1);
      addToast('Analysis complete! Sample results loaded.', 'success');
    }, ANALYZE_DELAY_MS);
  }, [code, errorMsg, language, addToast]);

  // ── Load Example ───────────────────────────────────────────
  const handleLoadExample = useCallback(() => {
    const example = SAMPLE_EXAMPLES[language];
    if (!example) return;
    setCode(example.code);
    setErrorMsg(example.error);
    setResult(null);
    addToast(`${language.charAt(0).toUpperCase() + language.slice(1)} example loaded!`, 'success');
  }, [language, addToast]);

  // ── Clear All ──────────────────────────────────────────────
  const handleClear = useCallback(() => {
    setCode('');
    setErrorMsg('');
    setResult(null);
    setCopied(false);
    setAnalysisCount(0);   // ← reset stats back to 0
    addToast('All inputs cleared.', 'success');
  }, [addToast]);

  // ── Copy Corrected Code ────────────────────────────────────
  const handleCopy = useCallback(() => {
    if (!result?.correctedCode) return;
    navigator.clipboard.writeText(result.correctedCode).then(() => {
      setCopied(true);
      addToast('Corrected code copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      addToast('Could not copy. Please select and copy manually.', 'error');
    });
  }, [result, addToast]);

  // ── Language change resets results ─────────────────────────
  const handleLanguageChange = useCallback((lang) => {
    setLanguage(lang);
    setResult(null);
    setCopied(false);
  }, []);

  const isReadyToAnalyze = code.trim().length > 0 && errorMsg.trim().length > 0;

  return (
    <div>
      {/* Stats Bar – triggered only after Analyze is clicked; resets on Clear All */}
      <StatsBar triggered={analysisCount} />

      {/* ── Input Grid ── */}
      <div className="analyzer-grid">

        {/* Card: Language + Source Code */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon blue" aria-hidden="true">
                <Code2 size={15} />
              </div>
              <div>
                <div className="card-title">Source Code</div>
                <div className="card-subtitle">Select language, then paste your code</div>
              </div>
            </div>
            <button
              id="load-example-btn"
              className="btn btn-ghost btn-sm"
              onClick={handleLoadExample}
              title="Load a sample code example"
              aria-label="Load example code"
            >
              <BookOpen size={13} />
              Load Example
            </button>
          </div>
          <div className="card-body">
            {/* Language Selector */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}
              >
                Programming Language
              </label>
              <LanguageSelector selected={language} onSelect={handleLanguageChange} />
            </div>

            <div className="section-divider" />

            {/* Code Textarea */}
            <div style={{ marginTop: 16 }}>
              <label
                htmlFor="code-input"
                style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}
              >
                Paste Your Code
              </label>
              <div className="textarea-wrapper">
                <textarea
                  id="code-input"
                  className="code-textarea"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`Paste your ${language} code here…\n\nExample:\n  def greet(name):\n      print("Hello " + name)`}
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                  aria-label="Source code input"
                />
              </div>
              <div className="textarea-footer">
                <span className="char-count">{code.length} characters</span>
                {code.length > 0 && (
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setCode('')}
                    aria-label="Clear code input"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card: Error Message */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon rose" aria-hidden="true">
                <AlertCircle size={15} />
              </div>
              <div>
                <div className="card-title">Error / Exception Message</div>
                <div className="card-subtitle">Paste the compiler or runtime error</div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <label
              htmlFor="error-input"
              style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}
            >
              Error Message
            </label>
            <textarea
              id="error-input"
              className="error-textarea"
              value={errorMsg}
              onChange={(e) => setErrorMsg(e.target.value)}
              placeholder={`Paste the full error message here…\n\nExample:\n  IndexError: list index out of range\n    File "main.py", line 4`}
              spellCheck={false}
              autoCorrect="off"
              aria-label="Error message input"
            />
            <div className="textarea-footer">
              <span className="char-count">{errorMsg.length} characters</span>
              {errorMsg.length > 0 && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setErrorMsg('')}
                  aria-label="Clear error message input"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Tips panel inside error card */}
            <div style={{
              marginTop: 20,
              background: 'rgba(99,102,241,0.06)',
              border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px 16px',
            }}>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--accent-purple)' }}>💡 Tip:</strong>{' '}
                Include the full stack trace for the most accurate analysis. The more detail you provide, the better!
              </p>
            </div>

            {/* Analysis counter */}
            {analysisCount > 0 && (
              <div style={{
                marginTop: 12,
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 12, color: 'var(--accent-emerald)',
              }}>
                <Sparkles size={13} />
                {analysisCount} analysis{analysisCount !== 1 ? 'es' : ''} run this session
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Action Bar ── */}
      <div className="action-bar">
        <div className="action-bar-left">
          <div className="action-bar-title">Ready to analyze?</div>
          <div className="action-bar-desc">
            {isReadyToAnalyze
              ? 'Both code and error message provided — click Analyze!'
              : 'Paste your code and error message above, then click Analyze Code.'}
          </div>
        </div>
        <div className="action-bar-right">
          <button
            id="clear-all-btn"
            className="btn btn-danger"
            onClick={handleClear}
            disabled={!code && !errorMsg && !result}
            title="Clear all inputs and results"
            aria-label="Clear all inputs"
          >
            <Trash2 size={15} />
            Clear All
          </button>
          <button
            id="analyze-btn"
            className="btn btn-primary btn-lg"
            onClick={handleAnalyze}
            disabled={isLoading}
            title="Analyze the code and error message"
            aria-label="Analyze code"
          >
            {isLoading ? (
              <>
                <div className="spinner" aria-hidden="true" />
                Analyzing…
              </>
            ) : (
              <>
                <Zap size={16} />
                Analyze Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Results ── */}
      {isLoading && (
        <div className="empty-state" aria-live="polite" aria-busy="true">
          <div className="empty-state-icon" style={{ animation: 'spin 1s linear infinite' }}>
            <Loader2 size={32} color="var(--accent-purple)" />
          </div>
          <div className="empty-state-title">Analyzing your code…</div>
          <div className="empty-state-desc">
            BugBuddy is reading your code and error message. This takes just a moment!
          </div>
        </div>
      )}

      {!isLoading && !result && (
        <div className="empty-state" aria-label="No analysis yet">
          <div className="empty-state-icon">
            <Zap size={32} />
          </div>
          <div className="empty-state-title">No Analysis Yet</div>
          <div className="empty-state-desc">
            Select a language, paste your code and error message above, then click{' '}
            <strong style={{ color: 'var(--accent-purple)' }}>Analyze Code</strong> to get a full breakdown.
          </div>
          <button
            id="empty-state-example-btn"
            className="btn btn-primary"
            onClick={handleLoadExample}
            aria-label="Load example code to try the analyzer"
          >
            <BookOpen size={15} />
            Try an Example
          </button>
        </div>
      )}

      {!isLoading && result && (
        <AnalysisResults
          result={result}
          language={language}
          onCopy={handleCopy}
          copied={copied}
        />
      )}
    </div>
  );
}
