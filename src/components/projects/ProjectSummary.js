import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, fade } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import moment from "moment";

import { projectStore } from "../../ProjectStore";

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
  const history = useHistory();
  const [deleteEn, deleteEnSet] = React.useState(false);
  const { deleteProject } = React.useContext(projectStore);
  const { project, id } = props;

  const handleDelete = k => () => {
    deleteEnSet(true);
    deleteProject(k);
  };
  const handleEdit = k => () => history.push(`/updateproject/${k}`);
  const handleDetails = k => () => history.push(`/project/${k}`);

  return (
    <Paper className={classes.item}>
      <Typography variant="h4" onClick={handleDetails(id)}>
        {project.title}
      </Typography>
      <Typography variant="body1">
        Posted by{" "}
        {project.authorFirstName
          ? project.authorLastName
            ? `${project.authorFirstName} ${project.authorLastName}`
            : `${project.authorFirstName}`
          : "Unknown"}
      </Typography>
      <Typography variant="body2" className={classes.date}>
        {project.createdAt && moment(project.createdAt.toDate()).calendar()}
      </Typography>
      <IconButton onClick={handleDelete(id)} disabled={deleteEn}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={handleEdit(id)}>
        <EditIcon />
      </IconButton>
    </Paper>
  );
};

export default ProjectSummary;
