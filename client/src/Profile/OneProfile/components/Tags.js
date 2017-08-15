import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const Tags = (props) => {
  const { tags } = props.profile;

  return (
    <div className="each-box">
      <h2>Tags</h2>
      <ReactTags
        className="ReactTags__tags"
        tags={tags}
        readOnly
      />
    </div>
  );
};

export default Tags;
