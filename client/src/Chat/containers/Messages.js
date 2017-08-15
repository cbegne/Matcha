import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales';
import React, { Component } from 'react';

import InputMessage from '../components/InputMessage.js';
import Message from '../components/Message.js';

class Messages extends Component {

  state = {
    discussion: this.props.discussion,
    message: '',
  }

  componentDidMount() {
    global.socket.on('chat message', ({ toUser, fromUser, message }) => {
      const { discussion } = this.state;
      const loggedUser = this.props.loggedUser.login;
      const loginChat = this.props.profile.login;
      if ((toUser === loggedUser && fromUser === loginChat)
      || (toUser === loginChat && fromUser === loggedUser)) {
        discussion.push({ author: fromUser, posted: moment(), text: message });
        this.setState({ discussion, message: '' });
      }
    });
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    global.socket.off('chat message');
  }

  scrollToBottom = () => {
    this.node.scrollIntoView();
  }

  saveState = (name, value) => {
    this.setState({ [name]: value });
  }

  saveMessage = () => {
    const { message } = this.state;
    const loginChat = this.props.profile.login;
    const loggedUser = this.props.loggedUser.login;
    global.socket.emit('chat message', { toUser: loginChat, fromUser: loggedUser, message });
    global.socket.emit('chat count', { toUser: loginChat, fromUser: loggedUser });
    const url = '/api/message';
    const chat = Object.assign({}, { message }, { login: loginChat });
    axios.post(url, chat)
    .catch(err => console.error('Error: ', err));
  }

  render() {
    const { discussion, profile, loggedUser } = this.props;
    const timeIndexes = [];
    // show time if difference between 2 messages is bigger than 15 minutes
    discussion.forEach((message, index, array) => {
      const { posted } = message;
      if (index !== 0) {
        const nextPosted = array[index - 1].posted;
        const diff = moment(posted).diff(nextPosted, 'minutes');
        if (diff > 15) {
          timeIndexes.push(index);
        }
      }
    });
    const messages = discussion.map((message, index) => {
      const id = `message_${index}`;
      const { posted } = message;
      let showTime;
      if (timeIndexes.includes(index) || index === 0) {
        let time;
        if (moment().diff(posted, 'days') > 0) {
          time = moment(posted).locale('fr-fr').format('D MMMM H:mm');
          showTime = <div className="time"><b>{time}</b></div>;
        } else {
          time = moment(posted).locale('fr-fr').format('H:mm');
          showTime = <div className="time"><b>{time}</b></div>;
        }
      }
      return (
        <div key={id}>
          {showTime}
          <Message loggedUser={loggedUser} profile={profile} message={message} />
        </div>
      );
    });

    if (profile.auth === false) {
      return (
        <div>
          <div className="chat-closed">
            Cet utilisateur a fermé son compte.
          </div>
          <div className="all-messages">
            {messages}
          </div>
          <div ref={node => (this.node = node)} />
        </div>
      );
    }
    if (loggedUser.blockes.includes(profile.login)) {
      return (
        <div>
          <div className="chat-closed">
            Vous avez bloqué cet utilisateur.
          </div>
          <div className="all-messages">
            {messages}
          </div>
          <div ref={node => (this.node = node)} />
        </div>
      );
    }
    return (
      <div>
        <div className="all-messages">
          {messages}
          <div ref={node => (this.node = node)} />
        </div>
        <InputMessage onSubmit={this.saveMessage} onChange={this.saveState} />
      </div>
    );
  }
}

export default Messages;
