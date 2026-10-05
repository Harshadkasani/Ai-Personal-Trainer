import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../redux/slices/userProfileSlice';
import { generateWorkout } from '../redux/slices/workoutSlice';
import { showToast } from '../redux/slices/uiSlice';
import Loader from '../components/Loader';

const GOALS = ['Muscle Gain', 'Weight Loss', 'Fat Loss', 'Strength', 'General Fitness'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const EQUIP = ['No equipment', 'Dumbbells', 'Barbell', 'Machines', 'Full Gym'];
const STEPS = ['About you', 'Your goal', 'Schedule & gear', 'Limitations'];

// Row of selectable buttons
function Options({ value, options, onChange }) {
  return <div className="options">{options.map((o) => <button type="button" key={o} className={`opt ${value === o ? 'on' : ''}`} onClick={() => onChange(o)}>{o}</button>)}</div>;
}

export default function ProfileSetup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existing = useSelector((s) => s.profile.data);
  const loading = useSelector((s) => s.workout.status === 'loading');
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [f, setF] = useState(existing || { name: '', age: '', gender: '', height: '', weight: '', goal: '', experience: '', days: 3, duration: 45, equipment: '', injuries: '' });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  // Returns an object of error messages for the current step (empty = valid)
  const validate = (s) => {
    const e = {};
    const inRange = (v, lo, hi) => v !== '' && Number(v) >= lo && Number(v) <= hi;
    if (s === 0) {
      if (!f.name.trim()) e.name = 'Please enter your name.';
      if (!inRange(f.age, 14, 80)) e.age = 'Age must be between 14 and 80.';
      if (!f.gender) e.gender = 'Please select a gender.';
      if (!inRange(f.height, 120, 230)) e.height = 'Height must be 120–230 cm.';
      if (!inRange(f.weight, 30, 250)) e.weight = 'Weight must be 30–250 kg.';
    }
    if (s === 1) {
      if (!f.goal) e.goal = 'Please choose a goal.';
      if (!f.experience) e.experience = 'Please choose your experience.';
    }
    if (s === 2 && !f.equipment) e.equipment = 'Please choose your equipment.';
    return e;
  };

  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) return dispatch(showToast('Please fix the highlighted fields.', 'error'));
    setStep(step + 1);
  };

  const submit = async () => {
    const all = [0, 1, 2].reduce((acc, s) => ({ ...acc, ...validate(s) }), {});
    if (Object.keys(all).length) { setErrors(all); return dispatch(showToast('Some earlier fields need attention.', 'error')); }
    const profile = { ...f, name: f.name.trim(), age: +f.age, height: +f.height, weight: +f.weight, days: +f.days, duration: +f.duration };
    dispatch(setProfile(profile));
    try {
      await dispatch(generateWorkout(profile)).unwrap();
      dispatch(showToast('Your workout plan is ready! 💪'));
      navigate('/app');
    } catch { dispatch(showToast('Could not generate your plan. Try again.', 'error')); }
  };

  const Err = ({ k }) => errors[k] ? <small className="err">{errors[k]}</small> : null;
  const input = (k, label, type = 'number', ph = '') => (
    <label className="field">{label}
      <input type={type} value={f[k]} placeholder={ph} className={errors[k] ? 'bad' : ''} onChange={(e) => set(k, e.target.value)} /><Err k={k} />
    </label>
  );

  return (
    <div className="setup">
      {loading && <Loader text="Building your personalized plan…" />}
      <div className="card setup-card">
        <Link to="/" className="back">← Home</Link>
        <div className="steps">{STEPS.map((s, i) => <div key={s} className={`step ${i <= step ? 'on' : ''}`}><span>{i + 1}</span>{s}</div>)}</div>

        {step === 0 && <div className="form-grid">
          {input('name', 'Name', 'text', 'e.g. Harshad')}{input('age', 'Age')}
          <div className="field">Gender<Options value={f.gender} options={['Male', 'Female', 'Other']} onChange={(v) => set('gender', v)} /><Err k="gender" /></div>
          {input('height', 'Height (cm)')}{input('weight', 'Weight (kg)')}
        </div>}

        {step === 1 && <>
          <div className="field">Fitness goal<Options value={f.goal} options={GOALS} onChange={(v) => set('goal', v)} /><Err k="goal" /></div>
          <div className="field">Experience<Options value={f.experience} options={LEVELS} onChange={(v) => set('experience', v)} /><Err k="experience" /></div>
        </>}

        {step === 2 && <>
          <label className="field">Workout days per week: <b>{f.days}</b>
            <input type="range" min="2" max="6" value={f.days} onChange={(e) => set('days', e.target.value)} /></label>
          <label className="field">Workout duration
            <select value={f.duration} onChange={(e) => set('duration', e.target.value)}>{[30, 45, 60, 75, 90].map((m) => <option key={m} value={m}>{m} minutes</option>)}</select></label>
          <div className="field">Available equipment<Options value={f.equipment} options={EQUIP} onChange={(v) => set('equipment', v)} /><Err k="equipment" /></div>
        </>}

        {step === 3 && <>
          <label className="field">Injuries or limitations (optional)
            <textarea rows="4" value={f.injuries} placeholder="e.g. sore knee, shoulder pain. We'll avoid exercises that stress those joints." onChange={(e) => set('injuries', e.target.value)} /></label>
          <p className="note">FitAI provides general fitness guidance, not medical advice. Check with a doctor before starting a new programme, especially if you have an injury or health condition.</p>
        </>}

        <div className="actions">
          <button className="btn ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
          {step < 3 ? <button className="btn" onClick={next}>Continue</button> : <button className="btn" onClick={submit}>Generate My Plan ⚡</button>}
        </div>
      </div>
    </div>
  );
}
