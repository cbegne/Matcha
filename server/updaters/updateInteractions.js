import Mongo from '../config/MongoConnection.js';
import moment from 'moment';

const addVisit = ({ loggedUser, req }) => {
  const { login } = req.params;
  const date = moment().format();

  Mongo.db.collection('users').updateOne(
    { login: loggedUser },
    {
      $push: { visits: login }
    },
  );
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $push:
      {
        visitedBy: { login: loggedUser, date },
        newVisitedBy: { login: loggedUser, date }
      },
    },
  );
}

const clearNewVisits = ({ login }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { newVisitedBy: [] },
    },
  );
}

const addLike = ({ login, req }) => {
  const { loginLiked } = req.params;
  const date = moment().format();

  Mongo.db.collection('users').updateOne(
    { login },
    {
      $push: { likes: loginLiked },
    },
  );
  Mongo.db.collection('users').updateOne(
    { login: loginLiked },
    {
      $push: { likedBy: { login, date } },
      $inc: { popularity: 1 },
      $addToSet: { newLikedBy: { login, date } },
    },
  );
}

const addLikeAndMatch = ({ login, req }) => {
  const { loginLiked } = req.params;
  const date = moment().format();

  Mongo.db.collection('users').updateOne(
    { login },
    {
      $push:
      {
        likes: loginLiked,
        matches: loginLiked,
      },
    },
  );
  Mongo.db.collection('users').updateOne(
    { login: loginLiked },
    {
      $push:
      {
        likedBy: { login, date },
        matches: login,
      },
      $inc: { popularity: 1 },
      $addToSet: { newLikedBy: { login, date } },
    },
  );
}

const changeMatchOrder = ({ login, matches }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { matches },
    },
  );
}

const clearNewLikes = ({ login }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { newLikedBy: [] },
    },
  );
}

const deleteLikeAndMatch = ({ login, req }) => {
  const { loginUnliked } = req.params;
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $pull:
      {
        likes: loginUnliked,
        matches: loginUnliked,
        unreadMessages: loginUnliked,
      }
    },
  );
  Mongo.db.collection('users').updateOne(
    { login: loginUnliked },
    {
      $pull:
      {
        likedBy: { login },
        matches: login,
        newLikedBy: { login },
        unreadMessages: login,
      },
      $inc: { popularity: -1 },
    },
  );
}

const addBlock = ({ login, loginBlocked }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $addToSet: { blockes: loginBlocked },
      $pull: { unreadMessages: loginBlocked }
    },
  );
  Mongo.db.collection('users').updateOne(
    { login: loginBlocked },
    {
      $addToSet: { blockedBy: login },
      $pull: { unreadMessages: login }
    },
  );
}

const deleteBlock = ({ login, loginUnblocked }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $pull: { blockes: loginUnblocked }
    },
  );
  Mongo.db.collection('users').updateOne(
    { login: loginUnblocked },
    {
      $pull: { blockedBy: login }
    },
  );
}

const reportAsFake = ({ login, loginReported }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $push:
      {
        reportsAsFake: loginReported,
      },
    },
  );
  Mongo.db.collection('users').updateOne(
    { login: loginReported },
    {
      $push:
      {
        reportedAsFakeBy: login,
      }
    },
  );
}

export {
  addVisit,
  clearNewVisits,
  addLike,
  addLikeAndMatch,
  changeMatchOrder,
  deleteLikeAndMatch,
  clearNewLikes,
  addBlock,
  deleteBlock,
  reportAsFake
}
