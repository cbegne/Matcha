import React, { Component } from 'react';
import emptyProfile from '../../Profile/img/empty_profile.png';

class ShowTinyProfilePic extends Component {

  render() {
    const { src, className } = this.props;
    const displaySrc = `/static/${src}`;

    switch (src !== '') {
      case true:
        return <img className={className} src={displaySrc} alt="" />;
      default:
        return <img className={className} src={emptyProfile} alt="" />;
    }
  }
}

export default ShowTinyProfilePic;
