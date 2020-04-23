const db = require('../models');
const auth = require('./auth');

//Show Post
async function show(req,res) {
  try {
    let foundPost = await db.Post.findById(req.params.id).populate('user');
    if (!foundPost) {
      return res.sendStatus(404);
    }
    res.json(foundPost);
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      status:500,
      error:'Server error. Please contact the administrators.'
    });
  }
};

//Create Comment
async function create(req, res) {
  try {
    if (auth.authorized(req)){
      let data = req.body;
      data.user = req.session.currentUser.id;
      let newPost = await db.Post.create(data);

      let foundCity = await db.City.findById(req.body.city);
      foundCity.posts.push(newPost._id);
      let savedCity = await foundCity.save();
      res.json(newPost);
    }
    else{
      res.sendStatus(403);
    }
  }
  catch(err) {
    res.status(500).json({
      status: 500,
      error: 'Server error.'
    })
  }
};

//Updating Comment
const update = (req,res) => {
  //find city by Id
  db.City.findById(req.params.cityId, (err,foundCity) => {
    if (err){
      return res.status(400).json({status:400, error: 'Something went wrong, please try again'});
    }
    //Finding ID
    const postToUpdate = foundCity.posts.id(req.params.postId);

    if (!postToUpdate) {
      return res.status(400).json({status: 400, error: 'Post not Found, try again'});
    }

    //Updating comment
    postToUpdate.title = req.body.title;
    postToUpdate.content = req.body.content;

    foundCity.save((err, savedCity) => {
    if (err){
      return res.status(400).json({status:400, error: 'Something went wrong, please try again'});
    }
    db.Post.findByIdAndUpdate(req.params.postId, req.body, {new: true}, (err, updatedCity) => {
      if (err){
        return res.status(400).json({status:400, error: 'Something went wrong, please try again'});
      }
      res.json(updatedCity);
    });
  });
});
};

//Delete Comment
const deletePost = (req, res) => {
  // Find City By ID
  db.City.findById(req.params.cityId, (err, foundCity) => {
    if (err) {
      return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    }

    // Find ID
    const postToDelete = foundCity.posts.id(req.params.postId);

    if (!postToDelete) {
      return res.status(400).json({status: 400, error: 'Could not find post'});
    }

    // Delete from record
    postToDelete.remove();

    // Save
    foundCity.save((err, savedCity) => {
      if (err) {
        return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
      }

      // Delete indefinitely
      db.Post.findByIdAndDelete(req.params.postId, (err, deletedCity) => {
        if (err) {
          return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
        }

        res.json(deletedCity);
      });
    });
  });
};

// Index User Posts
async function userPosts(req, res){
  try{
    if(!auth.authorized(req)){
      let err = new Error('Unauthorized');
      err.name="NoAuth";
      throw err;
    }

    let posts = await db.Post.find({
      user: req.session.currentUser.id
    }).populate('city', 'name');

    res.json(posts);
  }
  catch(err){
    console.log(err);
    switch (err.name){
      case 'NoAuth':
        res.sendStatus(403);
        break;
      default:
        res.sendStatus(500);
    }
  }
}

module.exports = {
  show,
  create,
  update,
  deletePost,
  userPosts,
}
