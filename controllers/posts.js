const db = require('../models');
const utility = require('../utility');

// SHOW Post
async function show(req,res) {
  try {
    let foundPost = await db.Post.findById(req.params.id).populate('user');
    if (!foundPost) {
      return res.sendStatus(404);
    }
    res.json(foundPost);
  }
  catch(err){
    utility.handleError(err, res);
  }
};

//show all posts of a user
async function showUserPost(req,res){
  try {
    let foundUserPost = await db.Post.find(req.body.user)
    if (!foundUserPost) {
      return res.sendStatus(404);
    }
    res.json(foundUserPost);
  }
  catch(err){
    utility.handleError(err,res);
  }
};

// CREATE Post
async function create(req, res) {
  try {
    if (!auth.authorized(req)){
      utility.throwAuthError();
    }

    let data = req.body;
    data.user = req.session.currentUser.id;
    let newPost = await db.Post.create(data);

    let foundCity = await db.City.findById(req.body.city);
    foundCity.posts.push(newPost._id);
    let savedCity = await foundCity.save();
    res.json(newPost);
  }
  catch(err) {
    utility.handleError(err, res);
  }
};

// UPDATE Post
async function update(req, res){
  try{
    if (!auth.authorized(req)){
      utility.throwAuthError();
    }

    let deletedPost = await db.Post.findById(req.params.id);
    if (req.session.currentUser.id !== String(deletedPost.user)){
      utility.throwAuthError();
    }
  }
  catch(err){
    utility.handleError(err, res);
  }
}

// UPDATE Post
async function update(req,res) {
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

// DELETE Post
async function deletePost(req, res){
  try{
    if (auth.authorized(req)){
      let deletedPost = await db.Post.findById(req.params.id);
      if (req.session.currentUser.id !== String(deletedPost.user)){
        let e = new Error('Unauthorized');
        e.name = 'NoAuth';
        throw e;
      }
      deletedPost.remove();
      let refCity = await db.City.findById(deletedPost.city);
      let index = refCity.posts.indexOf(req.params.id);
      refCity.posts.splice(index,1);
      await refCity.save();
      res.json(deletedPost);
    }
    else{
      let e = new Error('Unauthorized');
      e.name = 'NoAuth';
      throw e;
    }
  }
  catch(err){
    utility.handleError(err, res);
  }
};

// INDEX User Posts
async function userPosts(req, res){
  try{
    if(!auth.authorized(req)){
      utility.throwAuthError();
    }

    let posts = await db.Post.find({
      user: req.session.currentUser.id
    }).populate('city', 'name');

    res.json(posts);
  }
  catch(err){
    utility.handleError(err, res);
  }
}

module.exports = {
  show,
  create,
  update,
  deletePost,
  userPosts,
  showUserPost
}
