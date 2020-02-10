import React from "react";
import { useParams } from "react-router-dom";

import { fade, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

import { projectStore } from "../../ProjectStore";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  },
  date: {
    color: fade(theme.palette.common.black, 0.6)
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}));

const ProjectDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { projects } = React.useContext(projectStore);
  const project = projects[id];
  if (project)
    return (
      <Paper className={classes.root}>
        <Typography variant="h4">{project.title}</Typography>
        <Typography variant="body1">{project.content}</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle1">
          Posted by {project.authorFirstName} {project.authorLastName}
        </Typography>
        <Typography variant="subtitle2" className={classes.date}>
          5th February, 10:30 AM
        </Typography>
      </Paper>
    );
  else return <Typography variant="h4">Loading project!</Typography>;
};

export default ProjectDetails;
