import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { shortDate } from '../utils/helpers';

// data: [{ date, <dataKey>: number }]
export default function WeightChart({ data, dataKey = 'kg', unit = '' }) {
  if (!data.length) return <p className="empty">No data yet. Add your first entry in the Progress page.</p>;
  const rows = data.map((d) => ({ ...d, name: shortDate(d.date) }));
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={rows}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="var(--muted)" fontSize={12} />
        <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="var(--muted)" fontSize={12} unit={unit} width={55} />
        <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8 }} />
        <Line type="monotone" dataKey={dataKey} stroke="var(--accent)" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
