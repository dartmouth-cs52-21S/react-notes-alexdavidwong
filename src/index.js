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

  /*
  newNote = (title) => {
    // eslint-disable-next-line no-unused-vars
    const id = this.state.count;
    const note = {
      title,
      text: 'hello',
      x: 200,
      y: 20,
      zIndex: 10,
    };

    this.setState((prevState) => ({
      notes: prevState.allNotes.set(0, note),
      count: prevState.count + 1,
    }));
  }
 */

  testAdd = (title) => {
    const id = this.state.count;
    const note = {
      title,
      text: 'hello',
      x: 200,
      y: 20,
      zIndex: 10,
    };

    this.setState((prevState) => ({
      allNotes: prevState.allNotes.set(id, note),
      count: prevState.count + 1,
    }));

    // WHY IS THERE AN ERROR HERE?
    this.state.allNotes.entrySeq().map(([id, note])) => {

      console.log('hello');

    }
  }

  renderNote() {
    // iterate through all the items in the Map

    if (this.state.count > 0) {
      return <Note info={this.state.allNotes.get(0)} />;
    } return 0;
  }

  render() {
    return (
      <div>
        <AddBar onSubmit={this.testAdd} />
        {this.renderNote()}
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));

// function to delete notes, triggered by button from note

// function to create notes, triggered by AddBar submit

// function that iterates through the map and renders everything
