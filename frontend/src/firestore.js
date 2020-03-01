// Firestore
// Firestore
const firebase = require("firebase");
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyBPVmTlaV7pNdog3Uv_TjFPudss-T6lcmY',
  authDomain: 'tourneyearney.firebaseapp.com',
  projectId: 'tourneyearney'
});

var db = firebase.firestore();

function addTournament(tournament){
    db.collection("Tournaments").add(tournament)
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

