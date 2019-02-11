const moderationList = document.querySelector('#moderation-list');
const messageList = document.querySelector('#message-list');

// create element and render messages

function renderSubmission(doc) {
	let li = document.createElement('li');
	let text = document.createElement('span');
	let nickname = document.createElement('span');
	let discard = document.createElement('div');
	let add = document.createElement('div');
	
	//let fullDate = doc.data().date.toDate().toString();
	//shortDate = fullDate.substr(0, 24);
	
	li.setAttribute('data-id', doc.id);
	text.textContent = doc.data().text;
	nickname.textContent = doc.data().nickname;

	discard.textContent = 'Poista';
	add.textContent = 'Hyvaksy';
	
	li.appendChild(text);
	li.appendChild(nickname);
	li.appendChild(discard);
	li.appendChild(add);
	
	moderationList.appendChild(li);
	
    // deleting data
    discard.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('deleted').add({
			text: doc.data().text,
			nickname: doc.data().nickname,
			date: doc.data().date
		});
		db.collection('submissions').doc(id).delete();
    });
	
	// approving data
    add.addEventListener('click', (e) => {
        e.stopPropagation();
		let id = e.target.parentElement.getAttribute('data-id');
      	db.collection('messages').add({
			text: doc.data().text,
			nickname: doc.data().nickname,
			date: doc.data().date
		})
		db.collection('submissions').doc(id).delete();
    });
	
}

function renderMessage(doc) {
	let li = document.createElement('li');
	let text = document.createElement('span');
	let nickname = document.createElement('span');
	
	//let fullDate = doc.data().date.toDate().toString();
	//shortDate = fullDate.substr(0, 24);
	
	li.setAttribute('data-id', doc.id);
	text.textContent = doc.data().text;
	nickname.textContent = doc.data().nickname;


	li.appendChild(text);
	li.appendChild(nickname);
	
	messageList.appendChild(li);
}

var submissionsCollection = db.collection('submissions');

submissionsCollection.orderBy('date', 'desc').onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
		changes.forEach(change => {
				if(change.type == 'added') {
					renderSubmission(change.doc);
				} else if(change.type = 'removed'){
					let li = moderationList.querySelector('[data-id=' + change.doc.id + ']');
					moderationList.removeChild(li);
				}		
		})
})

var messagesCollection = db.collection('messages');

messagesCollection.orderBy('date', 'desc').limit(12).onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
		changes.forEach(change => {
				if(change.type == 'added') {
					renderMessage(change.doc);
				} else if(change.type = 'removed'){
					let li = messageList.querySelector('[data-id=' + change.doc.id + ']');
					messageList.removeChild(li);
				}		
		})
})