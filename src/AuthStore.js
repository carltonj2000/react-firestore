/*
 * Store code below based on
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
 */
import React, { createContext, useReducer } from "react";

const initialState = { msg: "hi" };
const authStore = createContext(initialState);
const { Provider } = authStore;

const AuthStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "bye":
        const newState = { msg: "bye" };
        return newState;
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

  return (
    <Provider value={{ state, dispatch: customDispatch }}>{children}</Provider>
  );
};

export { authStore, AuthStoreProvider };
