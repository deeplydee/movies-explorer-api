const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const UnauthorizedError = require('../helpers/errors/unauthorized-error');

const { credentialsErrorMessage } = require('../helpers/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.methods.toJSON = function hideCredentials() {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password,
  next,
) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    return next(new UnauthorizedError(credentialsErrorMessage));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new UnauthorizedError(credentialsErrorMessage));
  }

  return user;
};

module.exports = mongoose.model('user', userSchema);
