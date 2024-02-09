import { createReducer } from "@reduxjs/toolkit";

const initState = {
  id: "",
  appeal: "",
};

export const reducerPatchData = createReducer(initState, (builder) => {
  builder
    .addCase("INFO_ID", (state, action) => {
      state.id = action.payload;
    })
    .addCase("INFO_APPEAL", (state, action) => {
      state.appeal = action.payload;
    })
    .addDefaultCase(() => {});
});
