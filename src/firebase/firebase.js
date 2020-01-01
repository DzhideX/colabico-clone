import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: process.env.REACT_APP__APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.envREACT_APP_MEASUREMENTID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };

database.ref().set({users:
    {
        username: 'Edvin',
        password: 'Password'
    }})