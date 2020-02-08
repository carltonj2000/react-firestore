import firebase from "firebase/app";
import "firebase/firestore";

import serviceAccount from "./serviceAccountKey.js";

firebase.initializeApp(serviceAccount);

export default firebase;
