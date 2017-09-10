import Mongo from '../config/MongoConnection.js';

const getUser = async ({ field, value }) => {
  try {
    const user = await Mongo.db.collection('users').findOne({ [field]: value });
    return user;
  } catch (err) {
    console.error('Error: ', err)
    return null;
  }
};

const getUserExclBlocked = async (login, blockedFilter) => {
  try {
    const user = await Mongo.db.collection('users').findOne(
      {
        login:
        {
          $eq: login,
          $nin: blockedFilter,

        },
        auth: true,
      },
    );
    return user;
  } catch (err) {
    console.error('Error: ', err)
    return null;
  }
};

const getProfilesIn = async (logins, blockedFilter) => {
  try {
    const users = await Mongo.db.collection('users').find(
      { login:
      {
        $in: logins,
        $nin: blockedFilter,
      },
      },
      {
        email: 0,
        password: 0,
      },
    ).toArray();
    return users;
  } catch (err) {
    console.error('Error: ', err)
    return null;
  }
};

const allUsersSuggested = async (genderSearch, orientationSearch, blockedFilter) => {
  try {
    const users = await Mongo.db.collection('users').find(
      {
        login: { $nin: blockedFilter },
        gender: { $in: genderSearch },
        orientation: { $in: orientationSearch },
        auth: true,
      },
      {
        email: 0,
        password: 0,
      },
    ).toArray();
    return users;
  } catch (err) {
    console.error('Error: ', err)
    return null;
  }
};

export {
  getUser,
  getUserExclBlocked,
  getProfilesIn,
  allUsersSuggested,
};
