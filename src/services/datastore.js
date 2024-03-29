import firebase from 'firebase';

// eslint-disable-next-line no-var
var firebaseConfig = {
  apiKey: 'AIzaSyBT1kRX7y4h0nUBC7b7zAY3vl63CvfiY2w',
  authDomain: 'firenotes-45594.firebaseapp.com',
  databaseURL: 'https://firenotes-45594-default-rtdb.firebaseio.com',
  projectId: 'firenotes-45594',
  storageBucket: 'firenotes-45594.appspot.com',
  messagingSenderId: '896211787688',
  appId: '1:896211787688:web:614f161d5f744d5690c79d',
  measurementId: 'G-X1LLQ7R8VF',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// eslint-disable-next-line no-unused-vars
const database = firebase.database();

function fetchNotes(callback) {
  firebase.database().ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();

    callback(newNoteState);
  });
}

function addNote(title) {
  firebase.database().ref('notes').push({
    title,
    text: '',
    x: 200,
    y: 20,
    zIndex: 1,
    isEdit: false,
  });
}

function updateEdit(id, isEdit) {
  firebase.database().ref('notes').child(id).update({
    isEdit,
  });
}

function updateText(id, text, title, isEdit) {
  firebase.database().ref('notes').child(id).update({
    text,
    title,
    isEdit,
  });
}

function updateTitle(id, title) {
  firebase.database().ref('notes').child(id).update({
    title,
  });
}

function updatePosition(id, x, y) {
  firebase.database().ref('notes').child(id).update({
    x, y,
  });
}

function deleteNote(id) {
  firebase.database().ref('notes').child(id).remove();
}

function dragStartZIndex(id) {
  firebase.database().ref('notes').child(id).update({
    zIndex: 100,
  });
}

function dragStopZIndex(id) {
  firebase.database().ref('notes').child(id).update({
    zIndex: 10,
  });
}

export {
  fetchNotes, addNote, updateText, deleteNote, updatePosition, updateEdit, dragStartZIndex, dragStopZIndex, updateTitle,
};
