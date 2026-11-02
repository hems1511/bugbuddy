import { useEffect, useRef, useState } from 'react';
import { Zap, Bug, Code2, ShieldCheck } from 'lucide-react';
import { DASHBOARD_STATS } from '../data/sampleData';

// ================================================================
//  useCountUp
//  Counts from 0 → target only when `triggered` flips to a new
//  truthy value. Resets back to 0 whenever `triggered` is falsy.
// ================================================================
function useCountUp(target, triggered, duration = 1800, decimals = 0) {
  const [display, setDisplay] = useState(0);
  const rafRef   = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    // Cancel any running animation
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    // Not triggered yet → show 0
    if (!triggered) {
      setDisplay(0);
      return;
    }

    // Triggered → animate from 0 to target
    startRef.current = null;

    function step(timestamp) {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed  = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: fast start, smooth landing
      const eased   = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setDisplay(parseFloat(current.toFixed(decimals)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(target); // land exactly on target
      }
    }

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  // Re-run whenever triggered changes (each new analysis) or target changes
  }, [triggered, target, duration, decimals]);

  return display;
}

// ================================================================
//  StatCard – single animated KPI card
// ================================================================
const ICON_MAP = {
  zap:            Zap,
  bug:            Bug,
  'code-2':       Code2,
  'shield-check': ShieldCheck,
};

function StatCard({ stat, triggered, delay }) {
  // Stagger: each card starts `delay` ms after triggered fires
  const [localTrigger, setLocalTrigger] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!triggered) {
      // Reset immediately
      setLocalTrigger(null);
    } else {
      // Start after the stagger delay
      timerRef.current = setTimeout(() => {
        setLocalTrigger(triggered); // pass the trigger value through
      }, delay);
    }

    return () => clearTimeout(timerRef.current);
  }, [triggered, delay]);

  const count  = useCountUp(stat.target, localTrigger, 1800, stat.decimals);
  const Icon   = ICON_MAP[stat.icon] || Zap;

  // Format: commas for large integers, fixed decimals otherwise
  const formatted =
    stat.decimals > 0
      ? count.toFixed(stat.decimals)
      : Math.floor(count).toLocaleString();

  return (
    <div
      className="stat-card"
      aria-label={`${stat.label}: ${formatted}${stat.suffix}`}
    >
      <div className={`stat-icon ${stat.color}`} aria-hidden="true">
        <Icon size={18} />
      </div>
      <div className="stat-info">
        <div className="stat-value">
          {formatted}{stat.suffix}
        </div>
        <div className="stat-label">{stat.label}</div>
      </div>
    </div>
  );
}

// ================================================================
//  StatsBar
//  Props:
//    triggered – a value that changes each time analysis runs
//                (e.g. analyzeCount). Falsy = reset to 0.
// ================================================================
export default function StatsBar({ triggered }) {
  return (
    <div className="stats-bar" role="region" aria-label="Dashboard statistics">
      {DASHBOARD_STATS.map((stat, idx) => (
        <StatCard
          key={idx}
          stat={stat}
          triggered={triggered}
          delay={idx * 150}   /* stagger: 0 / 150 / 300 / 450 ms */
        />
      ))}
    </div>
  );
}
