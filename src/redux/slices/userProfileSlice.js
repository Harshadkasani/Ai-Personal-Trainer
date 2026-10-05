import { createSlice } from '@reduxjs/toolkit';

const userProfileSlice = createSlice({
  name: 'profile',
  initialState: { data: null },
  reducers: {
    setProfile: (state, action) => { state.data = action.payload; },
    clearProfile: (state) => { state.data = null; },
  },
});
export const { setProfile, clearProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
