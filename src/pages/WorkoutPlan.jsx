import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateWorkout } from '../redux/slices/workoutSlice';
import { showToast } from '../redux/slices/uiSlice';
import Loader from '../components/Loader';
import { todayIndex } from '../utils/helpers';

export default function WorkoutPlan() {
  const dispatch = useDispatch();
  const p = useSelector((s) => s.profile.data);
  const { plan, status, finished } = useSelector((s) => s.workout);

  const regenerate = async () => {
    await dispatch(generateWorkout(p));
    dispatch(showToast('New plan generated!'));
  };

  return (
    <>
      {status === 'loading' && <Loader text="Regenerating your plan…" />}
      <div className="row-between"><h1>Weekly Workout Plan</h1><button className="btn" onClick={regenerate}>🔄 Regenerate</button></div>
      <p className="muted">Split: {[...new Set(plan.filter((d) => !d.rest).map((d) => d.title))].join(' / ')} · Difficulty: {p.experience}</p>
      {p.injuries && <p className="note">Injury note applied: “{p.injuries}”. Related exercises were avoided where possible.</p>}
      <div className="grid3">
        {plan.map((d, i) => (
          <div key={d.day} className={`card hover ${i === todayIndex() ? 'today' : ''}`}>
            <div className="row-between"><h3>{d.day}</h3>{finished[i] && <span className="badge">Done ✓</span>}</div>
            {d.rest ? <p className="empty">Rest & recovery 😴</p> : <>
              <h2>{d.title}</h2>
              <small className="muted">~{d.minutes} min</small>
              <ol>{d.exercises.map((e) => <li key={e.id}>{e.name} — <b>{e.sets} × {e.reps}</b> <small className="muted">({e.rest}s rest · {e.muscle} · {e.difficulty})</small></li>)}</ol>
              <Link className="btn ghost" to={`/app/workout/${i}`}>Open</Link>
            </>}
          </div>
        ))}
      </div>
    </>
  );
}
