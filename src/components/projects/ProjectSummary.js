import React from "react";
import { makeStyles, fade } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  item: {
    padding: theme.spacing(2),
    margin: theme.spacing(1)
    /*
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
    */
  },
  date: {
    color: fade(theme.palette.common.black, 0.5)
  }
}));

const ProjectSummary = props => {
  const classes = useStyles();
  return (
    <Paper className={classes.item}>
      <Typography variant="h4">{props.project.title}</Typography>
      <Typography variant="body1">Posted by Carlton</Typography>
      <Typography variant="body2" className={classes.date}>
        5th February, 10:30 AM
      </Typography>
    </Paper>
  );
};

export default ProjectSummary;
