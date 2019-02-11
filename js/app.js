const messageList = document.querySelector('#message-list');

// create element and render messages

function renderMessage(doc) {
	let li = document.createElement('li');
	let text = document.createElement('span');
	let nickname = document.createElement('span');
	
	li.setAttribute('data-id', doc.id);
	text.textContent = doc.data().text;
	nickname.textContent = doc.data().nickname;
	
	li.appendChild(text);
	li.appendChild(nickname);
	
	messageList.appendChild(li);
}

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



