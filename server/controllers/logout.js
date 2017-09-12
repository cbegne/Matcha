import { getLoggedUser } from '../tools/usersTools.js';
import { disconnectUser } from '../updaters/updateUsers.js';

const logout = (req, res) => {
  const login = getLoggedUser(req);
  disconnectUser({ login });
  res.end();
};

export default logout;
