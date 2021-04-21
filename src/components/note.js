import React, { Component } from 'react';

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
    };
  }

textOnChange = (event) => {
  this.setState({ text: event.target.value });
}

  renderSection = () => {
    const position = 'relative';
    const left = this.props.info.x;
    const top = this.props.info.y;

    if (this.props.info.isEdit) {
      return (
        <div className="noteEdit" style={{ position, left, top }}>
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
      <div className="note" style={{ position, left, top }}>
        <div>
          <button type="button" onClick={() => this.props.onDelete(this.props.id)} id="delete">delete</button>
          <button type="button" id="edit" onClick={() => this.props.onEdit(this.props.id, true)}>edit</button>
        </div>
        <div>
          <h1>{this.props.info.title}</h1>
          <p>{this.props.info.text}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderSection()}
      </div>
    );
  }
}

export default Note;
