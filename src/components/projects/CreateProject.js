import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";

import { fade, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { projectStore } from "../../ProjectStore";
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
    width: 500
  },
  button: {
    marginTop: theme.spacing(1),
    backgroundColor: fade(theme.palette.common.black, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    }
  }
}));

const CreateProject = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const { projects, createProject, updateProject } = React.useContext(
    projectStore
  );
  const { auth } = React.useContext(authStore);
  const project = projects[id];
  const onSubmit = project => {
    if (id) updateProject({ ...projects[id], ...project }, id);
    else createProject(project);
    history.push("/");
  };

  if (!auth.user) history.push("/signin");
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4">{project ? "Edit" : "New"} Project</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TextField
            label="Title"
            className={classes.input}
            defaultValue={project ? project.title : ""}
            inputProps={{
              name: "title"
            }}
            inputRef={register({
              required: "Required"
            })}
            helperText={errors.title ? errors.title.message : null}
          />
          {/* 
          password regex from
          https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        */}
          <TextField
            multiline={true}
            rows="4"
            label="Content"
            className={classes.input}
            defaultValue={project ? project.content : ""}
            inputProps={{
              name: "content"
            }}
            inputRef={register({
              required: "Required"
            })}
            helperText={errors.content ? errors.content.message : null}
          />
          <Button color="inherit" type="submit" className={classes.button}>
            {project ? "Update" : "Create"}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default CreateProject;
