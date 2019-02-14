import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBDG0ZZ8-kp3uyr8t42o7vhEH_R6s51LoQ",
    authDomain: "lccards-79b16.firebaseapp.com",
    databaseURL: "https://lccards-79b16.firebaseio.com",
    projectId: "lccards-79b16",
    storageBucket: "lccards-79b16.appspot.com",
    messagingSenderId: "742925869202"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();



export default firebase;