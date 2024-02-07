
import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    showNavigation: true,
  },
  reducers: {
    toggleNavigation: (state) => {
      state.showNavigation = !state.showNavigation;
    },
  },
});

export const { toggleNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;
