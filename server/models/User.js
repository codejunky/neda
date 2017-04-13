const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  email: String,
  username: String,
  password: String,
  cityOfResidence: { type: String, default: '' },
  countryOfResidence: { type: String, default: '' },
  availability: { type: Array, default: [] },
  dateAdded: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now },
  slug: { type: String, default: '' },
});

User.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', User);
