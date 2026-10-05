import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppLayout from './layouts/AppLayout';
import RequireProfile from './components/RequireProfile';
import ToastContainer from './components/ToastContainer';
import Landing from './pages/Landing';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import WorkoutPlan from './pages/WorkoutPlan';
import WorkoutDetails from './pages/WorkoutDetails';
import Exercises from './pages/Exercises';
import Progress from './pages/Progress';
import Nutrition from './pages/Nutrition';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

export default function App() {
  const theme = useSelector((s) => s.ui.theme);
  // Put the theme on <html> so CSS variables can switch between light/dark
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/setup" element={<ProfileSetup />} />
        <Route path="/app" element={<RequireProfile><AppLayout /></RequireProfile>}>
          <Route index element={<Dashboard />} />
          <Route path="plan" element={<WorkoutPlan />} />
          <Route path="workout/:day" element={<WorkoutDetails />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="progress" element={<Progress />} />
          <Route path="nutrition" element={<Nutrition />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
