import React, { Component } from 'react';
import TextInput from './TextInput.js';
import SubmitForm from './SubmitForm.js';

class SignInForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  }

  passChange = (name, value) => {
    this.props.onChange(name, value);
  }

  render() {
    return (
      <div className="signin">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <TextInput
            defaultValue=""
            type="text"
            name="login"
            placeholder="Identifiant*"
            onChange={this.passChange}
            className="form-group size-form-signin"
          />
          <TextInput
            defaultValue=""
            type="password"
            name="password"
            placeholder="Mot de passe*"
            onChange={this.passChange}
            className="form-group size-form-signin"
          />
          <SubmitForm
            value="Se connecter"
            className="btn btn-default submit-signin"
          />
        </form>
      </div>
    );
  }

}

export default SignInForm;
