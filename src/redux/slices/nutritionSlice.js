import { createSlice } from '@reduxjs/toolkit';
import { clearProfile } from './userProfileSlice';

const initialState = { water: 0, intake: { calories: 0, protein: 0, carbs: 0, fat: 0 } };

const nutritionSlice = createSlice({
  name: 'nutrition',
  initialState,
  reducers: {
    addIntake: (s, { payload }) => {
      Object.keys(s.intake).forEach((k) => { s.intake[k] += Number(payload[k]) || 0; });
    },
    addWater: (s) => { s.water += 1; },
    resetDay: () => initialState,
  },
  extraReducers: (b) => { b.addCase(clearProfile, () => initialState); },
});
export const { addIntake, addWater, resetDay } = nutritionSlice.actions;
export default nutritionSlice.reducer;
