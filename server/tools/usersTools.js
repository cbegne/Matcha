import jwt  from 'jsonwebtoken';
import config from '../config/config.js';

const createToken = (user) => {
  const { login, _id } = user;
  const token = jwt.sign(
    { login, _id }, // payload
    config.secret, // secret code used to verify authenticity of token
    { expiresIn: '7d'}
  );
  return token;
}

const authLoggedUser = (req, res, next) => {
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, config.secret);
  if (!decoded) {
    return res.send({
      success: false,
      error: 'Identification impossible.',
    });
  }
  next();
}

const getLoggedUser = (req) => {
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, config.secret);
  return decoded.login;
}

export { createToken, getLoggedUser, authLoggedUser };
