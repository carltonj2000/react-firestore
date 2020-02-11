/*
 * Store code below based on
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
 */
import React, { createContext, useReducer } from "react";

const initialState = { msg: "hi", loggedInUser: null };
const authStore = createContext(initialState);
const { Provider } = authStore;

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const AuthStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case LOGIN:
        return { ...state, loggedInUser: action.user };
      case LOGOUT:
        return { ...state, loggedInUser: null };
      case "bye":
        return { ...state, msg: "bye" };
      default:
        throw new Error();
    }
  }, initialState);

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));
  const customDispatch = React.useCallback(async action => {
    switch (action.type) {
      case "wait-bye":
        await sleep(1000);
        dispatch({ type: "bye" });
        break;
      default:
        dispatch(action);
    }
  }, []);

  const login = React.useCallback(async user => {
    // firebase login
    dispatch({ type: LOGIN, user });
  }, []);

  const logout = React.useCallback(async () => {
    // firebase login
    dispatch({ type: LOGOUT });
  }, []);

  return (
    <Provider value={{ state, dispatch: customDispatch, login, logout }}>
      {children}
    </Provider>
  );
};

export { authStore, AuthStoreProvider };
