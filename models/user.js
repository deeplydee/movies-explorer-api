const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const UnauthorizedError = require('../helpers/errors/unauthorized-error');

const { CREDENTIALS_ERR_MESSAGE } = require('../helpers/constants');

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

userSchema.set('toJSON', {
  transform(doc, ret) {
    const newRet = ret;
    delete newRet.password;
    return newRet;
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(
  email,
  password,
  next,
) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    return next(new UnauthorizedError(CREDENTIALS_ERR_MESSAGE));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new UnauthorizedError(CREDENTIALS_ERR_MESSAGE));
  }

  return user;
};

module.exports = mongoose.model('user', userSchema);
