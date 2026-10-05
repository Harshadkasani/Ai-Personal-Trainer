export default function StatCard({ icon, label, value, sub }) {
  return (
    <div className="card stat">
      <span className="stat-icon">{icon}</span>
      <div><small>{label}</small><h3>{value}</h3>{sub && <small>{sub}</small>}</div>
    </div>
  );
}
