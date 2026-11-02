import { useState } from 'react';
import {
  AlertTriangle, Lightbulb, Wrench, ShieldCheck, Copy, Check,
  ChevronRight, Info
} from 'lucide-react';
import { LANGUAGES } from '../data/sampleData';

// ================================================================
//  AnalysisResults – Displays the full breakdown of the error
// ================================================================

function CodeBlock({ code, language, onCopy, copied }) {
  const langLabel = LANGUAGES.find((l) => l.id === language)?.label ?? language;
  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div className="code-block-dots" aria-hidden="true">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <span className="code-block-lang">{langLabel}</span>
        <button
          id="copy-corrected-code-btn"
          className={`btn btn-sm ${copied ? 'btn-emerald' : 'btn-secondary'}`}
          onClick={onCopy}
          title="Copy corrected code"
          aria-label="Copy corrected code to clipboard"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="code-block">
        <pre aria-label="Corrected code">{code}</pre>
      </div>
    </div>
  );
}

function ConfidenceBar({ value }) {
  return (
    <div className="confidence-bar-wrapper">
      <div className="confidence-label">
        <span>AI Confidence</span>
        <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>{value}%</span>
      </div>
      <div className="confidence-bar-track" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <div className="confidence-bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function AnalysisResults({ result, language, onCopy, copied }) {
  if (!result) return null;

  const { errorType, errorTypeName, confidence, explanation, rootCause, correctedCode, tips } = result;

  return (
    <section className="results-grid" aria-label="Analysis results">
      {/* ── Row 1: Error Overview + Confidence ── */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon amber" aria-hidden="true">
              <AlertTriangle size={15} />
            </div>
            <div>
              <div className="card-title">Error Overview</div>
              <div className="card-subtitle">What type of error was detected</div>
            </div>
          </div>
          <span className="nav-badge" style={{ background: 'rgba(245,158,11,0.15)', color: 'var(--accent-amber)', border: '1px solid rgba(245,158,11,0.3)' }}>
            Sample Result
          </span>
        </div>
        <div className="card-body">
          <div className="info-row">
            <span className="info-label">Error Type</span>
            <span>
              <span className={`error-type-badge ${errorType}`} aria-label={`Error type: ${errorTypeName}`}>
                <ChevronRight size={12} />
                {errorTypeName}
              </span>
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Severity</span>
            <span className="info-value" style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>
              🔴 Critical – Program cannot run
            </span>
          </div>
          <div className="info-row" style={{ borderBottom: 'none' }}>
            <ConfidenceBar value={confidence} />
          </div>
        </div>
      </div>

      {/* ── Simple Explanation ── */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon blue" aria-hidden="true">
              <Lightbulb size={15} />
            </div>
            <div>
              <div className="card-title">Simple Explanation</div>
              <div className="card-subtitle">In plain English, no jargon</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(99,102,241,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: 2,
            }} aria-hidden="true">
              <Info size={16} color="var(--accent-blue)" />
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {explanation}
            </p>
          </div>
        </div>
      </div>

      {/* ── Root Cause ── */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon rose" aria-hidden="true">
              <AlertTriangle size={15} />
            </div>
            <div>
              <div className="card-title">Root Cause</div>
              <div className="card-subtitle">Why exactly this happened</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {rootCause}
          </p>
        </div>
      </div>

      {/* ── Prevention Tips ── */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon emerald" aria-hidden="true">
              <ShieldCheck size={15} />
            </div>
            <div>
              <div className="card-title">Prevention Tips</div>
              <div className="card-subtitle">How to avoid this in future</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <ul className="tips-list" aria-label="Prevention tips">
            {tips.map((tip, i) => (
              <li key={i}>
                <span className="tip-bullet" aria-hidden="true">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Corrected Code (full width) ── */}
      <div className="card result-full-width">
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon cyan" aria-hidden="true">
              <Wrench size={15} />
            </div>
            <div>
              <div className="card-title">Corrected Code</div>
              <div className="card-subtitle">Fixed version with inline comments</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <CodeBlock
            code={correctedCode}
            language={language}
            onCopy={onCopy}
            copied={copied}
          />
        </div>
      </div>
    </section>
  );
}
