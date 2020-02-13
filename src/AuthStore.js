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
const UPDATE_PROFILE = "UPDATE_PROFILE";
const LOGGING_OUT = "LOGGING_OUT";
const FS_STATE_CHANGED = "FS_STATE_CHANGED";
const ERROR = "ERROR";

const authReducer = (state, action) => {
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
        error: null,
        showSignedInLinks: !!action.user,
        s,
        redirect
      };
    case LOGGING_OUT:
      return { ...state, s: action.type, redirect: true, user: null };
    case CREATING_USER:
    case LOGGING_IN:
      return { ...state, s: action.type, redirect: false };
    case UPDATE_PROFILE:
      return { ...state, user: { ...state.user, ...action.user } };
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
      fireStore.onAuthStateChanged(async user => {
        if (user) {
          try {
            const profile = await fireStore.getUserProfile(user.uid);
            dispatch({
              type: FS_STATE_CHANGED,
              user: { ...profile, uid: user.uid }
            });
          } catch (error) {
            // need to do something here
          }
        } else {
          dispatch({ type: FS_STATE_CHANGED, user: null });
        }
      }),
    []
  );

  const createUser = React.useCallback(async user => {
    dispatch({ type: CREATING_USER, user });
    try {
      const result = await fireStore.createUser(user);
      dispatch({ type: UPDATE_PROFILE, user: result.user });
    } catch (e) {
      dispatch({ type: ERROR, error: `Create user failed! ${e.message}` });
    }
  }, []);
  const loginUser = React.useCallback(async user => {
    dispatch({ type: LOGGING_IN });
    await fireStore.loginUser(user);
  }, []);

  const logoutUser = React.useCallback(async () => {
    dispatch({ type: LOGGING_OUT });
    await fireStore.logoutUser();
  }, []);

  return (
    <Provider
      value={{
        auth,
        states: { UNINITIALIZED_STATE },
        createUser,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </Provider>
  );
};

export { authStore, AuthStoreProvider };
