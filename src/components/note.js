import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Draggable from 'react-draggable';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.info.text,
      id: this.props.id,
    };
  }

textOnChange = (event) => {
  this.setState({ text: event.target.value });
}

  renderSection = () => {
    const position = 'relative';
    // eslint-disable-next-line no-unused-vars
    const { zIndex } = this.props.info;

    if (this.props.info.isEdit) {
      return (
        <div className="note noteEdit" style={{ position }}>
          <div>
            <textarea onChange={this.textOnChange} value={this.state.text} />
          </div>
          <div>
            <button type="button" onClick={() => this.props.onDelete(this.props.id)} id="delete">delete</button>
            <button type="button" id="edit" onClick={() => this.props.finishEdit(this.state.id, this.state.text, false)}>done editing</button>
          </div>
        </div>
      );
    }

    return (
      <div className="note" style={{ position, zIndex }}>
        <div className="operationBar">
          <button type="button" onClick={() => this.props.onDelete(this.props.id)} id="delete">delete</button>
          <button type="button" id="edit" onClick={() => this.props.onEdit(this.props.id, true)}>edit</button>
          <button type="button" className="move">move</button>
          <button type="button" className="undo" onClick={() => this.props.undoNote(this.props.id)}>undo</button>
        </div>
        <div>
          <h1>{this.props.info.title}</h1>
          <ReactMarkdown>{this.props.info.text || ''}</ReactMarkdown>
        </div>
      </div>
    );
  }

  handleDragStart = () => {
    this.props.dragStart(this.props.id);
  }

  handleDrag = (e, data) => {
    this.props.dragFinish(this.props.id, data.x, data.y);
  }

  handleDragStop = () => {
    this.props.dragStop(this.props.id);
  }

  render() {
    return (
      <div className="noteWrapper" style={{ zIndex: this.props.info.zIndex }}>
        <Draggable
          handle=".move"
          grid={[25, 25]}
          defaultPosition={{ x: 20, y: 20 }}
          position={{
            x: this.props.info.x, y: this.props.info.y, width: 10, height: 10,
          }}
          onStart={this.handleDragStart}
          onDrag={this.handleDrag}
          onStop={this.handleDragStop}
        >
          <div>
            {this.renderSection()}
          </div>
        </Draggable>
      </div>

    );
  }
}

export default Note;
