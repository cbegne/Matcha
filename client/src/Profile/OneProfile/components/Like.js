import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import TooltipSpan from './TooltipSpan.js';

class Like extends Component {

  handleAddition = () => {
    this.props.onAddition();
  }

  handleDelete = () => {
    this.props.onDelete();
  }

  render() {
    const { isLiked, canLike, isBlocked, isReported } = this.props;
    const tooltipCannotLike = (
      <Tooltip id="cannot-like">Impossible de liker un profil sans photo de profil !</Tooltip>
    );
    const tooltipLike = (
      <Tooltip id="like">Likez ce profil pour pouvoir lui parler
        s{"'"}il vous like également !</Tooltip>
    );

    if (isBlocked || isReported) {
      return <span className="fa fa-star cannot-like" />;
    }
    if (!canLike) {
      return <TooltipSpan className="fa fa-star cannot-like" tooltip={tooltipCannotLike} />;
    }
    if (isLiked) {
      return <button className="fa fa-star liked" onClick={this.handleDelete} />;
    }
    return (
      <OverlayTrigger placement="bottom" overlay={tooltipLike}>
        <button
          className="fa fa-star-o"
          onClick={this.handleAddition}
        />
      </OverlayTrigger>
    );
  }
}

export default Like;
