import firebase from "firebase";
import dotenv from "dotenv";

dotenv.config();

var firebaseConfig = {
  apiKey: process.env.APIKEY + "1", // temp solution for the error popping up!
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
