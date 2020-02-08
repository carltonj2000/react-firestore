import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import firebase from "./config/fbConfig.js";

const db = firebase.firestore();
console.log(db);
db.collection("projects")
  .get()
  .then(querySnapshot => {
    console.log(querySnapshot);
    querySnapshot.forEach(doc =>
      console.log(`${doc.id} =>${doc.data().content}`)
    );
  });
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
