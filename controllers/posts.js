const db = require('../models');

//Show City
const showCityPost = (req,res) => {
  db.City.findById(req.params.cityId, (err,foundCity) => {
    if (err) {
      return res.status(400).json({status:400, error: 'Something went wrong, please try again'})
    }
    //find city by // Id
    const foundPost = foundCity.posts.id(req.params.postId);

    if (!foundPost) {
      return res.status(400).json({status:400, error: 'Something went wrong, please try again'});
    }
    res.json(foundPost);
  });
}

//Create Comment
const createCityPost = (req, res) => {
  console.log(req.body)
  // Create Post
  db.Post.create(req.body, (err, newPost) => {
    if (err) {
      return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    }

    // Find city To Associate With Comment
    db.City.findById(req.params.cityId, (err, foundcity) => {
      if (err) {
        return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
      }

      // Add Comment To city
      foundcity.posts.push(newPost);

      // Save
      foundcity.save((err, savedcity) => {
        if (err) {
          return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
        }

        res.json(newPost);
      });
    });
  });
};

//Updating Comment
const updateItem = (req,res) => {
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
const destroyCityPost = (req, res) => {
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
showCityPost,
createCityPost,
updateItem,
destroyCityPost,
}
