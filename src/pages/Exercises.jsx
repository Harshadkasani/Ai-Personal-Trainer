import { useState } from 'react';
import { EXERCISES, MUSCLE_ICONS, TIER_DIFFICULTY } from '../data/exercises';

export default function Exercises() {
  const [muscle, setMuscle] = useState('all');
  const list = EXERCISES.filter((e) => muscle === 'all' || e.muscle === muscle);
  return (
    <>
      <h1>Exercise Library</h1>
      <div className="options">{['all', ...Object.keys(MUSCLE_ICONS)].map((m) => <button key={m} className={`opt ${muscle === m ? 'on' : ''}`} onClick={() => setMuscle(m)}>{m}</button>)}</div>
      <div className="grid3">
        {list.map((e) => (
          <div className="card hover" key={e.id}>
            <div className="big-icon">{MUSCLE_ICONS[e.muscle]}</div>
            <h3>{e.name}</h3>
            <small className="muted">{e.muscle} · {TIER_DIFFICULTY[e.tier]}</small>
            <p>{e.tip}</p>
          </div>
        ))}
      </div>
    </>
  );
}
