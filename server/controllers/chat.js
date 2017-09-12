import { ObjectID } from 'mongodb';
import * as ChatGetter from '../getters/getChats.js';
import * as ChatUpdater from '../updaters/updateChats.js';
import * as Updater from '../updaters/updateInteractions.js';
import * as Getter from '../getters/getUsers.js';
import * as User from '../tools/usersTools.js';

const changeMatchOrder = async ({ login1, login2 }) => {
  const profile = await Getter.getUser({ field: 'login', value: login1 });
  const { matches, unreadMessages } = profile;
  if (unreadMessages.includes(login2)) {
    const index = matches.indexOf(login2);
    if (index !== matches.length - 1) {
      matches.splice(index, 1);
      matches.push(login2);
      Updater.changeMatchOrder({ login: login1, matches });
    }
  }
};

const getChatProfile = async (req, res) => {
  const { login } = req.params;
  const loggedUser = User.getLoggedUser(req);
  const profileLoggedUser = await Getter.getUser({ field: 'login', value: loggedUser });
  const { matches, blockedBy } = profileLoggedUser;
  if (matches.includes(login) === false || blockedBy.includes(login) === true) {
    return res.send({ success: false, error: 'Pas de match.' });
  }
  const profile = await Getter.getUser({ field: 'login', value: login });
  const profileFilter = {
    login,
    profilePic: profile.profilePic,
    connected: profile.connected,
    auth: profile.auth,
  };
  const { profilePic, connected, blockes } = profileLoggedUser;
  const loggedUserFilter = { login: loggedUser, profilePic, connected, blockes };
  const chats = await ChatGetter.getChats(login, loggedUser);
  const discussion = chats === null ? [] : chats.discussion;
  await changeMatchOrder({ login1: loggedUser, login2: login });
  ChatUpdater.clearNewMessages({ login, loggedUser });
  return res.send({
    success: true,
    profile: profileFilter,
    loggedUser: loggedUserFilter,
    discussion,
    error: '',
  });
};

const addMessage = async (req, res) => {
  const { login, message } = req.body;
  const loggedUser = User.getLoggedUser(req);
  const chats = await ChatGetter.getChats(login, loggedUser);
  if (chats === null) {
    ChatUpdater.createDiscussion({ login1: loggedUser, login2: login, message });
  } else {
    const discussionId = chats._id;
    ChatUpdater.addMessage({ _id: discussionId, login: loggedUser, message });
  }
  changeMatchOrder({ login1: login, login2: loggedUser });
  return res.send({
    success: true,
  });
};

const addUnreadMessage = async (req, res) => {
  const { toUser, fromUser } = req.body;
  ChatUpdater.increaseNewMessages({ toUser, fromUser });
  res.end();
};

export {
  getChatProfile,
  addMessage,
  addUnreadMessage,
};
