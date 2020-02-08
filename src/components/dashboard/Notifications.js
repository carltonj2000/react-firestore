import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { authStore } from "../../AuthStore";

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
  const { state, dispatch } = React.useContext(authStore);
  return (
    <div className={classes.root}>
      <p onClick={() => dispatch({ type: "wait-bye" })}>
        Notifications {state.msg}
      </p>
    </div>
  );
};

export default Notifications;
