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
  const { projects, getProjects } = React.useContext(projectStore);

  React.useEffect(() => {
    getProjects();
  }, [getProjects]);

  if (projects && Object.keys(projects).length === 0)
    return (
      <div className={classes.root}>
        <Typography variant="h4">Loading Projects ...</Typography>
      </div>
    );

  return (
    <div className={classes.root}>
      {projects &&
        Object.keys(projects).map(key => (
          <ProjectSummary key={key} id={key} project={projects[key]} />
        ))}
    </div>
  );
};

export default ProjectList;
