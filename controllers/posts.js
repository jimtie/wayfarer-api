const db = require('../models');
const auth = require('./auth');
const utility = require('../utility');

/**
 * SHOW one post
 * @param  {[type]} req HTTP Request
 * @param  {[type]} res HTTP Response
 * @return {[type]}     The requested post
 */
async function show(req,res) {
  try {
    let foundPost = await db.Post.findById(req.params.id).populate('user', 'name');
    if (!foundPost) {
      return res.sendStatus(404);
    }
    res.json(foundPost);
  }
  catch(err){
    utility.handleError(err, res);
  }
};

/**
 * CREATE post
 * @param  {[type]} req HTTP Request
 * @param  {[type]} res HTTP Response
 * @param
 * @return {[type]}     The requested post
 */
async function create(req, res) {
  try {
    // if (!auth.authorized(req)){
    //   utility.throwAuthError();
    // }

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

/**
 * UPDATE post
 * @param  {[type]} req HTTP Request
 * @param  {[type]} res HTTP Response
 * @param
 * @return {[type]}     The requested post
 */
async function update(req,res) {
  try{
    let post = await db.Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    res.json(post);
  }
  catch(err){
    util.handleError(err, res);
  }
}

/**
 * DELETE post
 * @param  {[type]} req HTTP Request
 * @param  {[type]} res HTTP Response
 * @return {[type]}     The requested post
 */
async function deletePost(req, res){
  try{
    let post = await db.Post.findById(req.params.id);
    if (!post){
      utility.throw4xx(404);
    }
    // if (req.session.currentUser.id !== String(deletedPost.user)){
    //   utility.throw4xx(403)
    // }
    post.remove();
    let refCity = await db.City.findById(post.city);
    let index = refCity.posts.indexOf(req.params.id);
    refCity.posts.splice(index,1);
    await refCity.save();
    res.json(post);
  }
  catch(err){
    utility.handleError(err, res);
  }
};

/**
 * INDEX posts for user
 * @param  {[type]} req HTTP Request
 * @param  {[type]} res HTTP Response
 * @param
 * @return {[type]}     The requested post
 */
async function userPosts(req, res){
  try{
    if(!auth.authorized(req)){
      utility.throwAuthError();
    }

    let posts = await db.Post.find({
      user: req.session.currentUser.id
    }).populate('city', 'name').populate('user', 'name');

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
