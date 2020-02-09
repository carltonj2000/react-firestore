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
      const projects = {};
      querySnapshot.forEach(doc => (projects[doc.id] = doc.data()));
      return projects;
    });

const createProject = project => db.collection("projects").add(project);

const updateProject = (project, id) => {
  return db
    .collection("projects")
    .doc(id)
    .set(project);
};

const deleteProject = ref =>
  db
    .collection("projects")
    .doc(ref)
    .delete();

export default {
  getProjects,
  createProject,
  deleteProject,
  updateProject
};
