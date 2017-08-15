import axios from 'axios';
import React, { Component } from 'react';

import Block from '../components/Block.js';
import Like from '../components/Like.js';
import Report from '../components/Report.js';

class LikeBlockReport extends Component {

  state = {
    like: undefined,
    block: undefined,
    report: undefined,
  }

  addLike = () => {
    const { login } = this.props.profile;
    const url = `/api/add_like/${login}`;
    axios.put(url)
    .then(({ data }) => {
      const { success } = data;
      if (success === true) {
        this.setState({ like: true });
        global.socket.emit('like', login);
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  deleteLike = () => {
    const { login } = this.props.profile;
    const url = `/api/delete_like/${login}`;
    axios.put(url)
    .then(({ data }) => {
      const { success } = data;
      if (success === true) {
        this.setState({ like: false });
        global.socket.emit('dislike', login);
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  addBlock = () => {
    const { login } = this.props.profile;
    const url = `/api/add_block/${login}`;
    axios.put(url)
    .then(({ data }) => {
      const { success } = data;
      if (success === true) {
        this.setState({ block: true });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  deleteBlock = () => {
    const { login } = this.props.profile;
    const url = `/api/delete_block/${login}`;
    axios.put(url)
    .then(({ data }) => {
      const { success } = data;
      if (success === true) {
        this.setState({ block: false });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  reportAsFake = () => {
    const { login } = this.props.profile;
    const url = `/api/report_as_fake/${login}`;
    axios.put(url)
    .then(({ data }) => {
      const { success } = data;
      if (success === true) {
        this.setState({ report: true, block: true });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    const { login, profilePic } = this.props.loggedUser;
    const { likedBy, blockedBy, reportedAsFakeBy } = this.props.profile;
    const { like, block, report } = this.state;
    const likedByArray = likedBy.map(elem => (elem.login));

    const isLiked = (like === undefined) ? likedByArray.includes(login) : like;
    const isBlocked = (block === undefined) ? blockedBy.includes(login) : block;
    const isReported = (report === undefined) ? reportedAsFakeBy.includes(login) : report;
    const canLike = !!profilePic;

    return (
      <span>
        <Like
          isLiked={isLiked}
          canLike={canLike}
          isBlocked={isBlocked}
          isReported={isReported}
          onAddition={this.addLike}
          onDelete={this.deleteLike}
        />
        <Block
          isBlocked={isBlocked}
          isReported={isReported}
          onAddition={this.addBlock}
          onDelete={this.deleteBlock}
        />
        <Report
          isReported={isReported}
          onClick={this.reportAsFake}
        />
      </span>
    );
  }
}

export default LikeBlockReport;
