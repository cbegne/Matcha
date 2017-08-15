import React, { Component } from 'react';

class MyGeolocate extends Component {

  handleClick = () => {
    this.props.onClick();
  }

  render() {
    return (
      <div className="each-box geolocate">
        <h2>Localisation</h2>
        <div className="geolocate-text">Pour voir les profils autour de vous actuellement,
          vous pouvez vous re-géolocaliser.
        </div>
        <button className="btn btn-default" onClick={this.handleClick}>
          Je suis ici!
        </button>
      </div>
    );
  }
}

export default MyGeolocate;
