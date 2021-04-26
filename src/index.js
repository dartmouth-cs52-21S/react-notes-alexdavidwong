/* eslint-disable new-cap */
/*
TODO: ask about iteration over the database
add draggability
add rendering for each note
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
      // eslint-disable-next-line new-cap
      allNotes: Map(),
    };
  }

  componentDidMount = () => {
    db.fetchNotes((notes) => {
      // eslint-disable-next-line new-cap
      this.setState({
        allNotes: Map(notes),
      });
    });
  }

  // iterates through the map and renders all of the notes
  renderNote() {
  // iterate through all the items in the Map
    const valNotes = this.state.allNotes.entrySeq().map(([id, note]) => {
      return (
        <Note key={id}
          id={id}
          info={note}
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
