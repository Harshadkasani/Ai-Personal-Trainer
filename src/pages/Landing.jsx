import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/uiSlice';

const FEATURES = [
  ['🧠', 'Personalized Plans', 'Splits, sets and reps tailored to your goal, level and schedule.'],
  ['📈', 'Progress Tracking', 'Log weight, measurements and personal records with clear charts.'],
  ['🥗', 'Nutrition Targets', 'Daily calorie, protein, carb and fat estimates to guide your habits.'],
  ['⏱️', 'Guided Workouts', 'Set tracking, rest timers and exercise instructions in one place.'],
];
const STEPS = [['1', 'Tell us about you', 'Body stats, goal, experience and equipment.'], ['2', 'Get your plan', 'Your weekly schedule is generated in seconds.'], ['3', 'Train and track', 'Complete sets, watch your streak and progress grow.']];
const REVIEWS = [
  ['Priya S.', 'Lost 6 kg in 3 months', 'The plan fit my 3-day schedule and my home dumbbells perfectly.'],
  ['Rahul M.', 'Added 15 kg to squat', 'Tracking sets and PRs keeps me consistent every week.'],
  ['Ananya K.', 'Beginner to 4 days/week', 'Clear instructions made the gym feel far less intimidating.'],
];

export default function Landing() {
  const dispatch = useDispatch();
  const hasPlan = useSelector((s) => s.workout.plan);
  return (
    <div className="landing">
      <nav className="navbar">
        <strong className="brand">⚡ FitAI</strong>
        <div className="nav-links">
          <a href="#features">Features</a><a href="#how">How it works</a><a href="#reviews">Reviews</a>
          <button className="btn ghost" onClick={() => dispatch(toggleTheme())}>🌓</button>
          <Link className="btn" to={hasPlan ? '/app' : '/setup'}>{hasPlan ? 'Dashboard' : 'Get Started'}</Link>
        </div>
      </nav>
      <section className="hero">
        <h1>Your AI personal trainer,<br /><span>built around you.</span></h1>
        <p>Answer a few questions and get a complete weekly workout plan with nutrition targets and progress tracking.</p>
        <Link className="btn big" to="/setup">Create My Workout Plan →</Link>
      </section>
      <section id="features" className="section">
        <h2>Everything you need to train smart</h2>
        <div className="grid4">{FEATURES.map(([i, t, d]) => <div className="card hover" key={t}><div className="big-icon">{i}</div><h3>{t}</h3><p>{d}</p></div>)}</div>
      </section>
      <section id="how" className="section">
        <h2>How it works</h2>
        <div className="grid3">{STEPS.map(([n, t, d]) => <div className="card hover" key={n}><div className="num">{n}</div><h3>{t}</h3><p>{d}</p></div>)}</div>
      </section>
      <section id="reviews" className="section">
        <h2>Loved by beginners and lifters</h2>
        <div className="grid3">{REVIEWS.map(([n, r, q]) => <div className="card hover" key={n}><p>“{q}”</p><strong>{n}</strong><br /><small>{r}</small></div>)}</div>
      </section>
      <footer className="footer">© {new Date().getFullYear()} FitAI. General fitness information only, not medical advice.</footer>
    </div>
  );
}
