import * as Getter from '../getters/getUsers.js';
import * as Updater from '../updaters/updateInteractions.js';
import * as User from '../tools/usersTools.js';

const addLike = async (req, res) => {
  const { loginLiked } = req.params;
  const login = User.getLoggedUser(req);
  const profile = await Getter.getUser({ field: 'login', value: login });
  const { likedBy } = profile;
  const logins = likedBy.map(elem => (elem.login));
  if (logins.includes(loginLiked) === true) {
    Updater.addLikeAndMatch({ login, req });
  } else {
    Updater.addLike({ login, req });
  }
  res.send({ success: true, message: '' });
};

const deleteLike = async (req, res) => {
  const login = User.getLoggedUser(req);
  Updater.deleteLikeAndMatch({ login, req });
  res.send({ success: true, message: '' });
};

const addBlock = (req, res) => {
  const { loginBlocked } = req.params;
  const login = User.getLoggedUser(req);
  Updater.addBlock({ login, loginBlocked });
  res.send({ success: true, message: '' });
};

const deleteBlock = (req, res) => {
  const { loginUnblocked } = req.params;
  const login = User.getLoggedUser(req);
  Updater.deleteBlock({ login, loginUnblocked });
  res.send({ success: true, message: '' });
};

const reportAsFake = (req, res) => {
  const { loginReported } = req.params;
  const login = User.getLoggedUser(req);
  Updater.reportAsFake({ login, loginReported });
  Updater.addBlock({ login, loginBlocked: loginReported });
  res.send({ success: true, message: '' });
};

export {
  addLike,
  deleteLike,
  addBlock,
  deleteBlock,
  reportAsFake,
};
