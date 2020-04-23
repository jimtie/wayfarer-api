const mongoose = require('mongoose');
const Post = require('./Post');
const routes = require('../controllers');


const CitySchema = mongoose.Schema({
  name: String,
  description: String,
  image: String,
  posts: [Post.schema],
});

const City = mongoose.model('City', CitySchema);

module.exports= City;
