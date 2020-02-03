import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};

// console.log(process.env.REACT_APP__AP)

// var firebaseConfig = {
//     apiKey: "AIzaSyCLCbp5cV2oubWbbZ3vqa4nR4rQKbS5qqU",
//     authDomain: "colabico-882e0.firebaseapp.com",
//     databaseURL: "https://colabico-882e0.firebaseio.com",
//     projectId: "colabico-882e0",
//     storageBucket: "colabico-882e0.appspot.com",
//     messagingSenderId: "970527431676",
//     appId: "1:970527431676:web:daae16e70b18eb21297079",
//     measurementId: "G-FJZ5VEK809"
//   };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };

// database.ref('todos').push({'value':'stuff'});