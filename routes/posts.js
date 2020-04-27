const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// INDEX User Posts
router.get('/user', ctrl.posts.userPosts);

router.get('/city/:id', ctrl.posts.cityPosts);

// SHOW Post
router.get('/:id', ctrl.posts.show);

//SHOW All User Posts

// router.get('/all', ctrl.posts.showUserPost);

// CREATE Post
router.post('/', ctrl.posts.create);

// UPDATE Post
router.put('/:id', ctrl.posts.update);

// DELETE Post
router.delete('/:id', ctrl.posts.deletePost);

module.exports = router;
