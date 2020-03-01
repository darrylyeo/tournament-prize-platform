// Firestore
import firebase from '@firebase/app'
import '@firebase/firestore'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
	apiKey: 'AIzaSyBPVmTlaV7pNdog3Uv_TjFPudss-T6lcmY',
	authDomain: 'tourneyearney.firebaseapp.com',
	projectId: 'tourneyearney'
})

var db = firebase.firestore()

function addTournament(tournament){
	db.collection('Tournaments').add(tournament)
		.then(docRef => {
			console.log('Document written: ', docRef)
			return docRef
		})
		.catch(error => {
			console.error('Error adding document: ', error)
		})
}

function getTournament(tournamentID){
	db.collection('Tournaments').get(tournamentID)
		.then(docRef => {
			console.log('Document: ', docRef)
			return docRef
		})
		.catch(error => {
			console.error('Error getting document: ', error)
		})
}

export {
	addTournament
}
