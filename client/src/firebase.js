import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCIGIfFOUZvc74oWBTvl98yBeHBQ6rsGQk",
  authDomain: "fir-a30d8.firebaseapp.com",
  databaseURL: "https://fir-a30d8.firebaseio.com",
  projectId: "fir-a30d8",
  storageBucket: "fir-a30d8.appspot.com",
  messagingSenderId: "1084644792542",
  appId: "1:1084644792542:web:ce33eb5ba4b0dddf90ca4f",
  measurementId: "G-DS7NYC1TXW",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
