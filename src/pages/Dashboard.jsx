import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StatCard from '../components/StatCard';
import WeightChart from '../components/WeightChart';
import { calcTargets, calcStreak, todayIndex, shortDate } from '../utils/helpers';

export default function Dashboard() {
  const p = useSelector((s) => s.profile.data);
  const { plan, finished, history } = useSelector((s) => s.workout);
  const { weights } = useSelector((s) => s.progress);
  const t = calcTargets(p);
  const today = todayIndex();
  const td = plan[today];
  const trainDays = plan.filter((d) => !d.rest).length;
  const done = Object.keys(finished).length;
  const pct = Math.round((done / trainDays) * 100);
  const current = weights.length ? weights[weights.length - 1].kg : p.weight;

  return (
    <>
      <h1>Welcome back, {p.name} 👋</h1>
      <p className="muted">Goal: {p.goal} · {p.experience} · {p.days} days/week</p>
      <div className="grid4">
        <StatCard icon="⚖️" label="Current weight" value={`${current} kg`} />
        <StatCard icon="🎯" label="Goal weight" value={`${t.goalWeight} kg`} />
        <StatCard icon="🔥" label="Calories target" value={`${t.calories} kcal`} />
        <StatCard icon="🥩" label="Protein target" value={`${t.protein} g`} />
      </div>
      <div className="grid2">
        <div className="card">
          <h3>Today's workout · {td.day}</h3>
          {td.rest ? <p className="empty">Rest day 😴 Recovery is when muscles grow. Light walking or stretching is great.</p> : <>
            <h2>{td.title}</h2>
            <p className="muted">{td.exercises.length} exercises · ~{td.minutes} min</p>
            <ul className="plain">{td.exercises.slice(0, 4).map((e) => <li key={e.id}>{e.name} — {e.sets} × {e.reps}</li>)}</ul>
            <Link className="btn" to={`/app/workout/${today}`}>{finished[today] ? 'Completed ✓ View' : 'Start Workout'}</Link>
          </>}
        </div>
        <div className="card">
          <h3>Weekly completion</h3>
          <div className="bar"><div style={{ width: `${pct}%` }} /></div>
          <p className="muted">{done} of {trainDays} workouts done ({pct}%)</p>
          <h3>🔥 Workout streak</h3>
          <h2>{calcStreak(history)} day{calcStreak(history) === 1 ? '' : 's'}</h2>
        </div>
      </div>
      <div className="grid2">
        <div className="card"><h3>Weight progress</h3><WeightChart data={weights} /></div>
        <div className="card"><h3>Recent workouts</h3>
          {history.length === 0 ? <p className="empty">No workouts completed yet. Finish today's session to see it here.</p> :
            <ul className="plain">{history.slice(0, 5).map((h, i) => <li key={i}>✅ {h.title} <small className="muted">· {shortDate(h.date)} · {h.minutes} min</small></li>)}</ul>}
        </div>
      </div>
    </>
  );
}
