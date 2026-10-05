import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { generateWorkoutPlan } from '../../services/aiService';

// An "async thunk" lets us run async code (like an API call) and
// automatically get pending / fulfilled / rejected actions.
export const generateWorkout = createAsyncThunk('workout/generate', async (profile) => {
  return await generateWorkoutPlan(profile);
});

const initialState = {
  plan: null,       // array of 7 days (Mon–Sun)
  status: 'idle',   // idle | loading | error
  sets: {},         // { "dayIndex:exerciseId": completedSetCount }
  finished: {},     // { dayIndex: true } once every exercise is done
  history: [],      // recent finished workouts
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    completeExercise: (state, { payload: { day, exerciseId, totalSets } }) => {
      const key = `${day}:${exerciseId}`;
      state.sets[key] = Math.min((state.sets[key] || 0) + 1, totalSets);
      // Is the whole day finished now?
      const dayPlan = state.plan[day];
      const allDone = dayPlan.exercises.every((e) => (state.sets[`${day}:${e.id}`] || 0) >= e.sets);
      if (allDone && !state.finished[day]) {
        state.finished[day] = true;
        state.history.unshift({ date: new Date().toISOString(), title: dayPlan.title, minutes: dayPlan.minutes });
      }
    },
    resetWorkout: () => initialState,
  },
  extraReducers: (b) => {
    b.addCase(generateWorkout.pending, (s) => { s.status = 'loading'; })
     .addCase(generateWorkout.fulfilled, (s, a) => { s.status = 'idle'; s.plan = a.payload; s.sets = {}; s.finished = {}; })
     .addCase(generateWorkout.rejected, (s) => { s.status = 'error'; });
  },
});
export const { completeExercise, resetWorkout } = workoutSlice.actions;
export default workoutSlice.reducer;
