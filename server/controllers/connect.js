import randtoken from 'rand-token';
import mailer from './mail.js';
import * as Control from '../tools/usersControl.js';
import * as Getter from '../getters/getUsers.js';
import * as Updater from '../updaters/updateUsers.js';
import * as User from '../tools/usersTools.js';

const forgot = async (req, res) => {
  const { email } = req.params;
  const user = await Getter.getUser({ field: 'email', value: email });
  if (!user) {
    return res.send({
      success: false,
      message: 'Aucun utilisateur n\'est enregistré avec cet email.',
    });
  }
  const { login } = user;
  const confirmationKey = randtoken.generate(16);
  Updater.addConfirmationKeyForgot({ login, confirmationKey });
  mailer(email,
    `Bonjour ${login}, suivez ce lien pour changer votre mot de passe http://localhost:3000/change/${confirmationKey}`,
    'Matcha - Oubli identifiant ou mot de passe',
  );
  return res.send({
    success: true,
    message: 'Un mail vous a été envoyé réinitialiser votre mot de passe.',
  });
};

const newPassword = async (req, res) => {
  const { password, passwordConfirm, confirmationKey } = req.body;
  const user = await Getter.getUser({ field: 'confirmationKey', value: confirmationKey });
  if (!user) {
    return res.send({
      success: false,
      message: 'Ce lien ne correspond à aucun compte ou n\'est plus valide.',
    });
  }
  if (!password || !passwordConfirm) {
    return res.send({
      success: false,
      message: 'Merci de remplir tous les champs !',
    });
  }
  const message = Control.verifPassword(req);
  if (message !== '') {
    return res.send({ success: false, message });
  }
  const { login } = user;
  const passwordHash = Control.generateHash(password);
  Updater.changePasswordAndReset({ login, passwordHash });
  return res.send({ success: true, message: `Votre mot de passe a été mis à jour, ${login} !` });
};

const confirm = async (req, res) => {
  const { confirmationKey } = req.body;
  const user = await Getter.getUser({ field: 'confirmationKey', value: confirmationKey });
  if (!user) {
    return res.send({
      success: false,
      error: 'Ce lien ne correspond à aucun compte ou n\'est plus valide.',
    });
  }
  const { login } = user;
  const token = User.createToken(user);
  Updater.confirmSignup({ login });
  return res.send({ success: true, login, token, error: '' });
};

const signin = async (req, res) => {
  const { login, password } = req.body;
  const user = await Getter.getUser({ field: 'login', value: login });

  if (!user === true) {
    return res.send({
      success: false,
      message: 'Aucun utilisateur n\'est enregistré avec cet identifiant.',
    });
  }
  if (user.closed === true) {
    return res.send({
      success: false,
      message: 'Cet identifiant n\'est plus valide.',
    });
  }
  if (user.confirmationKey && user.auth === false) {
    return res.send({
      success: false,
      message: 'Votre compte n\'a pas été confirmé. Veuillez suivre le lien envoyé par mail.',
    });
  }
  const isSamePass = Control.checkPasswordSignin(user.password, password);
  if (!isSamePass) {
    return res.send({
      success: false,
      message: 'Votre mot de passe est incorrect.',
    });
  }
  const token = User.createToken(user);
  Updater.connectUser({ login });
  return res.send({ success: true, token, message: '' });
};

export { forgot, newPassword, confirm, signin };
