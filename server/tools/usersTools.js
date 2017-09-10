import jwt from 'jsonwebtoken';

const createToken = (user) => {
  const { login, _id } = user;
  const token = jwt.sign(
    { login, _id }, // payload
    process.env.SESSION_SECRET, // secret code used to verify authenticity of token
    { expiresIn: '7d' },
  );
  return token;
};

const authLoggedUser = (req, res, next) => {
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.SESSION_SECRET);
  if (!decoded) {
    return res.send({
      success: false,
      error: 'Identification impossible.',
    });
  }
  return next();
};

const getLoggedUser = (req) => {
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.SESSION_SECRET);
  return decoded.login;
};

export { createToken, getLoggedUser, authLoggedUser };
