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
  const { project } = props;
  const handleDelete = project => {
    deleteEnSet(true);
    deleteProject(project);
  };
  const handleEdit = project => history.push(`/updateproject/${project.ref}`);

  return (
    <Paper className={classes.item}>
      <Typography variant="h4">{project.title}</Typography>
      <Typography variant="body1">Posted by Carlton</Typography>
      <Typography variant="body2" className={classes.date}>
        {project.date
          ? moment(project.date.seconds * 1000).format(
              "MMMM Do YYYY, h:mm:ss a"
            )
          : "5th February, 10:30 AM"}
      </Typography>
      <IconButton onClick={() => handleDelete(project)} disabled={deleteEn}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={() => handleEdit(project)}>
        <EditIcon />
      </IconButton>
    </Paper>
  );
};

export default ProjectSummary;
