import React, { Component } from 'react';
import TextInput from '../../HomePage/components/TextInput.js';
import SubmitForm from '../../HomePage/components/SubmitForm.js';

class InputForgot extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  }

  passChange = (name, value) => {
    this.props.onChange(name, value);
  }

  render() {
    return (
      <div className="forgot-container">
        <h2>Identifiant ou mot de passe oublié</h2>
        <form className="" onSubmit={this.handleSubmit}>
          <TextInput
            defaultValue=""
            name="email"
            type="email"
            placeholder="Email*"
            onChange={this.passChange}
            className="form-group size-form-signup"
          />
          <SubmitForm
            value="Envoyer"
            className="btn btn-default submit-signup"
          />
        </form>
      </div>
    );
  }
}

export default InputForgot;
