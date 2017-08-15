import Mongo from '../config/MongoConnection.js';
import moment from 'moment';

const disconnectUser = ({ login }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { connected: false},
    },
  );
}

const reconnectUser = ({ login }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { connected: true},
    },
  );
}

const confirmSignup = ({ login }) => {
  const date = moment().format();
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $unset: { confirmationKey: '' },
      $set: { auth: true, connected: true, lastConnection: date  }
    },
  );
}

const addConfirmationKeyForgot = ({ login, confirmationKey }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { confirmationKey },
    }
  );
}

const connectUser = ({ login }) => {
  const date = moment().format();
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { auth: true, connected: true, lastConnection: date }
    }
  );
}

const changePasswordAndReset = ({ login, passwordHash }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $unset: { confirmationKey: '' },
      $set: { password: passwordHash }
    }
  );
}

const geolocate = ({ login, latitude, longitude }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { geolocation: { latitude, longitude } }
    }
  );
}

const closeProfile = ({ login }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { closed: true, connected: false, auth: false,  }
    }
  );
}

export {
  disconnectUser,
  reconnectUser,
  confirmSignup,
  addConfirmationKeyForgot,
  connectUser,
  changePasswordAndReset,
  geolocate,
  closeProfile,
}
