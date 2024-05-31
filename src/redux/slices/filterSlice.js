import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    applyFilters: {},
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAppliedFilters(state, action) {
      state.applyFilters = action.payload;
    },
    clearAppliedFilters(state) {
      state.applyFilters = {};
    },
  },
});

export const { setAppliedFilters, clearAppliedFilters } = filterSlice.actions;
export default filterSlice.reducer;
