import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWeight, updateProgress } from '../redux/slices/progressSlice';
import { showToast } from '../redux/slices/uiSlice';
import WeightChart from '../components/WeightChart';
import { shortDate } from '../utils/helpers';

export default function Progress() {
  const dispatch = useDispatch();
  const { weights, measurements, prs } = useSelector((s) => s.progress);
  const [kg, setKg] = useState('');
  const [m, setM] = useState({ chest: '', waist: '', arms: '' });
  const [pr, setPr] = useState({ exercise: '', weight: '', reps: '' });
  const bad = (v) => v === '' || Number(v) <= 0;

  const addWeight = (e) => {
    e.preventDefault();
    if (bad(kg)) return dispatch(showToast('Enter a valid weight.', 'error'));
    dispatch(updateWeight(kg)); setKg(''); dispatch(showToast('Weight logged'));
  };
  const addMeasure = (e) => {
    e.preventDefault();
    if (bad(m.chest) || bad(m.waist) || bad(m.arms)) return dispatch(showToast('Fill in all three measurements.', 'error'));
    dispatch(updateProgress({ type: 'measurement', chest: +m.chest, waist: +m.waist, arms: +m.arms }));
    setM({ chest: '', waist: '', arms: '' }); dispatch(showToast('Measurements saved'));
  };
  const addPr = (e) => {
    e.preventDefault();
    if (!pr.exercise.trim() || bad(pr.weight) || bad(pr.reps)) return dispatch(showToast('Fill in exercise, weight and reps.', 'error'));
    dispatch(updateProgress({ type: 'pr', exercise: pr.exercise.trim(), weight: +pr.weight, reps: +pr.reps }));
    setPr({ exercise: '', weight: '', reps: '' }); dispatch(showToast('Personal record saved 🏆'));
  };

  return (
    <>
      <h1>Progress Tracking</h1>
      <div className="grid2">
        <div className="card"><h3>Weight progress</h3><WeightChart data={weights} />
          <form className="inline" onSubmit={addWeight}><input type="number" step="0.1" placeholder="Weight (kg)" value={kg} onChange={(e) => setKg(e.target.value)} /><button className="btn">Log weight</button></form>
        </div>
        <div className="card"><h3>Waist (cm)</h3><WeightChart data={measurements} dataKey="waist" />
          <form className="inline" onSubmit={addMeasure}>
            {['chest', 'waist', 'arms'].map((k) => <input key={k} type="number" placeholder={`${k} cm`} value={m[k]} onChange={(e) => setM({ ...m, [k]: e.target.value })} />)}
            <button className="btn">Save</button></form>
        </div>
      </div>
      <div className="card"><h3>Workout performance & personal records</h3>
        <form className="inline" onSubmit={addPr}>
          <input placeholder="Exercise (e.g. Bench Press)" value={pr.exercise} onChange={(e) => setPr({ ...pr, exercise: e.target.value })} />
          <input type="number" placeholder="kg" value={pr.weight} onChange={(e) => setPr({ ...pr, weight: e.target.value })} />
          <input type="number" placeholder="reps" value={pr.reps} onChange={(e) => setPr({ ...pr, reps: e.target.value })} />
          <button className="btn">Add PR</button>
        </form>
        {prs.length === 0 ? <p className="empty">No records yet. Log your first personal best!</p> :
          <table><thead><tr><th>Exercise</th><th>Weight</th><th>Reps</th><th>Date</th></tr></thead>
            <tbody>{prs.map((r, i) => <tr key={i}><td>{r.exercise}</td><td>{r.weight} kg</td><td>{r.reps}</td><td>{shortDate(r.date)}</td></tr>)}</tbody></table>}
      </div>
    </>
  );
}
