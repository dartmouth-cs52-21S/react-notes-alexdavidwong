import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Draggable from 'react-draggable';

// pass callback function to modify position to move

// pass callback function to edit

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      heading: this.props.info.title,
      text: this.props.info.text,
      id: this.props.id,
      x: this.props.info.x,
      y: this.props.info.y,
    };
  }

textOnChange = (event) => {
  this.setState({ text: event.target.value });
}

  renderSection = () => {
    const position = 'relative';

    if (this.props.info.isEdit) {
      return (
        <div className="noteEdit" style={{ position }}>
          <div>
            <textarea onChange={this.textOnChange} value={this.state.text} />
          </div>
          <div>
            <button type="button" onClick={() => this.props.onDelete(this.props.id)} id="delete">delete</button>
            <button type="button" id="edit" onClick={() => this.props.finishEdit(this.state.id, this.state.text)}>done editing</button>
          </div>
        </div>
      );
    }

    return (
      <div className="note" style={{ position }}>
        <div>
          <button type="button" onClick={() => this.props.onDelete(this.props.id)} id="delete">delete</button>
          <button type="button" id="edit" onClick={() => this.props.onEdit(this.props.id, true)}>edit</button>
          <button type="button" className="moveAnchor">move</button>
        </div>
        <div>
          <h1>{this.props.info.title}</h1>
          <ReactMarkdown>{this.props.info.text || ''}</ReactMarkdown>
        </div>
      </div>
    );
  }

  handleDrag = (e, data) => {
    this.setState({ x: data.x, y: data.y });
    this.props.dragFinish(this.props.id, this.state.x, this.state.y);
  }

  render() {
    return (
      <Draggable
        handle=".moveAnchor"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{
          x: this.state.x, y: this.state.y, width: 10, height: 10,
        }}
        onDrag={this.handleDrag}
      >
        <div>
          {this.renderSection()}
        </div>
      </Draggable>

    );
  }
}

export default Note;
