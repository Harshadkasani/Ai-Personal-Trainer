import { useState, useEffect, useRef } from 'react';

// Simple countdown timer used for rest periods
export default function useCountdown() {
  const [left, setLeft] = useState(0);
  const timer = useRef(null);

  const stop = () => { clearInterval(timer.current); setLeft(0); };
  const start = (seconds) => {
    clearInterval(timer.current);
    setLeft(seconds);
    timer.current = setInterval(() => {
      setLeft((l) => { if (l <= 1) { clearInterval(timer.current); return 0; } return l - 1; });
    }, 1000);
  };
  useEffect(() => () => clearInterval(timer.current), []); // cleanup on unmount
  return { left, start, stop };
}
