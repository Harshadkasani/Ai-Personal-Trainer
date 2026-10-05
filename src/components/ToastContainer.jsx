import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissToast } from '../redux/slices/uiSlice';

function Toast({ toast }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const t = setTimeout(() => dispatch(dismissToast(toast.id)), 3000);
    return () => clearTimeout(t);
  }, [toast.id, dispatch]);
  return <div className={`toast ${toast.type}`} role="status">{toast.message}</div>;
}

export default function ToastContainer() {
  const toasts = useSelector((s) => s.ui.toasts);
  return <div className="toasts">{toasts.map((t) => <Toast key={t.id} toast={t} />)}</div>;
}
