const mongoose = require("mongoose");
const City = require('./City');


const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.']
  },
  email: {
    type: String,
    required: [true, 'Please enter a working email.'],
    unique: true
  },
  password: {
    type: String,
    required: [true,'Please enter a password.']
  },
  city: [City.schema]
});

const User = mongoose.model('User', UserSchema)

module.exports = User;
