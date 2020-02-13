import React from "react";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import fireStore from "../../config/fbConfig.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  }
}));

const Notifications = () => {
  const classes = useStyles();
  const [notifications, notificationsSet] = React.useState([]);
  React.useEffect(() => fireStore.watchNotifications(notificationsSet), []);
  return (
    <div className={classes.root}>
      <Typography variant="h4">Notifications </Typography>
      <List>
        {notifications &&
          notifications.map(n => (
            <ListItem key={n.uid} alignItems="flex-start">
              <ListItemText
                primary={n.user}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {n.content}
                    </Typography>
                    {" " + moment(n.time.toDate()).fromNow()}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default Notifications;
