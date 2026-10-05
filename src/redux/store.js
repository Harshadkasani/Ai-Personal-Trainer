import { configureStore } from '@reduxjs/toolkit';
import profile from './slices/userProfileSlice';
import workout from './slices/workoutSlice';
import progress from './slices/progressSlice';
import nutrition from './slices/nutritionSlice';
import ui from './slices/uiSlice';

const KEY = 'fitai_state';

// Load saved state from LocalStorage (if any) when the app starts
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (!saved) return undefined;
    saved.ui = { theme: saved.ui?.theme || 'dark', toasts: [] };
    if (saved.workout) saved.workout.status = 'idle';
    return saved;
  } catch { return undefined; }
}

const store = configureStore({
  reducer: { profile, workout, progress, nutrition, ui },
  preloadedState: loadState(),
});

// Save to LocalStorage on every change
store.subscribe(() => {
  try { localStorage.setItem(KEY, JSON.stringify(store.getState())); } catch { /* storage full/blocked */ }
});

export default store;
