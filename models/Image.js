const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  credit: {
    name: String,
    url: String,
    site: String,
  },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
