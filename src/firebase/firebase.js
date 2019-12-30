import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCLCbp5cV2oubWbbZ3vqa4nR4rQKbS5qqU",
    authDomain: "colabico-882e0.firebaseapp.com",
    databaseURL: "https://colabico-882e0.firebaseio.com",
    projectId: "colabico-882e0",
    storageBucket: "colabico-882e0.appspot.com",
    messagingSenderId: "970527431676",
    appId: "1:970527431676:web:daae16e70b18eb21297079",
    measurementId: "G-FJZ5VEK809"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };

database.ref().set(
    {user:{
        tasks:{
            task1:{
                done: false,
                pending:false,
                working:false
            },
            task2:{
                done: false,
                pending:true,
                working:false
            },
            task3:{
                done: false,
                pending:true,
                working:true
            }
        }
    }});