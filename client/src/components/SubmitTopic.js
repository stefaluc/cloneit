import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/SubmitTopic.css';
import '../styles/index.css';

class SubmitTopic extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    // do not submit if field is empty
    if (!this.inputNode.value) {
      return;
    }
    this.props.submitTopic(this.inputNode.value);
    this.inputNode.value = '';
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.submit}>
          <TextField
            ref={(node) => {
              if (node !== null) {
                this.inputNode = node.input;
              }
            }}
            hintText="Topic name..."
            floatingLabelText="Submit a new topic"
            fullWidth
          />
          <br />
          <RaisedButton
            label="Submit"
            primary
            onClick={this.submit}
          />
        </form>
      </div>
    );
  }
}

export default SubmitTopic;
