const mongoose = require('mongoose');
const { isEmail } = require('validator/lib/isEmail');

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
    default: 'Александр',
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
