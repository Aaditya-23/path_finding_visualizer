import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  grid: null,
};

const AlgorithmsSlice = createSlice({
  name: "algorithms",
  initialState,
  reducers: {
    
  },
});

// export const { getGrid } = AlgorithmsSlice.actions;
export default AlgorithmsSlice.reducer;
