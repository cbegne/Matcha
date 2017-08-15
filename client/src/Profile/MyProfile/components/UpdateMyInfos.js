import moment from 'moment';
import React, { Component } from 'react';

import RadioInput from './RadioInput.js';
import TextInput from './TextInput.js';
import TextInputDate from './TextInputDate.js';
import SubmitForm from './SubmitForm.js';

class UpdateMyInfos extends Component {

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
    const {
      firstName,
      lastName,
      email,
      gender,
      orientation,
      birthDate,
    } = this.props.profile;
    const date = moment(birthDate).format('DD/MM/YYYY');

    return (
      <div className="each-box update-infos">
        <h2>Mes informations générales</h2>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            currentValue={firstName}
            name="firstName"
            type="text"
            text="Prénom"
            onChange={this.passChange}
          />
          <TextInput
            currentValue={lastName}
            name="lastName"
            type="text"
            text="Nom"
            onChange={this.passChange}
          />
          <TextInput
            currentValue={email}
            name="email"
            type="email"
            text="Email"
            onChange={this.passChange}
          />
          <TextInputDate
            currentValue={date}
            name="birthDate"
            type="text"
            text="Date de naissance"
            onChange={this.passChange}
          />
          <div className="form-inline size-radio-signup">
            <RadioInput
              label="male"
              name="gender"
              text="Homme"
              onChange={this.passRadio}
              toCheckOrNot={gender}
            />
            <RadioInput
              label="female"
              name="gender"
              text="Femme"
              onChange={this.passRadio}
              toCheckOrNot={gender}
            />
          </div>
          <div className="form-inline size-radio-signup">
            <RadioInput
              label="Bisexuel"
              name="orientation"
              text="Bisexuel"
              onChange={this.passRadio}
              toCheckOrNot={orientation}
            />
            <RadioInput
              label="Hétérosexuel"
              name="orientation"
              text="Hétérosexuel"
              onChange={this.passRadio}
              toCheckOrNot={orientation}
            />
            <RadioInput
              label="Homosexuel"
              name="orientation"
              text="Homosexuel"
              onChange={this.passRadio}
              toCheckOrNot={orientation}
            />
          </div>
          <SubmitForm />
        </form>
      </div>
    );
  }

}

export default UpdateMyInfos;
