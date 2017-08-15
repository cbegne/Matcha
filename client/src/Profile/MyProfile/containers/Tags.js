import React, { Component } from 'react';
import axios from 'axios';

import MyTags from '../components/MyTags.js';

class Tags extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tagsSuggestions: props.tagsSuggestions,
    };
  }

  changeTags = (tags, tag) => {
    const url = '/api/tags';
    const save = Object.assign({}, { tags }, { tag });
    axios.post(url, save).catch(err => console.error('Error: ', err));
    const { tagsSuggestions } = this.state;
    if (tag !== undefined && !tagsSuggestions.includes(tag)) {
      tagsSuggestions.push(tag);
      this.setState({ tagsSuggestions });
    }
  }

  render() {
    const { tags } = this.props.profile;
    const { tagsSuggestions } = this.state;

    return (
      <div className="each-box my-tags">
        <h2>Mes tags</h2>
        <MyTags
          tags={tags}
          suggestions={tagsSuggestions}
          onAddOrDelete={this.changeTags}
        />
      </div>
    );
  }
}

export default Tags;
