import * as Updater from '../updaters/updateProfile.js';
import * as Control from '../tools/usersControl.js';
import * as Getter from '../getters/getUsers.js';
import * as User from '../tools/usersTools.js';

const changeInfos = (req, res) => {
  const verif = Control.verifInfos(req);
  if (verif !== '') {
    return res.send({ success: false, message: verif, error: '' });
  }
  const login = User.getLoggedUser(req);
  Updater.updateInfos({ login, req });
  return res.send({ success: true, message: 'Votre profil a été mis à jour.', error: '' });
};

const changeBio = (req, res) => {
  const login = User.getLoggedUser(req);
  Updater.updateBio({ login, req });
  return res.send({ success: true, message: 'Votre profil a été mis à jour.', error: '' });
};

const changeTags = (req, res) => {
  const login = User.getLoggedUser(req);
  Updater.updateTags({ login, req });
  return res.send({ success: true, message: 'Votre profil a été mis à jour.', error: ''});
}

const changePassword = async (req, res) => {
  const verif = Control.verifChangePassword(req);
  if (verif !== '') {
    return res.send({ success: false, message: verif, error: '' });
  }
  const login = User.getLoggedUser(req);
  const user = await Getter.getUser({ field: 'login', value: login });
  const dbPassword = user.password;
  const { oldPassword, password } = req.body;
  const isSamePass = Control.checkPasswordSignin(dbPassword, oldPassword);
  if (!isSamePass) {
    return res.send({
      success: false,
      message: 'Votre ancien mot de passe est incorrect.',
      error: '',
    });
  }
  const passwordHash = Control.generateHash(password);
  Updater.changePassword({ login, passwordHash });
  return res.send({ success: true, message: 'Votre mot de passe a été mis à jour.', error: '' });
};

export { changeInfos, changeBio, changeTags, changePassword };
