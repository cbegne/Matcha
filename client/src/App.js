import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import Chat from './Chat/containers/Chat.js';
import ChatPage from './Chat/containers/ChatPage.js';
import Header from './General/containers/Header.js';
import Footer from './General/components/Footer.js';
import Gallery from './Gallery/containers/GalleryContainer.js';
import Likes from './Likes/containers/LikesContainer.js';
import { UnavailablePage } from './General/components/NoPage.js';
import { PrivateRoute } from './PrivateRoute.js';
import Profile from './Profile/ProfileContainer.js';
import Visits from './Visits/containers/VisitsContainer.js';

class App extends Component {

  render() {
    return (
      <div>
        <Header location={this.props.location} history={this.props.history} />
        <Switch>
          <PrivateRoute path="/profil/:login" component={Profile} />
          <PrivateRoute path="/likes" component={Likes} />
          <PrivateRoute path="/visites" component={Visits} />
          <PrivateRoute path="/galerie" component={Gallery} />
          <PrivateRoute path="/messages/:login" component={ChatPage} />
          <PrivateRoute path="/messages" component={Chat} />
          <PrivateRoute component={UnavailablePage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
