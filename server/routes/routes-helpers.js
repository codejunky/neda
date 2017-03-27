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
  const userAccount = new User({ email: req.body.email, username: req.body.username });
  User.register(userAccount, req.body.password, (err) => {
    let response = {};
    if (err) {
      response = res.send(err);
    } else { response = res.json({ token: tokenForUserAccount(userAccount), user: setUserAccountInfo(userAccount) }); }
    return response;
  });
}

export { logout, postLogin, postRegister };
