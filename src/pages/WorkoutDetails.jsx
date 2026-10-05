import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { completeExercise } from '../redux/slices/workoutSlice';
import { showToast } from '../redux/slices/uiSlice';
import useCountdown from '../hooks/useCountdown';
import { MUSCLE_ICONS } from '../data/exercises';

export default function WorkoutDetails() {
  const { day } = useParams();
  const dispatch = useDispatch();
  const { plan, sets, finished } = useSelector((s) => s.workout);
  const { left, start, stop } = useCountdown();
  const [weights, setWeights] = useState({}); // weight typed per exercise (kg)
  const d = plan[Number(day)];

  if (!d || d.rest) return <Navigate to="/app/plan" replace />;

  const complete = (e) => {
    const was = sets[`${day}:${e.id}`] || 0;
    dispatch(completeExercise({ day: Number(day), exerciseId: e.id, totalSets: e.sets }));
    if (was + 1 < e.sets) start(e.rest); else stop();
    dispatch(showToast(was + 1 >= e.sets ? `${e.name} complete! 🎉` : `Set ${was + 1} done`));
  };

  return (
    <>
      <Link to="/app/plan" className="back">← Back to plan</Link>
      <div className="row-between">
        <h1>{d.day}: {d.title}</h1>
        {finished[day] && <span className="badge big-badge pop">Workout complete! 🎉</span>}
      </div>
      {left > 0 && (
        <div className="card timer">⏱️ Rest: <b>{Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}</b>
          <button className="btn ghost" onClick={stop}>Skip</button></div>
      )}
      {d.exercises.map((e) => {
        const done = sets[`${day}:${e.id}`] || 0;
        return (
          <div key={e.id} className={`card ex ${done >= e.sets ? 'finished' : ''}`}>
            <div className="ex-art">{MUSCLE_ICONS[e.muscle]}</div>
            <div className="ex-body">
              <h3>{e.name}</h3>
              <small className="muted">Target: {e.muscle} · {e.difficulty} · {e.sets} sets × {e.reps} · {e.rest}s rest</small>
              <p>{e.tip}</p>
              <div className="dots">{Array.from({ length: e.sets }, (_, i) => <span key={i} className={i < done ? 'dot on' : 'dot'} />)}</div>
              <div className="ex-actions">
                <label>Weight (kg) <input type="number" min="0" value={weights[e.id] ?? ''} placeholder="0" onChange={(ev) => setWeights({ ...weights, [e.id]: ev.target.value })} /></label>
                <button className="btn" disabled={done >= e.sets} onClick={() => complete(e)}>{done >= e.sets ? 'Done ✓' : 'Complete Set'}</button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
