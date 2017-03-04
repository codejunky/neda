import jwt from 'jwt-simple';
import Account from '../models/Account';

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

function getRegister(req, res) { res.send('Register page'); }

function getLogin(req, res) { res.send('Login page ' + req.user); }

function getProfile(req, res) { res.send('Successful login. This is your profile ' + JSON.stringify(req.body)); }

function getLogout(req, res) { req.logout(); res.send('Successful logout'); }

function postLogin(req, res) {
  res.send({
    token: tokenForUserAccount(req.user),
    user: setUserAccountInfo(req.user) });
}

function postRegister(req, res) {
  const userAccount = new Account({ username: req.body.username });
  Account.register(userAccount, req.body.password, (err) => {
    let response = {};
    if (err) { response = res.send(err);
    } else { response = res.json({ token: tokenForUserAccount(userAccount), user: setUserAccountInfo(userAccount) }); }
    return response;
  });
}

export { getRegister, getLogin, getProfile, getLogout, postLogin, postRegister };
