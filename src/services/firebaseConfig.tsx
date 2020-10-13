import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC5ByfrIiaCyO69TwhpZ-YLls--ZPV-AWk",
    authDomain: "scor-chaser-gvg.firebaseapp.com",
    databaseURL: "https://scor-chaser-gvg.firebaseio.com",
    projectId: "scor-chaser-gvg",
    storageBucket: "scor-chaser-gvg.appspot.com",
    messagingSenderId: "623217833338",
    appId: "1:623217833338:web:5ebb9032bb810b35e952c3",
    measurementId: "G-DRG1E4FPSN"
};

firebase.initializeApp(firebaseConfig);

export default firebase;