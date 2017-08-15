import React, { Component } from 'react';

import TextareaInput from './TextareaInput.js';
import SubmitForm from './SubmitForm.js';

class MyBio extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  }

  passChange = (name, value) => {
    this.props.onChange(name, value);
  }

  render() {
    const { bio } = this.props.profile;

    return (
      <div className="each-box my-bio">
        <h2>Ma bio</h2>
        <form onSubmit={this.handleSubmit}>
          <TextareaInput
            currentValue={bio}
            name="bio"
            onChange={this.passChange}
          />
          <SubmitForm />
        </form>
      </div>
    );
  }

}

export default MyBio;
