const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const Image = require('./Image');

const CitySchema = mongoose.Schema({
  name: String,
  description: String,
  images: {
    carousel: Image.schema,
    icon: Image.schema,
    header: Image.schema,
  },
  posts: [{
    type: ObjectId,
    ref: 'Post'
  }],
});

const City = mongoose.model('City', CitySchema);

module.exports = City;
