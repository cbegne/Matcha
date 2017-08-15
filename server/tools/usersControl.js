import bcrypt from 'bcrypt-nodejs';
import moment from 'moment';
import * as User from './usersTools.js';

const filterProfileData = (profile, loggedUser) => {
  const loginProfile = profile.login;
  delete profile.password;
  if (loginProfile !== loggedUser) {
    delete profile.email;
  }
  return profile;
}

const verifChangePassword = (req) => {
  const { oldPassword, password, passwordConfirm } = req.body;

  let message = '';
  if (!oldPassword || !password || !passwordConfirm) {
    message = "Merci de remplir tous les champs !";
  } else {
    message = verifPassword(req);
  }
  return message;
}

const verifPassword = (req) => {
  const { password, passwordConfirm } = req.body;

  let message = '';
  if (!password.match(/^(?=.*[0-9])[a-zA-Z0-9]{6,24}$/)) {
    message = "Votre mot de passe doit être composé de 6 à 24 caractères, et contenir au moins une lettre et un chiffre.";
  } else if (password != passwordConfirm) {
    message = "Vos mots de passe ne sont pas identiques.";
  }
  return message;
}

const verifLogin = (req) => {
  const { login } = req.body;

  let message = '';
  if (login.length < 3 || login.length > 10 || !login.match(/^[a-z0-9]+$/i)) {
    message = "Votre login doit être composé de 3 à 10 caractères, et uniquement de chiffres ou de lettres.";
  }
  return message;
}

const verifInfos = (req) => {
  const { email, firstName, lastName, gender, orientation, birthDate } = req.body;

  const date = moment(birthDate, "DD/MM/YYYY", true);
  const age = -date.diff(moment(), 'years');
  console.log(birthDate);
  let message = '';
  if (!firstName.match(/^[-a-z' ]+$/i) || !lastName.match(/^[-a-z' ]+$/i)) {
    message = "Votre prénom ou votre nom n'est pas valide.";
  } else if (!email.match(/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
    message = "Votre email n'est pas valide.";
  } else if (!moment(date).isValid() || age > 140) {
    message = "Votre date de naissance n'est pas valide.";
  } else if (age < 18) {
    message = "Il faut avoir plus de 18 ans pour s'inscrire sur le site.";
  } else if ((gender !== 'male' && gender !== 'female')
  || (orientation != 'Bisexuel' && orientation != 'Homosexuel' && orientation != 'Hétérosexuel')) {
    message = "Une erreur est survenue. Revenez plus tard, nous allons résoudre le problème.";
  }
  return message;
}

const generateHash = (password) => {
  try {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  } catch (err) {
    console.error('Error: ', err)
    return null;
  }
};

const checkPasswordSignin = (dbPassword, password) => {
  try {
    return bcrypt.compareSync(password, dbPassword);
  } catch (err) {
    console.error('Error: ', err)
    return null;
  }
};

export {
  filterProfileData,
  verifChangePassword,
  verifPassword,
  verifLogin,
  verifInfos,
  generateHash,
  checkPasswordSignin,
};
