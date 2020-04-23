const db = require('../models');

// INDEX City
const index = (req, res) => {
  res.sendStatus(200);
}

//Show Post
const show = (req,res) => {
  db.Post.findById(req.params.id, (err,foundPost) => {
    if (err) {
      return res.status(400).json({status:400, error: 'Something went wrong, please try again'})
    }

    if (!foundPost) {
      return res.status(400).json({status:400, error: 'Something went wrong, please try again'});
    }
    res.json(foundPost);
  });
}

//Create Comment
async function create(req, res) {
  try {
    let newPost = await db.Post.create(req.body);
    let foundCity = await db.City.findById(req.body.cityId);
    foundCity.posts.push(newPost);
    let savedCity = await foundCity.save();
    res.json(newPost);
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

module.exports = {
  index,
  show,
  create,
  update,
  deletePost,
}
