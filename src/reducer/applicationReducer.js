import { APPLICATION_ACTIONS } from "./applicationActions";

const initialState = {
  applications: [],
  loading: false,
  error: null,
};

export function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case APPLICATION_ACTIONS.SET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
        loading: false,
        error: null,
      };

    case APPLICATION_ACTIONS.ADD_APPLICATION:
      return {
        ...state,
        applications: [action.payload, ...state.applications],
      };

    case APPLICATION_ACTIONS.DELETE_APPLICATION:
      return {
        ...state,
        applications: state.applications.filter(
          (app) => app.id !== action.payload
        ),
      };

    case APPLICATION_ACTIONS.UPDATE_APPLICATION:
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.id === action.payload.id
            ? { ...app, ...action.payload }
            : app
        ),
      };

    case APPLICATION_ACTIONS.CHANGE_STATUS:
      return {
        ...state,
        applications: state.applications.map((app) =>
          app.id === action.payload.id
            ? { ...app, status: action.payload.status }
            : app
        ),
      };

    case APPLICATION_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case APPLICATION_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}