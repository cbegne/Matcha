import ipInfo from 'ipinfo';
import * as Updater from '../updaters/updateUsers.js';
import * as User from '../tools/usersTools.js';

const geolocate = (req, res) => {
  const { latitude, longitude } = req.body;
  const login = User.getLoggedUser(req);
  if (latitude && longitude) {
    Updater.geolocate({ login, latitude, longitude });
    return res.send({ success: true, message: 'Votre localisation a été mise à jour!' });
  }
  ipInfo((err, cLoc) => {
    console.log(err || cLoc);
    if (err) {
      res.send({ success: false, message: "Nous n'avons pas réussi à vous géolocaliser..." });
    }
    const loc = cLoc.loc.split(',');
    const latitude = parseFloat(loc[0]);
    const longitude = parseFloat(loc[1]);
    Updater.geolocate({ login, latitude, longitude });
  });
  return res.send({ success: true, message: 'Votre localisation a été mise à jour!' });
}

export default geolocate;
