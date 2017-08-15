import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Handy from 'handy-notification';
import Cookies from 'universal-cookie';
import moment from 'moment';

import Nav from './Nav.js';

class Header extends Component {

  state = {
    nbVisits: 0,
    nbLikes: 0,
    nbMessages: 0,
    newVisitedBy: [],
    newLikedBy: [],
    unreadMessages: [],
  };

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get('access_token');
    this.socket = io('http://localhost:8000', { query: `token=${token}` });
    global.socket = this.socket;
    // this.socket.on('connect', () => {
    //   console.log('connected from the client side', this.socket.id);
    // });

    const { pathname } = this.props.location;
    if (pathname.includes('/profil')) {
      const loginSearch = pathname.split('/').pop();
      this.socket.emit('visit', loginSearch);
    }

    this.socket.on('visit', (login) => {
      Handy({ value: `${login} visite votre profil !` });
      const { newVisitedBy } = this.state;
      const indexInNewVisitedBy = newVisitedBy.findIndex(visit => visit.login === login);
      if (indexInNewVisitedBy === -1) {
        const date = moment().format();
        newVisitedBy.push({ login, date });
        this.setState(prevState => ({
          nbVisits: prevState.nbVisits + 1,
          newVisitedBy,
        }));
      }
    });

    this.socket.on('chat count', ({ toUser, fromUser }) => {
      if (window.location.pathname !== `/messages/${fromUser}`) {
        const { unreadMessages } = this.state;
        unreadMessages.push(fromUser);
        this.setState(prevState => ({
          nbMessages: prevState.nbMessages + 1,
          unreadMessages,
        }));
        this.addToCount({ toUser, fromUser });
      }
    });

    this.socket.on('like', (login) => {
      Handy({ value: `${login} vous a liké !` });
      const { newLikedBy } = this.state;
      const indexInNewLikedBy = newLikedBy.findIndex(like => like.login === login);
      if (indexInNewLikedBy === -1) {
        const date = moment().format();
        newLikedBy.push({ login, date });
        this.setState(prevState => ({
          nbLikes: prevState.nbLikes + 1,
          newLikedBy,
        }));
      }
    });

    this.socket.on('match', (login) => {
      Handy({ value: `${login} vous a également liké !</br>
      Vous pouvez lui parler sur le chat.` });
      const { newLikedBy } = this.state;
      const indexInNewLikedBy = newLikedBy.findIndex(like => like.login === login);
      if (indexInNewLikedBy === -1) {
        const date = moment().format();
        newLikedBy.push({ login, date });
        this.setState(prevState => ({
          nbLikes: prevState.nbLikes + 1,
          newLikedBy,
        }));
      }
    });

    this.socket.on('dislike', (login) => {
      Handy({ value: `${login} a supprimé son like.` });
      const { newLikedBy } = this.state;
      const indexInNewLikedBy = newLikedBy.findIndex(like => like.login === login);
      if (indexInNewLikedBy !== -1) {
        newLikedBy.splice(indexInNewLikedBy, 1);
        this.setState(prevState => ({
          nbLikes: prevState.nbLikes - 1,
          newLikedBy,
        }));
      }
    });

    this.getMyProfile();
  }

  componentWillReceiveProps = (nextProps) => {
    const { pathname } = nextProps.location;
    if (pathname.includes('/profil')) {
      const loginSearch = pathname.split('/').pop();
      this.socket.emit('visit', loginSearch);
    }
    if (pathname === '/likes') {
      const { nbLikes } = this.state;
      if (nbLikes !== 0) {
        this.setState({ nbLikes: 0, newLikedBy: [] });
      }
    }
    if (pathname === '/visites') {
      const { nbVisits } = this.state;
      if (nbVisits !== 0) {
        this.setState({ nbVisits: 0, newVisitedBy: [] });
      }
    }
    if (pathname.includes('/messages')) {
      const loginChat = pathname.split('/').pop();
      const { unreadMessages, nbMessages } = this.state;
      let i = 0;
      unreadMessages.forEach((login) => {
        if (login === loginChat) {
          i += 1;
        }
      });
      if (i !== 0) {
        const nbMessagesClean = nbMessages - i;
        const unreadMessagesClean = unreadMessages.filter(login => login !== loginChat);
        this.setState({ nbMessages: nbMessagesClean, unreadMessages: unreadMessagesClean });
      }
    }
  }

  getMyProfile = () => {
    const url = '/api/get_my_profile';
    axios.get(url)
    .then(({ data }) => {
      const { success } = data;
      if (success === true) {
        const { profile } = data;
        const { pathname } = this.props.location;
        const { newVisitedBy, newLikedBy, unreadMessages, blockedBy } = profile;
        const newVisitedByLogins = newVisitedBy.map(visit => visit.login);
        const newLikedByLogins = newLikedBy.map(like => like.login);
        const newVisitedOnce = newVisitedByLogins.filter((login, index, self) => {
          if (blockedBy.includes(login)) {
            return false;
          }
          return index === self.indexOf(login);
        });
        const newLikedOnce = newLikedByLogins.filter((login, index, self) => {
          if (blockedBy.includes(login)) {
            return false;
          }
          return index === self.indexOf(login);
        });
        const nbVisits = pathname === '/visites' ? 0 : newVisitedOnce.length;
        const newVisitedBySave = pathname === '/visites' ? [] : newVisitedBy;
        const nbLikes = pathname === '/likes' ? 0 : newLikedOnce.length;
        const newLikedBySave = pathname === '/likes' ? [] : newLikedBy;
        const nbMessages = unreadMessages.length;
        this.setState({
          nbVisits,
          nbLikes,
          newVisitedBy: newVisitedBySave,
          newLikedBy: newLikedBySave,
          nbMessages,
          unreadMessages,
        });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  addToCount = ({ toUser, fromUser }) => {
    const url = '/api/add_unread_message';
    const chat = Object.assign({}, { toUser }, { fromUser });
    axios.post(url, chat)
    .catch(err => console.error('Error: ', err));
  }

  render() {
    const { nbVisits, nbLikes, nbMessages } = this.state;

    return (
      <Nav
        nbVisits={nbVisits}
        nbLikes={nbLikes}
        nbMessages={nbMessages}
        history={this.props.history}
      />
    );
  }
}

export default Header;
