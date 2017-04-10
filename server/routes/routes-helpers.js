import jwt from 'jwt-simple';
import User from '../models/User';

function tokenForUserAccount(request) {
  const timestamp = new Date().getTime();
  // iat = issued at time
  // sub = identifying characteristic
  return jwt.encode({ sub: request._id, iat: timestamp }, 'blahblah');
}

function setUserAccountInfo(request) {
  const getUserInfo = {
    _id: request._id,
    username: request.username,
    email: request.email,
  };

  return getUserInfo;
}

function logout(req, res) {
  req.logout();
  return res.json({
    message: 'Logout successful',
  });
}

function postLogin(req, res) {
  res.send({
    token: tokenForUserAccount(req.user),
    user: setUserAccountInfo(req.user) });
}

function postRegister(req, res) {
  let response = {};

  User.find({ $or: [{ email: req.body.email }, { username: req.body.username }] }, (findErr, alreadyRegisteredUsers) => {
    if (findErr) {
      response = res.json({ errors: { dberror: findErr } });
      return response;
    } else if (alreadyRegisteredUsers.length > 0) {
      const errors = {};
      alreadyRegisteredUsers.forEach((arU) => {
        if (arU.email === req.body.email) {
          errors.email = 'This email address is already in use.';
        }
        if (arU.username === req.body.username) {
          errors.username = 'This username is already in use.';
        }
      });
      response = res.json({ errors });
      return response;
    }

    const userAccount = new User({ email: req.body.email, username: req.body.username });
    User.register(userAccount, req.body.password, (registerErr) => {
      if (registerErr) {
        response = res.json({ errors: { dberror: registerErr } });
      } else {
        response = res.json({ token: tokenForUserAccount(userAccount), user: setUserAccountInfo(userAccount) });
      }
      return response;
    });
    return response;
  });
}

export { logout, postLogin, postRegister };
