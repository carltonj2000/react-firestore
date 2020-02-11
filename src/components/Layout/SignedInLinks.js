import React from "react";
import { NavLink, useHistory } from "react-router-dom";

import { fade, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { authStore } from "../../AuthStore";

const useStyles = makeStyles(theme => ({
  user: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
    background: "pink",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    padding: theme.spacing(1)
  }
}));
const SignInLinks = () => {
  const classes = useStyles();
  const history = useHistory();
  const { logoutUser } = React.useContext(authStore);

  const handleLogout = () => {
    logoutUser();
    history.push("/");
  };

  return (
    <>
      <Button color="inherit" component={NavLink} to="/createproject">
        New Project
      </Button>
      <Button color="inherit" onClick={handleLogout}>
        Log Out
      </Button>
      <Typography
        variant="body1"
        className={classes.user}
        component={NavLink}
        to="/"
      >
        Carlton
      </Typography>
    </>
  );
};

export default SignInLinks;
