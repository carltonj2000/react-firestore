import React from "react";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";

import { authStore } from "../../AuthStore";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  projectList: {
    margin: theme.spacing(1),
    width: "100%"
    /*
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
    */
  },
  notifications: {
    width: "100%",
    margin: theme.spacing(1)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const { auth } = React.useContext(authStore);

  if (auth.redirect) return <Redirect to="/signin" />;
  else if (auth.user)
    return (
      <div className={classes.root}>
        <Paper className={classes.projectList}>
          <ProjectList />
        </Paper>
        <Paper className={classes.notifications}>
          <Notifications />
        </Paper>
      </div>
    );
  else return null;
};

export default Dashboard;
