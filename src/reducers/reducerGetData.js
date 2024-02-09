import { createReducer } from "@reduxjs/toolkit";

const initState = {
  appeals: [],
  indicators: {},
  types: {},
  responsibles: {},
  filters: {
    search: "",
    filterType: "все",
    filterIndicator: "все",
  },
};

export const reducerGetData = createReducer(initState, (builder) => {
  builder
    .addCase("LOADED_GET_DATA", (state, action) => {
      state.appeals = action.payload;
    })
    .addCase("GET_INDICATORS", (state, action) => {
      state.indicators = action.payload;
    })
    .addCase("GET_TYPES", (state, action) => {
      state.types = action.payload;
    })
    .addCase("GET_RESPONSIBLES", (state, action) => {
      state.responsibles = action.payload;
    })
    .addCase("SET_FILTERS", (state, action) => {
      state.filters = action.payload;
    })
    .addDefaultCase(() => {});
});
