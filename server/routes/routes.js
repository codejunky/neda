//  import express from 'express'
import passport from 'passport';
import account from '../models/account';
//  import routesHelpers from './routes-helpers'
import jwt from 'jwt-simple';

function tokenForUserAccount(account) {
  const timestamp = new Date().getTime();
  // iat = issued at time
  // sub = identifying characteristic
  return jwt.encode({ sub: account._id, iat: timestamp }, 'blahblah');
}


module.exports = function (app) {
  app.use(require('body-parser').urlencoded({ extended: true }));

  app.get('/register', function (req, res) { res.send('Register page'); });
  app.get('/login', function (req, res) { res.send('Login page'); });
  app.get('/profile', function (req, res) { res.send('Successful login. This is your profile'); });
  app.get('/logout', function (req, res) { req.logout(); res.send('Successful logout'); });

  app.post('/register', function (req, res) {
    const userAccount = new account({ username: req.body.username });
    account.register(userAccount, req.body.password, function (err, account) {
      if (err) {
        return res.send(err);
      }
    });
    passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/login' });
    res.json({
      token: tokenForUserAccount(userAccount),
      user: userAccount });
  });

  app.post('/login', passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/login' }));
};

