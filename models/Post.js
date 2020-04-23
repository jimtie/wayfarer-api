const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  city: {
    type: ObjectId,
    ref: 'City'
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports= Post;
