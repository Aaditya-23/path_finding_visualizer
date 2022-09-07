import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gridDimensions: { row: 20, column: 20 },
  VisualizingAlgorithm: null,

  isSelectingSource: false,
  isSelectingTarget: false,
};

const ActionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    setGridDimensions: (state, actions) => {
      const { row, column } = state.gridDimensions;

      row = actions.payload.row;
      column = actions.payload.column;
    },

    setSelectingSource: (state, actions) => {
      state.isSelectingSource = actions.payload;
    },

    setSelectingTarget: (state, actions) => {
      state.isSelectingTarget = actions.payload;
    },
  },
});

export const { setGridDimensions, setSelectingSource, setSelectingTarget } =
  ActionsSlice.actions;

export default ActionsSlice.reducer;
