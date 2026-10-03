import { configureStore } from "@reduxjs/toolkit";
import { applicationReducer } from "../reducer/applicationReducer";

export const store = configureStore({
  reducer: {
    applications: applicationReducer,
  },
});