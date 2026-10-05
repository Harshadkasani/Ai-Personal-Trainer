import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/uiSlice';

const LINKS = [
  ['/app', '📊', 'Dashboard'], ['/app/plan', '🗓️', 'Workout Plan'], ['/app/exercises', '🏋️', 'Exercises'],
  ['/app/progress', '📈', 'Progress'], ['/app/nutrition', '🥗', 'Nutrition'], ['/app/profile', '👤', 'Profile'], ['/app/settings', '⚙️', 'Settings'],
];

export default function AppLayout() {
  const [open, setOpen] = useState(false); // mobile sidebar
  const theme = useSelector((s) => s.ui.theme);
  const dispatch = useDispatch();

  return (
    <div className="shell">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">⚡ FitAI</div>
        <nav>
          {LINKS.map(([to, icon, label]) => (
            <NavLink key={to} to={to} end={to === '/app'} onClick={() => setOpen(false)}>{icon} {label}</NavLink>
          ))}
        </nav>
      </aside>
      <div className="main">
        <header className="topbar">
          <button className="btn ghost menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
          <span />
          <button className="btn ghost" onClick={() => dispatch(toggleTheme())}>{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</button>
        </header>
        <main className="content"><Outlet /></main>
      </div>
    </div>
  );
}
