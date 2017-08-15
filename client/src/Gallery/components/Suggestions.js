import React, { Component } from 'react';

import ProfileBoxSuggest from './ProfileBoxSuggest.js';

class Suggestions extends Component {

  render() {
    const { gallery, galleryFilter, filter } = this.props;
    const galleryToDisplay = (filter === false) ? gallery : galleryFilter;
    let display;
    if (galleryToDisplay.length === 0) {
      display = (
        <div className="search-no-profile">
          Oups... Aucun profil ne correspond à vos critères.
        </div>
      );
    } else {
      display = galleryToDisplay.map((profile) => {
        const { _id } = profile;
        return (
          <div className="profile-box" key={_id}>
            <ProfileBoxSuggest profile={profile} />
          </div>
        );
      });
    }

    return (
      <div className="all-likes">
        {display}
      </div>
    );
  }
}

export default Suggestions;
