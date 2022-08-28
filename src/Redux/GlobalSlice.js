import { createSlice } from "@reduxjs/toolkit";

const GlobalSlice = createSlice({
  name: "Global",
  initialState: {
    isLoaded: false,
  },
  reducers: {
    setLoadedTrue(state) {
      state.isLoaded = true;
    },
    setLoadedFalse(state) {
      state.isLoaded = false;
    },
  },
});

export const { setLoadedTrue, setLoadedFalse } = GlobalSlice.actions;
export default GlobalSlice.reducer;
