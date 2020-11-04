const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email.'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter valid email.'],
  },
  password: {
    type: String,
    required: [true, 'Please enter an password'],
    minlength: [6, 'Minimum length should be six symbols.'],
  },
});
//  fire function before doc saved to DB
userSchema.post('save', function (doc, next) {
  console.log('New user was created and saved.', doc);
  next();
});

//  fire function after doc saved to DB
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  
  console.log('User about to be created and saved', this);
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
