import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { fade, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { authStore } from "../../AuthStore";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  input: {
    width: 300
  },
  button: {
    marginTop: theme.spacing(1),
    backgroundColor: fade(theme.palette.common.black, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    }
  }
}));

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const { loginUser } = React.useContext(authStore);
  const onSubmit = values => {
    console.log(values);
    loginUser(values);
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4">Sign In</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TextField
            label="Email"
            className={classes.input}
            inputProps={{
              name: "email"
            }}
            inputRef={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid Email!"
              }
            })}
            helperText={errors.email ? errors.email.message : null}
          />
          {/* 
          password regex from
          https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        */}
          <TextField
            label="Password"
            // type="password"
            className={classes.input}
            inputProps={{
              name: "password"
            }}
            inputRef={register({
              required: "Required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,}$/,
                message:
                  "Pw 8+ chars, 1+ dig, 1+ ucase, 1+ lcase!, 1+ special ch"
              }
            })}
            helperText={errors.password ? errors.password.message : null}
          />
          <Button color="inherit" type="submit" className={classes.button}>
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default SignIn;
