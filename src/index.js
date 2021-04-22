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
import * as db from './services/datastore';

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

  componentDidMount = () => {
    db.fetchNotes((notes) => {
      // eslint-disable-next-line new-cap
      this.setState({ allNotes: Map(notes) });
    });

    console.log('hello');
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

// iterates through the map and renders all of the notes
renderNote() {
  // iterate through all the items in the Map
  const valNotes = this.state.allNotes.entrySeq().map(([id, note]) => {
    return (
      <Note key={id}
        id={id}
        info={this.state.allNotes.get(id)}
        finishEdit={db.updateText}
        onEdit={this.noteEditUpdate}
        onDelete={db.deleteNote}
        dragFinish={db.updatePosition}
      />
    );
  });
  return valNotes;
}

render() {
  return (
    <div>
      <AddBar onSubmit={db.addNote} />
      {this.renderNote()}
    </div>
  );
}
}

ReactDOM.render(<App />, document.getElementById('main'));
