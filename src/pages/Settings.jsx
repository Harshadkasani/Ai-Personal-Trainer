import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, showToast } from '../redux/slices/uiSlice';
import { clearProfile } from '../redux/slices/userProfileSlice';
import { resetWorkout } from '../redux/slices/workoutSlice';

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((s) => s.ui.theme);

  const resetAll = () => {
    if (!window.confirm('Delete your profile, plan and all progress?')) return;
    dispatch(resetWorkout()); dispatch(clearProfile());
    dispatch(showToast('All data cleared'));
    navigate('/');
  };
  return (
    <>
      <h1>Settings</h1>
      <div className="card row-between"><div><h3>Appearance</h3><p className="muted">Currently using {theme} mode.</p></div><button className="btn" onClick={() => dispatch(toggleTheme())}>Switch to {theme === 'dark' ? 'light' : 'dark'}</button></div>
      <div className="card row-between"><div><h3>Reset everything</h3><p className="muted">Clears your profile, workout plan, progress and nutrition from this browser.</p></div><button className="btn danger" onClick={resetAll}>Reset data</button></div>
    </>
  );
}
