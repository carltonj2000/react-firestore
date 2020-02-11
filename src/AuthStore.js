import React from "react";

import fireStore from "./config/fbConfig.js";

const authStore = React.createContext(null);
const { Provider } = authStore;

const AuthStoreProvider = ({ children }) => {
  const [currentUser, currentUserSet] = React.useState(null);

  React.useEffect(() => {
    fireStore.onAuthStateChanged(currentUserSet);
  }, []);

  const createUser = React.useCallback(async user => {
    const result = await fireStore.createUser(user);
    await fireStore.createUserInDb({ ...user, uid: result.user.uid });
  }, []);

  const loginUser = React.useCallback(async user => {
    const result = await fireStore.loginUser(user);
    console.log(result.user.uid);
  }, []);

  const logoutUser = React.useCallback(() => {
    fireStore.logoutUser();
  }, []);

  return (
    <Provider value={{ currentUser, createUser, loginUser, logoutUser }}>
      {children}
    </Provider>
  );
};

export { authStore, AuthStoreProvider };
