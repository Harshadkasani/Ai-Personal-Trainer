import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Sends users to the setup form if they have no profile / plan yet
export default function RequireProfile({ children }) {
  const profile = useSelector((s) => s.profile.data);
  const plan = useSelector((s) => s.workout.plan);
  return profile && plan ? children : <Navigate to="/setup" replace />;
}
