import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ChatBox from '../components/ChatBox.js';
import Loading from '../../General/components/Loading.js';
import Messages from './Messages.js';
import { UnavailablePage } from '../../General/components/NoPage.js';
import '../css/chat.css';

class ChatPage extends Component {

  constructor(props) {
    super(props);
    const path = this.props.location.pathname;
    const loginSearch = path.split('/').pop();
    this.state = {
      loginSearch,
      loggedUser: {},
      profile: {},
      discussion: [],
      error: '',
      loaded: false,
    };
  }

  componentDidMount() {
    this.getProfile(this.state.loginSearch);
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location;
    const loginSearch = pathname.split('/').pop();
    this.setState({ loaded: false, loginSearch });
    this.getProfile(loginSearch);
  }

  getProfile = (loginSearch) => {
    const url = `/api/get_chatter/${loginSearch}`;
    axios.get(url)
    .then(({ data }) => {
      const { success, error } = data;
      if (success === true) {
        const { profile, loggedUser, discussion } = data;
        this.setState({ profile, loggedUser, discussion, loaded: true });
      } else {
        this.setState({ error, loaded: true });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    const { loggedUser, profile, discussion, loaded, error } = this.state;

    if (loaded === false) { return <Loading />; }
    if (error) { return <UnavailablePage />; }
    return (
      <div className="chats-container">
        <h2 className="title-likes">Messages</h2>
        <div className="chat-container">
          <Link to={`/profil/${profile.login}`} className="chat-box">
            <ChatBox profile={profile} />
          </Link>
          <Messages discussion={discussion} profile={profile} loggedUser={loggedUser} />
        </div>
      </div>
    );
  }
}

export default ChatPage;
