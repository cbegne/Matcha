import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import '../../css/reactTags.css';

class MyTags extends Component {

  handleDelete = (i) => {
    const currentTags = this.props.tags;
    currentTags.splice(i, 1);
    Object.keys(currentTags).forEach(key => (currentTags[key].id = key));
    this.props.onAddOrDelete(currentTags);
  }

  handleAddition = (tag) => {
    const currentTags = this.props.tags;
    currentTags.push({
      id: currentTags.length + 1,
      text: `#${tag}`,
    });
    this.props.onAddOrDelete(currentTags, tag);
  }

  render() {
    const { tags, suggestions } = this.props;

    return (
      <ReactTags
        className="ReactTags__tags ReactTags__tagInput ReactTags__suggestions"
        tags={tags}
        autofocus={false}
        maxLength="20"
        suggestions={suggestions}
        handleDelete={this.handleDelete}
        handleAddition={this.handleAddition}
        placeholder="Ajoutez un nouveau tag ici !"
      />
    );
  }
}

export default MyTags;
