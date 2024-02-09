import { createReducer } from "@reduxjs/toolkit";

const initState = {
  appeal: {},
};

export const reducerPostData = createReducer(initState, (builder) => {
  builder
    .addCase("POST_APPEAL", (state, action) => {
      state.appeal = action.payload;
    })
    .addDefaultCase(() => {});
});
