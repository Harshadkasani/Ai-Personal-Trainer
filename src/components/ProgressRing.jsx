// Circular progress indicator drawn with SVG
export default function ProgressRing({ value, max, label, unit, color = 'var(--accent)' }) {
  const r = 40, c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <div className="ring">
      <svg viewBox="0 0 100 100" width="110" height="110">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border)" strokeWidth="9" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct)} transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset .6s' }} />
        <text x="50" y="54" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text)">{Math.round(pct * 100)}%</text>
      </svg>
      <strong>{label}</strong>
      <small>{value} / {max} {unit}</small>
    </div>
  );
}
