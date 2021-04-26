import React, { Component } from 'react';

class AddBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heading: '',
    };
  }

inputChange = (event) => {
  this.setState({ heading: event.target.value });
}

render() {
  return (
    <div className="addBar">
      <input onChange={this.inputChange} value={this.state.heading} />
      <button type="button"
        onClick={() => {
          this.props.onSubmit(this.state.heading);
          this.setState({ heading: '' });
        }}
      >add note
      </button>
    </div>
  );
}
}

export default AddBar;
