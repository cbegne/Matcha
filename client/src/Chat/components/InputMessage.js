import React, { Component } from 'react';
import SubmitForm from '../../HomePage/components/SubmitForm.js';
import TextInput from '../../HomePage/components/TextInput.js';

class InputMessage extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    this.props.onSubmit();
  }

  passChange = (name, value) => {
    this.props.onChange(name, value);
  }

  render() {
    return (
      <form
        className="input-message-container"
        onSubmit={this.handleSubmit}
        autoComplete="off"
      >
        <TextInput
          defaultValue=""
          type="text"
          name="message"
          placeholder="Envoyer un message..."
          onChange={this.passChange}
          className="input-message"
        />
        <SubmitForm
          value="Envoyer"
          className="btn btn-default submit-message"
        />
      </form>
    );
  }
}

export default InputMessage;
