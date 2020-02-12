import React from "react";

import fireStore from "./config/fbConfig.js";

const UNINITIALIZED_STATE = "UNINITIALIZED_STATE";
const INITIALIZED_STATE = "INITIALIZED_STATE";

const initialState = {
  user: null,
  redirect: false,
  error: null,
  s: UNINITIALIZED_STATE,
  showNavLinks: false,
  showSignedInLinks: false
};
const authStore = React.createContext(initialState);
const { Provider } = authStore;

const CREATING_USER = "CREATING_USER";
const LOGGING_IN = "LOGGING_IN";
const LOGGING_OUT = "LOGGING_OUT";
const FS_STATE_CHANGED = "STATE_CHANGED";
const ERROR = "ERROR";

const authReducer = (state, action) => {
  console.log("auth reducer", action, state);
  switch (action.type) {
    case FS_STATE_CHANGED:
      let { redirect, s } = state;
      if (action.user) {
        s = INITIALIZED_STATE;
        redirect = false;
      } else {
        if (state.s === LOGGING_OUT || state.s === UNINITIALIZED_STATE) {
          s = INITIALIZED_STATE;
          redirect = true;
        }
      }
      return {
        ...state,
        user: action.user,
        showNavLinks: true,
        showSignedInLinks: !!action.user,
        s,
        redirect
      };
    case CREATING_USER:
    case LOGGING_OUT:
      return { ...state, s: action.type };
    case LOGGING_IN:
      return { ...state, s: action.type, redirect: false };
    case ERROR:
      return { ...state, error: action.error };
    default:
      throw new Error();
  }
};

const AuthStoreProvider = ({ children }) => {
  const [auth, dispatch] = React.useReducer(authReducer, initialState);

  React.useEffect(
    () =>
      fireStore.onAuthStateChanged(user => {
        dispatch({ type: FS_STATE_CHANGED, user });
      }),
    []
  );

  const createUser = React.useCallback(async user => {
    dispatch({ type: CREATING_USER });
    const result = await fireStore.createUser(user);
    await fireStore.createUserInDb({ ...user, uid: result.user.uid });
  }, []);
  const loginUser = React.useCallback(async user => {
    dispatch({ type: LOGGING_IN });
    await fireStore.loginUser(user);
  }, []);

  const logoutUser = React.useCallback(async () => {
    await fireStore.logoutUser();
    dispatch({ type: LOGGING_OUT });
  }, []);

  return (
    <Provider value={{ auth, createUser, loginUser, logoutUser }}>
      {children}
    </Provider>
  );
};

export { authStore, AuthStoreProvider };
