/*
 * Store code below based on
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
 * https://stackoverflow.com/questions/53146795/react-usereducer-async-data-fetch
 */
import React, { createContext } from "react";

//import projects from "./config/projectsTestData"; // for testing

import fireStore from "./config/fbConfig.js";

const initialState = [];
const projectStore = createContext(initialState);
const { Provider } = projectStore;

const SET_PROJECTS = "SET_PROJECTS";
const CREATE_PROJECT = "CREATE_PROJECTS";
const DELETE_PROJECT = "DELETE_PROJECTS";
const UPDATE_PROJECT = "UPDATE_PROJECTS";

const ProjectStoreProvider = ({ children }) => {
  const [projects, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case SET_PROJECTS:
        return action.projects;
      case CREATE_PROJECT:
        return [...state, action.project];
      case DELETE_PROJECT:
        return state.filter(p => p.ref !== action.project.ref);
      case UPDATE_PROJECT:
        const newState = [
          ...state.filter(p => p.ref !== action.project.ref),
          action.project
        ];
        console.log(action.project.ref, state, newState);
        return newState;
      case "bye":
        return { msg: "bye" };
      default:
        throw new Error();
    }
  }, initialState);

  const getProjects = React.useCallback(async () => {
    const projects = await fireStore.getProjects();
    dispatch({ type: SET_PROJECTS, projects });
  }, [dispatch]);

  const createProject = async project => {
    project.date = new Date();
    const ref = await fireStore.createProject(project);
    project.ref = ref.id;
    console.log("create project", project);
    dispatch({ type: CREATE_PROJECT, project });
  };

  const deleteProject = async project => {
    await fireStore.deleteProject(project);
    dispatch({ type: DELETE_PROJECT, project });
  };

  const updateProject = async project => {
    await fireStore.updateProject({ ...project });
    console.log(project);
    dispatch({ type: UPDATE_PROJECT, project });
  };

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
