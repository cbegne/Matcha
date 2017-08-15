import React, { Component } from 'react';
import SearchForm from '../components/SearchForm.js';

class Search extends Component {

  state = {
    search: '',
  };

  saveState = (name, value) => {
    this.setState({ [name]: value });
  }

  searchUser = () => {
    const { search } = this.state;
    this.props.history.push(`/profil/${search}`);
  }

  render() {
    return (
      <SearchForm onChange={this.saveState} onSubmit={this.searchUser} />
    );
  }
}

export default Search;
