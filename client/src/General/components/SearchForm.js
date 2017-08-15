import React, { Component } from 'react';
import TextInput from '../../HomePage/components/TextInput.js';
import SubmitForm from '../../HomePage/components/SubmitForm.js';

class SearchForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    this.props.onSubmit();
  }

  handleChange = (name, value) => {
    this.props.onChange(name, value);
  }

  render() {
    return (
      <form className="form-inline search-form" onSubmit={this.handleSubmit}>
        <TextInput
          defaultValue=""
          type="text"
          name="search"
          placeholder="Recherche profil"
          onChange={this.handleChange}
          className="form-group search-input"
        />
        <SubmitForm
          value="Envoyer"
          className="btn btn-default search-submit"
        />
      </form>
    );
  }
}

export default SearchForm;
