//  import express from 'express'
import passport from 'passport';
import User from '../models/User';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { logout, postLogin, postRegister } from './routes-helpers';

// JWT options
const opts = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'blahblah',
};
// payload is decoded token, use it to check if it is a valid token
const jwtLogin = new Strategy(opts, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); } // catch db err
    if (!user) { return done(null, false); } // user doesn't exist with given ID
    return done(null, user); // all good -> return user
  });
});

passport.use(jwtLogin);

module.exports = function application(app) {
  app.use(require('body-parser').urlencoded({ extended: true }));

  // app.get('/register', getRegister);
  // app.get('/login', getLogin);
  // app.get('/profile', getProfile);

  app.delete('/logout', logout);
  app.post('/register', postRegister);

  app.post('/login',
    passport.authenticate('local', { session: false }),
    postLogin);
};

