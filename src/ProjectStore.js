/*
 * Store code below based on
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
 * https://stackoverflow.com/questions/53146795/react-usereducer-async-data-fetch
 */
import React, { createContext } from "react";

//import projects from "./config/projectsTestData"; // for testing

import fireStore from "./config/fbConfig.js";

const initialState = {};
const projectStore = createContext(initialState);
const { Provider } = projectStore;

const SET_PROJECTS = "SET_PROJECTS";
const CREATE_PROJECT = "CREATE_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const UPDATE_PROJECT = "UPDATE_PROJECT";

const CREATE_PROJECT_ERROR = "CREATE_PROJECT_ERROR";

const projectReducer = (state, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects;
    case CREATE_PROJECT:
      state[action.id] = action.project;
      return state;
    case CREATE_PROJECT_ERROR:
      state[CREATE_PROJECT_ERROR] = action.error;
      return state;
    case DELETE_PROJECT:
      const deleteState = { ...state };
      delete deleteState[action.id];
      return deleteState;
    case UPDATE_PROJECT:
      state[action.id] = action.project;
      return state;
    default:
      throw new Error();
  }
};

const ProjectStoreProvider = ({ children }) => {
  const [projects, dispatch] = React.useReducer(projectReducer, initialState);

  const getProjects = React.useCallback(async () => {
    const projects = await fireStore.getProjects();
    dispatch({ type: SET_PROJECTS, projects });
  }, []);

  const deleteProject = React.useCallback(async id => {
    await fireStore.deleteProject(id);
    dispatch({ type: DELETE_PROJECT, id });
  }, []);

  const createProject = React.useCallback(async project => {
    try {
      project.createdAt = new Date();
      project.authorFirstName = "Carlton";
      project.authorLastName = "Joseph";
      project.authorId = "1";
      const pRef = await fireStore.createProject(project);
      dispatch({ type: CREATE_PROJECT, project, id: pRef.id });
    } catch (error) {
      dispatch({ type: CREATE_PROJECT_ERROR, error });
    }
  }, []);

  const updateProject = React.useCallback(async (project, id) => {
    await fireStore.updateProject(project, id);
    dispatch({ type: UPDATE_PROJECT, project, id });
  }, []);

  return (
    <Provider
      value={{
        projects,
        createProject,
        getProjects,
        deleteProject,
        updateProject
      }}
    >
      {children}
    </Provider>
  );
};

export { projectStore, ProjectStoreProvider };
