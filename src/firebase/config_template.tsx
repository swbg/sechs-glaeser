import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "sechs-glaeser.firebaseapp.com",
  databaseURL:
    "https://sechs-glaeser-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "sechs-glaeser",
  storageBucket: "sechs-glaeser.appspot.com",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const rtdb = firebase.database();
const auth = firebase.auth()

export { rtdb, auth };
