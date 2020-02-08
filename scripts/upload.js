const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

const projects = require("../src/config/projectsTestData");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sophie-champagne.firebaseio.com"
});

const db = admin.firestore();
const projectsRef = db.collection("projects");

const insertProject = async project => {
  await projectsRef.add(project);
  console.log(project.title);
};

(async () => {
  for (let i = 0; i < projects.length; i++) {
    await insertProject(projects[i]);
  }
  process.exit(0);
})().catch(e => console.log(e));
