import fs from 'fs';

import * as Getter from '../getters/getUsers.js';
import * as Updater from '../updaters/updateProfile.js';
import * as User from '../tools/usersTools.js';

const addProfilePic = async (req, res) => {
  if (req.file === undefined) {
    return res.send({
      success: false,
      message: 'Votre photo doit être au format jpeg ou png.',
    });
  }
  const login = User.getLoggedUser(req);
  const profile = await Getter.getUser({ field: 'login', value: login });
  const filename = profile.profilePic;
  if (filename) {
    const path = `${__dirname}/../public/uploads/${filename}`;
    if (fs.existsSync(path)) {
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return res.send({
            success: false,
            message: 'Une erreur est survenue. Revenez plus tard, nous allons résoudre le problème.',
          });
        }
      });
    }
  }
  Updater.updateProfilePic({ login, req });
  return res.send({ success: true, profilePicName: req.file.filename, message: '' });
};

const addPics = (req, res) => {
  if (req.files === undefined) {
    return res.send({
      success: false,
      message: 'Vos photos doivent être au format jpeg ou png.',
    });
  }
  const login = User.getLoggedUser(req);
  const picsFilename = req.files.map(pic => pic.filename);
  const checkOneName = picsFilename.filter((pic, index, self) => (
    index === self.indexOf(pic)
  ));
  Updater.updatePics({ login, picsFilename: checkOneName });
  return res.send({ success: true, picNames: checkOneName, message: '' });
};

const removePic = (req, res) => {
  const login = User.getLoggedUser(req);
  const { filename } = req.body;
  const path = `${__dirname}/../public/uploads/${filename}`;
  if (fs.existsSync(path)) {
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return res.send({
          success: false,
          message: 'Une erreur est survenue. Revenez plus tard, nous allons résoudre le problème.',
        });
      }
    });
  }
  Updater.removePic({ login, filename });
  return res.send({ success: true, message: '' });
};

export { addProfilePic, addPics, removePic };
