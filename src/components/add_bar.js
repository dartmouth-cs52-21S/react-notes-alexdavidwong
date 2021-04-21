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
    <div>
      <input onChange={this.inputChange} value={this.state.heading} />
      <button type="button" onClick={() => this.props.onSubmit(this.state.heading)}>create button</button>
    </div>
  );
}
}

// onClick of button runs call back function

export default AddBar;
