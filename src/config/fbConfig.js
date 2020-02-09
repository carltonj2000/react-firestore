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
        data.ref = doc.id;
        projects.push(data);
      });
      return projects;
    });

const createProject = project => db.collection("projects").add(project);
const updateProject = project => {
  console.log(project);
  const ref = project.ref;
  delete project.ref;
  console.log(ref);
  return db
    .collection("projects")
    .doc(ref)
    .set(project);
};

const deleteProject = project =>
  db
    .collection("projects")
    .doc(project.ref)
    .delete();

export default {
  getProjects,
  createProject,
  deleteProject,
  updateProject
};
