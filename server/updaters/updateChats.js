import moment from 'moment';
import Mongo from '../config/MongoConnection.js';

const addMessage = ({ _id, login, message }) => {
  Mongo.db.collection('chats').updateOne(
    { _id },
    {
      $push:
      {
        discussion:
        {
          posted: moment().format(),
          author: login,
          text: message
        }
      },
    },
    { upsert: true },
  );
}

const createDiscussion = ({ login1, login2, message }) => {
  Mongo.db.collection('chats').insert(
    { login1,
      login2,
      discussion:
      [{
        posted: moment().format(),
        author: login1,
        text: message
      }]
    },
  );
}

const increaseNewMessages = ({ toUser, fromUser }) => {
  Mongo.db.collection('users').updateOne(
    { login: toUser },
    {
      $push:
      {
        unreadMessages: fromUser
      },
    },
  );
}

const clearNewMessages = ({ login, loggedUser }) => {
  Mongo.db.collection('users').updateOne(
    { login: loggedUser },
    {
      $pull:
      {
        unreadMessages: login
      },
    },
  );
}

export {
  addMessage,
  createDiscussion,
  increaseNewMessages,
  clearNewMessages,
}
