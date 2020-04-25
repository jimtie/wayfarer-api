const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const CitySchema = mongoose.Schema({
  name: String,
  description: String,
  image: String,
  posts: [{
    type: ObjectId,
    ref: 'Post'
  }],
});

const City = mongoose.model('City', CitySchema);

module.exports= City;
