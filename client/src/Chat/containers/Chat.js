import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ChatBox from '../components/ChatBox.js';
import Loading from '../../General/components/Loading.js';
import { UnavailablePage } from '../../General/components/NoPage.js';
import '../css/chat.css';

class Chat extends Component {

  state = {
    matches: [],
    unreadMessages: [],
    loaded: false,
    error: '',
  }

  componentDidMount() {
    const url = '/api/get_matches';
    axios.get(url)
    .then(({ data }) => {
      const { success, error } = data;
      if (success === true) {
        const { profile, profiles } = data;
        const { unreadMessages } = profile;
        this.setState({ matches: profiles, unreadMessages, loaded: true });
      } else {
        this.setState({ error, loaded: true });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    const { matches, unreadMessages, loaded, error } = this.state;
    let talks = [];
    matches.forEach((match) => {
      const { _id, login } = match;
      const indivKey = `chat_${_id}`;
      if (unreadMessages.includes(match.login) === true) {
        talks.push(
          <Link to={`/messages/${login}`} key={indivKey} className="chat-box new-chats">
            <ChatBox profile={match} />
          </Link>,
        );
      }
    });
    matches.forEach((match) => {
      const { _id, login } = match;
      const indivKey = `chat_${_id}`;
      if (unreadMessages.includes(match.login) === false) {
        talks.push(
          <Link to={`/messages/${login}`} key={indivKey} className="chat-box">
            <ChatBox profile={match} />
          </Link>,
        );
      }
    });

    if (talks.length === 0) {
      talks = <div>Vous n{"'"}avez pas encore de matchs. Allez liker des profils pour pouvoir chatter !</div>;
    }
    if (loaded === false) { return <Loading />; }
    if (error) { return <UnavailablePage />; }
    return (
      <div className="chats-container">
        <h2 className="title-likes">Chats</h2>
        {talks}
      </div>
    );
  }
}

export default Chat;
