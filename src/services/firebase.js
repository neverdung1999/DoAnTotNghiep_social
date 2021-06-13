import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDpmA6bZfQPfLpqcThyXQwG3SbHJnnpyow",
  authDomain: "api-social-network-4c66d.firebaseapp.com",
  databaseURL:
    "https://api-social-network-4c66d-default-rtdb.asia-southeast1.firebasedatabase.app",
};
firebase.initializeApp(config);
export const db = firebase.database();
