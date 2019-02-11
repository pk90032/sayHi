const form = document.querySelector('#send-message-form');
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

// saving data

form.addEventListener('submit', (e) => {

	e.preventDefault();
	db.collection('submissions').add({
		text: form.text.value,
		nickname: form.nickname.value,
		date: timestamp
	})
	form.nickname.value = '';
    form.text.value = '';
	
})