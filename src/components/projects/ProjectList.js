import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ProjectSummary from "./ProjectSummary";

import { projectStore } from "../../ProjectStore";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1)
  }
}));

const ProjectList = () => {
  const classes = useStyles();
  const { state } = React.useContext(projectStore);
  return (
    <div className={classes.root}>
      {state.projects &&
        state.projects.map(project => (
          <ProjectSummary key={project.id} project={project} />
        ))}
    </div>
  );
};

export default ProjectList;
