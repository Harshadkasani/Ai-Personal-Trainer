import { createSlice } from '@reduxjs/toolkit';
import { setProfile, clearProfile } from './userProfileSlice';

const initialState = { weights: [], measurements: [], prs: [] };

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    updateWeight: (s, a) => { s.weights.push({ date: new Date().toISOString(), kg: Number(a.payload) }); },
    // type: 'measurement' | 'pr'
    updateProgress: (s, { payload: { type, ...data } }) => {
      const entry = { date: new Date().toISOString(), ...data };
      if (type === 'measurement') s.measurements.push(entry);
      if (type === 'pr') s.prs.unshift(entry);
    },
  },
  extraReducers: (b) => {
    // Seed the first weight entry from the profile
    b.addCase(setProfile, (s, a) => {
      if (!s.weights.length) s.weights.push({ date: new Date().toISOString(), kg: a.payload.weight });
    }).addCase(clearProfile, () => initialState);
  },
});
export const { updateWeight, updateProgress } = progressSlice.actions;
export default progressSlice.reducer;
