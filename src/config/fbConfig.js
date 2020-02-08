import firebase from "firebase/app";
import "firebase/firestore";

import serviceAccount from "./serviceAccountKey.js";

firebase.initializeApp(serviceAccount);
const db = firebase.firestore();

const getProjects = () =>
  db
    .collection("projects")
    .get()
    .then(querySnapshot => {
      const projects = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        data.id = doc.id;
        projects.push(data);
      });
      return projects;
    });

export default {
  getProjects
};
