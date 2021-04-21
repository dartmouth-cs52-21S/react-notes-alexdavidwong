/*
TODO: ask about iteration over the database
add draggability
add rendering for each note
*/

/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import Note from './components/note';
import AddBar from './components/add_bar';

// constructor stores the notes in an immutable map
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line new-cap
      allNotes: Map(),
      count: 0,
    };
  }

  // adds a new note, triggered by submit button
  addNote = (title) => {
    const id = this.state.count;
    const note = {
      title,
      text: 'hello',
      x: 200,
      y: 20,
      zIndex: 10,
      isEdit: false,
    };

    this.setState((prevState) => ({
      allNotes: prevState.allNotes.set(id, note),
      count: prevState.count + 1,
    }));
  }

  // callback to delete note, triggered by the delete button
  deleteNote = (id) => {
    this.setState((prevState) => ({
      allNotes: prevState.allNotes.delete(id),
    }));
  }

// callback to set the notes editing
// ... copies the topline keys + values
noteEditUpdate = (id, isEdit) => {
  this.setState((prevState) => ({
    allNotes: prevState.allNotes.update(id, (prevNote) => {
      return { ...prevNote, isEdit };
    }),
  }));
}

noteUpdate = (id, text) => {
  this.setState((prevState) => ({
    allNotes: prevState.allNotes.update(id, (prevNote) => {
      return { ...prevNote, isEdit: false, text };
    }),
  }));
}

// iterates through the map and renders all of the notes
renderNote() {
  // iterate through all the items in the Map
  const valNotes = this.state.allNotes.entrySeq().map(([id, note]) => {
    return (
      <Note key={id}
        id={id}
        info={this.state.allNotes.get(id)}
        finishEdit={this.noteUpdate}
        onEdit={this.noteEditUpdate}
        onDelete={this.deleteNote}
      />
    );
  });
  return valNotes;
}

render() {
  return (
    <div>
      <AddBar onSubmit={this.addNote} />
      {this.renderNote()}
    </div>
  );
}
}

ReactDOM.render(<App />, document.getElementById('main'));
