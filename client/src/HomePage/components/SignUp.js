import React, { Component } from 'react';

import TextInput from './TextInput.js';
import RadioInput from './RadioInput.js';
import TextInputDate from './TextInputDate.js';
import SubmitForm from './SubmitForm.js';

class SignUpForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  }

  passChange = (name, value) => {
    this.props.onChange(name, value);
  }

  passRadio = (name, value) => {
    this.props.onChange(name, value);
  }

  render() {
    return (
      <div className="signup">
        <form className="" onSubmit={this.handleSubmit}>
          <h2>Inscription gratuite</h2>
          <TextInput
            defaultValue=""
            name="login"
            type="text"
            placeholder="Identifiant*"
            onChange={this.passChange}
            className="form-group size-form-signup"
          />
          <TextInput
            defaultValue=""
            name="firstName"
            type="text"
            placeholder="Prénom*"
            onChange={this.passChange}
            className="form-group size-form-signup"
          />
          <TextInput
            defaultValue=""
            name="lastName"
            type="text"
            placeholder="Nom*"
            onChange={this.passChange}
            className="form-group size-form-signup"
          />
          <TextInput
            defaultValue=""
            name="email"
            type="email"
            placeholder="Email*"
            onChange={this.passChange}
            className="form-group size-form-signup"
          />
          <TextInputDate
            defaultValue=""
            name="birthDate"
            type="text"
            placeholder="Date de naissance*"
            onChange={this.passChange}
          />
          <div className="form-inline size-radio-signup">
            <RadioInput
              label="male"
              name="gender"
              text="Homme"
              onChange={this.passRadio}
            />
            <RadioInput
              label="female"
              name="gender"
              text="Femme"
              onChange={this.passRadio}
            />
          </div>
          <div className="form-inline size-radio-signup">
            <RadioInput
              label="Bisexuel"
              name="orientation"
              text="Bisexuel"
              onChange={this.passRadio}
            />
            <RadioInput
              label="Hétérosexuel"
              name="orientation"
              text="Hétérosexuel"
              onChange={this.passRadio}
            />
            <RadioInput
              label="Homosexuel"
              name="orientation"
              text="Homosexuel"
              onChange={this.passRadio}
            />
          </div>
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
            value="S'inscrire"
            className="btn btn-default submit-signup"
          />
        </form>
        <img className="" src="img/livelaughlove.png" alt="love quote" width="300" />
      </div>
    );
  }
}

export default SignUpForm;
