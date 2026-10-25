import { configureStore } from "@reduxjs/toolkit";
import { applicationReducer } from "../reducer/applicationReducer";

const STORAGE_KEY = "job-tracker-applications";

function loadApplications() {
  try {
    const savedApplications = window.localStorage.getItem(STORAGE_KEY);
    const parsedApplications = savedApplications
      ? JSON.parse(savedApplications)
      : [];

    return Array.isArray(parsedApplications) ? parsedApplications : [];
  } catch {
    return [];
  }
}

export const store = configureStore({
  reducer: {
    applications: applicationReducer,
  },
  preloadedState: {
    applications: {
      applications: loadApplications(),
      loading: false,
      error: null,
    },
  },
});

store.subscribe(() => {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(store.getState().applications.applications)
    );
  } catch {
    // Keep the app usable if browser storage is unavailable.
  }
});
