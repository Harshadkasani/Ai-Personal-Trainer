import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIntake, addWater, resetDay } from '../redux/slices/nutritionSlice';
import { showToast } from '../redux/slices/uiSlice';
import ProgressRing from '../components/ProgressRing';
import { calcTargets } from '../utils/helpers';

export default function Nutrition() {
  const dispatch = useDispatch();
  const p = useSelector((s) => s.profile.data);
  const { intake, water } = useSelector((s) => s.nutrition);
  const t = calcTargets(p);
  const [f, setF] = useState({ calories: '', protein: '', carbs: '', fat: '' });

  const add = (e) => {
    e.preventDefault();
    if (Object.values(f).every((v) => !v)) return dispatch(showToast('Enter at least one value.', 'error'));
    dispatch(addIntake(f)); setF({ calories: '', protein: '', carbs: '', fat: '' }); dispatch(showToast('Meal added'));
  };

  return (
    <>
      <h1>Nutrition</h1>
      <p className="note">These are rough estimates for general guidance only, not professional medical or nutritional advice. Consult a qualified dietitian or doctor for personal needs.</p>
      <div className="card rings">
        <ProgressRing value={intake.calories} max={t.calories} label="Calories" unit="kcal" />
        <ProgressRing value={intake.protein} max={t.protein} label="Protein" unit="g" color="#22c55e" />
        <ProgressRing value={intake.carbs} max={t.carbs} label="Carbs" unit="g" color="#f59e0b" />
        <ProgressRing value={intake.fat} max={t.fat} label="Fat" unit="g" color="#ef4444" />
        <ProgressRing value={water} max={t.water} label="Water" unit="glasses" color="#38bdf8" />
      </div>
      <div className="grid2">
        <form className="card" onSubmit={add}><h3>Log a meal</h3>
          {Object.keys(f).map((k) => <label className="field" key={k}>{k} {k === 'calories' ? '(kcal)' : '(g)'}<input type="number" min="0" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} /></label>)}
          <button className="btn">Add meal</button></form>
        <div className="card"><h3>Water intake</h3><p className="muted">{water} glasses today (goal {t.water})</p>
          <button className="btn" onClick={() => dispatch(addWater())}>+ 1 glass 💧</button>{' '}
          <button className="btn ghost" onClick={() => { dispatch(resetDay()); dispatch(showToast('Day reset')); }}>Reset day</button></div>
      </div>
    </>
  );
}
