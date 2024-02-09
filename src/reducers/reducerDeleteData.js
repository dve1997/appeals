import { createReducer } from "@reduxjs/toolkit";

const initState = {
  id: "",
};

export const reducerDeleteData = createReducer(initState, (builder) => {
  builder
    .addCase("DELETE_APPEAL", (state, action) => {
      state.id = action.payload;
    })
    .addDefaultCase(() => {});
});
