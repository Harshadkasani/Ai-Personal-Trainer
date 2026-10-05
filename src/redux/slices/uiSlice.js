import { createSlice, nanoid } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { theme: 'dark', toasts: [] },
  reducers: {
    toggleTheme: (s) => { s.theme = s.theme === 'dark' ? 'light' : 'dark'; },
    showToast: {
      reducer: (s, a) => { s.toasts.push(a.payload); },
      prepare: (message, type = 'success') => ({ payload: { id: nanoid(), message, type } }),
    },
    dismissToast: (s, a) => { s.toasts = s.toasts.filter((t) => t.id !== a.payload); },
  },
});
export const { toggleTheme, showToast, dismissToast } = uiSlice.actions;
export default uiSlice.reducer;
