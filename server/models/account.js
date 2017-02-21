const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const account = new Schema({
  email: String,
  username: String,
  password: String,
});

account.plugin(passportLocalMongoose);

module.exports = mongoose.model('account', account);
