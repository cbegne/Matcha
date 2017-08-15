import React, { Component } from 'react';
import emptyProfile from '../../img/empty_profile.png';

class ShowPic extends Component {

  handleClick = (event) => {
    event.preventDefault();
    const filename = event.target.parentElement.id;
    this.props.onRemove(filename);
  }

  render() {
    const { multipleSrc, removeButtonOn } = this.props;

    if (!multipleSrc[0]) {
      return <img src={emptyProfile} className="one-additional-picture" alt="no-one" height="250" />;
    }
    const staticSrc = multipleSrc.map(src => ({ folder: `/static/${src}`, filename: src }));
    let finalSrc = [];
    if (removeButtonOn) {
      finalSrc = staticSrc.map(src => (
        <div key={src.filename} id={src.filename} className="additional-picture" >
          <button className="glyphicon glyphicon-remove" onClick={this.handleClick} />
          <img
            className="one-additional-picture"
            src={src.folder}
            alt="my-pic"
            height="250"
          />
        </div>
      ));
    } else {
      finalSrc = staticSrc.map(src => (
        <div key={src.filename} id={src.filename} className="additional-picture" >
          <img
            className="one-additional-picture"
            src={src.folder}
            alt="my-pic"
            height="250"
          />
        </div>
      ));
    }

    return <div className="all-additional-pictures">{ finalSrc }</div>;
  }
  }

export default ShowPic;
