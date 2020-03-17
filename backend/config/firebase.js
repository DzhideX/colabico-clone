const firebase = require("firebase");
const dotenv = require("dotenv");

dotenv.config();

var firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

exports.db = db;
