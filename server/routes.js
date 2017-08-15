import * as Connect from './controllers/connect.js';
import * as Change from './controllers/changeProfile.js';
import * as Chat from './controllers/chat.js';
import * as Getter from './getters/getUsers.js';
import * as Profile from './controllers/profile.js';
import * as Interact from './controllers/interact.js';
import * as Picture from './controllers/pictures.js';
import * as User from './tools/usersTools.js';
import gallery from './controllers/gallery.js';
import geolocate from './controllers/geolocate.js';
import logout from './controllers/logout.js';
import signup from './controllers/signup.js';
import initDb from './config/initDb.js';

const routes = (app, upload) => {
  app.get('/api/init_db', initDb); // en dev, initialisation base de données

  app.post('/api/signup', signup);
  app.post('/api/signin', Connect.signin);
  app.post('/api/confirm', Connect.confirm);
  app.put('/api/forgot/:email', Connect.forgot);
  app.post('/api/reinit_password', Connect.newPassword);

  app.use('/api', User.authLoggedUser);

  app.post('/api/geolocate', geolocate);

  app.post('/api/update_infos', Change.changeInfos);
  app.post('/api/change_password', Change.changePassword);
  app.post('/api/tags', Change.changeTags);
  app.post('/api/bio', Change.changeBio);

  app.post('/api/add_profile_pic', upload.single('profilePic'), Picture.addProfilePic);
  app.post('/api/add_pics', upload.array('pics'), Picture.addPics);
  app.post('/api/remove_pic', Picture.removePic);

  app.put('/api/add_like/:loginLiked', Interact.addLike);
  app.put('/api/delete_like/:loginUnliked', Interact.deleteLike);
  app.put('/api/add_block/:loginBlocked', Interact.addBlock);
  app.put('/api/delete_block/:loginUnblocked', Interact.deleteBlock);
  app.put('/api/report_as_fake/:loginReported', Interact.reportAsFake);

  app.get('/api/get_my_profile', Profile.getMyProfile);
  app.get('/api/getuser/:login', Profile.getProfile);
  app.get('/api/get_likes', Profile.getVisitsOrLikesOrMatches('like'));
  app.get('/api/get_visits', Profile.getVisitsOrLikesOrMatches('visit'));
  app.put('/api/close', Profile.closeProfile);

  app.get('/api/get_matches', Profile.getVisitsOrLikesOrMatches('match'));
  app.get('/api/get_chatter/:login', Chat.getChatProfile);
  app.post('/api/message', Chat.addMessage);
  app.post('/api/add_unread_message', Chat.addUnreadMessage);

  app.post('/api/get_gallery', gallery);

  app.put('/api/logout', logout);
};

export default routes;
