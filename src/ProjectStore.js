/*
 * Store code below based on
 * https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
 * https://stackoverflow.com/questions/53146795/react-usereducer-async-data-fetch
 */
import React, { createContext } from "react";

const initialState = {
  projects: [
    {
      id: 1,
      title: "help me find peaches",
      content: "oh peach this and that and ..."
    },
    {
      id: 2,
      title: "collect all the stars",
      content: "oh start this and that and ..."
    },
    {
      id: 3,
      title: "egg hunt with tina",
      content: "oh egg this and that and ..."
    }
  ]
};
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
