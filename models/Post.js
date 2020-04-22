const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: String,
  content: String
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports= Post;
