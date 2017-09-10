import Mongo from '../config/MongoConnection.js';

const getChats = async (login1, login2) => {
  try {
    const chats = await Mongo.db.collection('chats').findOne(
      {
        $or: [{ login1, login2 }, { login1: login2, login2: login1 }],
      });
    return chats;
  } catch (err) {
    console.error('Error: ', err)
    return null;
  }
};

export { getChats };
