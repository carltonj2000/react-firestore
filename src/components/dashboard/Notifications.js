import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  projectList: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  }
}));

const Notifications = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p>Notifications</p>
    </div>
  );
};

export default Notifications;
