import ipInfo from 'ipinfo';
import moment from 'moment';
import randtoken from 'rand-token';

import mailer from './mail.js';
import * as Control from '../tools/usersControl.js';
import * as Getter from '../getters/getUsers.js';
import Mongo from '../config/MongoConnection.js';

const signup = async (req, res) => {
  // extraction of info from request and verification that no user already exists with that login
  const {
    login,
    email,
    password,
    passwordConfirm,
    firstName,
    lastName,
    gender,
    orientation,
    birthDate,
  } = req.body;

  if (!login || !email || !password || !passwordConfirm || !firstName
    || !lastName || !gender || !orientation || !birthDate) {
    return res.send({
      success: false,
      message: 'Merci de remplir tous les champs !',
    });
  }
  let unique = await Getter.getUser({ field: 'login', value: login });
  if (unique) {
    return res.send({
      success: false,
      message: 'Cet identifiant est déjà utilisé.',
    });
  }
  unique = await Getter.getUser({ field: 'email', value: email });
  if (unique) {
    return res.send({
      success: false,
      message: 'Un compte existe déjà avec cet email.',
    });
  }

  // verification on the User input, return a message if not valid
  let verif = Control.verifLogin(req);
  if (verif !== '') {
    return res.send({ success: false, message: verif });
  }
  verif = Control.verifInfos(req);
  if (verif !== '') {
    return res.send({ success: false, message: verif });
  }
  verif = Control.verifPassword(req);
  if (verif !== '') {
    return res.send({ success: false, message: verif });
  }

  // create a user in the database and return a confirmation that an email has been sent
  const confirmationKey = randtoken.generate(16);
  const passwordHash = Control.generateHash(password);
  ipInfo((err, cLoc) => {
    let latitude;
    let longitude;
    if (err === null) {
      const loc = cLoc.loc.split(',');
      latitude = parseFloat(loc[0]);
      longitude = parseFloat(loc[1]);
    } else {
      latitude = 0;
      longitude = 0;
    }
    const date = moment(birthDate, 'DD/MM/YYYY', true).format();
    Mongo.db.collection('users').insertOne({
      login,
      email,
      password: passwordHash,
      firstName,
      lastName,
      gender,
      orientation,
      birthDate: date,
      confirmationKey,
      bio: '',
      tags: [],
      geolocation: { latitude, longitude },
      profilePic: '',
      pictures: [],
      likes: [],
      likedBy: [],
      newLikedBy: [],
      matches: [],
      popularity: 0,
      blockes: [],
      blockedBy: [],
      visits: [],
      visitedBy: [],
      newVisitedBy: [],
      reportsAsFake: [],
      reportedAsFakeBy: [],
      unreadMessages: [],
      connected: false,
      auth: false,
      closed: false,
    });
  });
  mailer(email,
    `Bienvenue ${login}, suivez ce lien pour valider votre compte http://localhost:3000/auth/${confirmationKey}`,
    'Matcha - Validez votre compte',
  );
  return res.send({
    success: true,
    message: 'Un mail vous a été envoyé pour confirmer votre compte !',
  });
};

export default signup;
