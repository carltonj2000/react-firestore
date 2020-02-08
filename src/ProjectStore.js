/*
 * Store code below based on
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
 * https://stackoverflow.com/questions/53146795/react-usereducer-async-data-fetch
 */
import React, { createContext } from "react";

import projects from "./config/projectsTestData";

const initialState = { projects };
const projectStore = createContext(initialState);
const { Provider } = projectStore;

const ProjectStoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "CREATE_PROJECT":
        return { projects: [...state.projects, action.project] };
      case "bye":
        return { msg: "bye" };
      default:
        throw new Error();
    }
  }, initialState);

  const createProject = async project => {
    dispatch({ type: "CREATE_PROJECT", project });
  };

  return <Provider value={{ state, createProject }}>{children}</Provider>;
};

export { projectStore, ProjectStoreProvider };
