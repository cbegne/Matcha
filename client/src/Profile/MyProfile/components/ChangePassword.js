import React, { Component } from 'react';

import TextInput from './TextInput.js';
import SubmitForm from './SubmitForm.js';

class ChangePassword extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  }

  passChange = (name, value) => {
    this.props.onChange(name, value);
  }

  render() {
    return (
      <div className="each-box password">
        <h2>Changement de mot de passe</h2>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            currentValue=""
            name="oldPassword"
            type="password"
            text="Ancien mot de passe"
            onChange={this.passChange}
          />
          <TextInput
            currentValue=""
            name="password"
            type="password"
            text="Nouveau mot de passe"
            onChange={this.passChange}
          />
          <TextInput
            currentValue=""
            name="passwordConfirm"
            type="password"
            text="Confirmation du nouveau mot de passe"
            onChange={this.passChange}
          />
          <SubmitForm />
        </form>
      </div>
    );
  }

}

export default ChangePassword;
