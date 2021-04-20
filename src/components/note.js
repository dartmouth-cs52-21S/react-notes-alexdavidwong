import React from 'react';

// constructor tracks the following: position, heading, text, isEditMode, isDelete

// passes delete function from index.js to the menu items

// pass callback function to modify position to move

// function to render things, pass in props of note object
const Note = (props) => {
  const left = props.info.x;
  const right = props.info.y;
  const position = 'relative';

  return (
    <div style={{ position, left, right }}>
      <h1>{props.info.title}</h1>
      <p>{props.info.text}</p>
    </div>
  );
};

export default Note;
