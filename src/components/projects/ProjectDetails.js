import React from "react";
import { useParams } from "react-router-dom";

import { fade, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  },
  date: {
    color: fade(theme.palette.common.black, 0.6)
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}));

const ProjectDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  return (
    <Paper className={classes.root}>
      <Typography variant="h4">Project Title {id}</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex recusandae
        fugiat harum modi fugit expedita, doloribus assumenda numquam non
        reiciendis libero animi sunt quod error iure excepturi in consequuntur,
        quos quo ducimus deleniti nisi! Distinctio ratione veritatis eius
        exercitationem doloremque in, eum ex hic aut accusantium reiciendis
        laudantium nobis culpa!
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant="subtitle1">Posted by Carlton</Typography>
      <Typography variant="subtitle2" className={classes.date}>
        5th February, 10:30 AM
      </Typography>
    </Paper>
  );
};

export default ProjectDetails;
