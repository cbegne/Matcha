import React, { Component } from 'react';
import TextInput from '../../HomePage/components/TextInput.js';
import SubmitForm from '../../HomePage/components/SubmitForm.js';

class InputNewPassword extends Component {

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
        <h2>Nouveau mot de passe</h2>
        <form className="" onSubmit={this.handleSubmit}>
          <TextInput
            defaultValue=""
            name="password"
            type="password"
            placeholder="Mot de passe*"
            onChange={this.passChange}
            className="form-group size-form-signup"
          />
          <TextInput
            defaultValue=""
            name="passwordConfirm"
            type="password"
            placeholder="Confirmation du mot de passe*"
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

export default InputNewPassword;
