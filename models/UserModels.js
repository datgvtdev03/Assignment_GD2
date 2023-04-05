const mongoose = require('mongoose');
const AccountSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100,
  },
  avatar: {
    type: String
  },
  admin: {
    type: Boolean,
    default: false
  }
}, {timestamps: true}); //cho biet user dc tao khi nao

const User = mongoose.model('account', AccountSchema);
module.exports = User;