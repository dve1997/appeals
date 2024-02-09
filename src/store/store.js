import { configureStore } from "@reduxjs/toolkit";

import { reducerGetData } from "../reducers/reducerGetData";
import { reducerPostData } from "../reducers/reducerPostData";
import { reducerDeleteData } from "../reducers/reducerDeleteData";
import { reducerPatchData } from "../reducers/reducerPatchData";

export const store = configureStore({
  reducer: {
    reducerGetData,
    reducerPostData,
    reducerDeleteData,
    reducerPatchData,
  },
  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware(),
});
