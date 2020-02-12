import React from "react";
import { NavLink } from "react-router-dom";

import Button from "@material-ui/core/Button";

const SignedOutLinks = () => {
  return (
    <>
      <Button color="inherit" component={NavLink} to="/signin">
        Sign In
      </Button>
      <Button color="inherit" component={NavLink} to="/signup">
        Sign Up
      </Button>
    </>
  );
};

export default SignedOutLinks;
