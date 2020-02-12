import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import serviceAccount from "./serviceAccountKey.js";

firebase.initializeApp(serviceAccount);
const db = firebase.firestore();
const auth = firebase.auth();

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

const onAuthStateChanged = cb => auth.onAuthStateChanged(cb);
const createUser = user =>
  auth.createUserWithEmailAndPassword(user.email, user.password).then(resp =>
    db
      .collection("users")
      .doc(resp.user.uid)
      .set(user)
  );

const getUserProfile = uid =>
  db
    .collection("users")
    .doc(uid)
    .get()
    .then(snapshot => snapshot.data());

const loginUser = user =>
  auth.signInWithEmailAndPassword(user.email, user.password);
const logoutUser = () => auth.signOut();

export default {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  onAuthStateChanged,
  createUser,
  loginUser,
  logoutUser,
  getUserProfile
};
