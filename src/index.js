/* eslint-disable new-cap */
/*
Alex Wong
4/26/21
Lab 3: React Notes
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import Note from './components/note';
import AddBar from './components/add_bar';
import * as db from './services/datastore';
import './style.scss';

// constructor stores the notes in an immutable map
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allNotes: Map(),
      prevNote: Map(),
    };
  }

  componentDidMount = () => {
    db.fetchNotes((notes) => {
      this.setState((prevState) => ({
        prevNote: prevState.allNotes,
        allNotes: Map(notes),
      }));
    });
  }

  undoNote = (id) => {
    if (this.state.prevNote.has(id)) {
      console.log(this.state.prevNote.get(id).text);
      db.updateText(id, this.state.prevNote.get(id).text, false);
    }
  }

  renderNote() {
  // iterate through all the items in the Map
    const valNotes = this.state.allNotes.entrySeq().map(([id, note]) => {
      return (
        <Note key={id}
          id={id}
          info={note}
          undoNote={this.undoNote}
          finishEdit={db.updateText}
          onEdit={db.updateEdit}
          onDelete={db.deleteNote}
          dragStart={db.dragStartZIndex}
          dragStop={db.dragStopZIndex}
          dragFinish={db.updatePosition}
        />
      );
    });
    return valNotes;
  }

  render() {
    return (
      <div className="mainApp">
        <AddBar onSubmit={db.addNote} />
        {this.renderNote()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
