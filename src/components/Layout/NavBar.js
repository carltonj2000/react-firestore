import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

import { authStore } from "../../AuthStore";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit"
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const { auth } = React.useContext(authStore);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            Sophie And Champagne
          </Typography>
          <div>
            {auth.showNavLinks ? (
              auth.showSignedInLinks ? (
                <SignedInLinks />
              ) : (
                <SignedOutLinks />
              )
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
