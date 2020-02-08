/*
 * Store code below based on
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
 * https://stackoverflow.com/questions/53146795/react-usereducer-async-data-fetch
 */
import React, { createContext } from "react";

import projects from "./config/projectsTestData";

import fs from "./config/fbConfig.js";

const initialState = { projects };
const projectStore = createContext(initialState);
const { Provider } = projectStore;

const CREATE_PROJECT = "CREATE_PROJECTS";
const SET_PROJECTS = "SET_PROJECTS";

const ProjectStoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case CREATE_PROJECT:
        return { projects: [...state.projects, action.project] };
      case SET_PROJECTS:
        return { projects: action.projects };
      case "bye":
        return { msg: "bye" };
      default:
        throw new Error();
    }
  }, initialState);

  const getProjects = async () => {
    const projects = await fs.getProjects();
    dispatch({ type: SET_PROJECTS, projects });
  };

  const createProject = async project => {
    dispatch({ type: CREATE_PROJECT, project });
  };

  return (
    <Provider value={{ state, createProject, getProjects }}>
      {children}
    </Provider>
  );
};

export { projectStore, ProjectStoreProvider };
