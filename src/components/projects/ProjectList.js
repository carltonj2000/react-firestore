import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
  const { state, getProjects } = React.useContext(projectStore);
  React.useEffect(() => {
    getProjects();
  }, [getProjects]);
  if (state.projects && state.projects.length === 0)
    return (
      <div className={classes.root}>
        <Typography variant="h4">Loading Projects ...</Typography>
      </div>
    );
  return (
    <div className={classes.root}>
      {state.projects &&
        state.projects.map(project => (
          <ProjectSummary key={project.ref} project={project} />
        ))}
    </div>
  );
};

export default ProjectList;
