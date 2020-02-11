import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

const onAuthStateChanged = cb => firebase.auth().onAuthStateChanged(cb);
const createUser = user =>
  firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
const loginUser = user =>
  firebase.auth().signInWithEmailAndPassword(user.email, user.password);
const logoutUser = user => firebase.auth().signOut();

const createUserInDb = user =>
  console.log(user) || db.collection("users").add(user);

export default {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  onAuthStateChanged,
  createUser,
  loginUser,
  logoutUser,
  createUserInDb
};
