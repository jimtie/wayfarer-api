const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// INDEX Posts
router.get('/city/:id', ctrl.posts.index);

// SHOW Post
router.get('/:id', ctrl.posts.show);

// CREATE Post
router.post('/', ctrl.posts.create);

// UPDATE Post
router.put('/:id', ctrl.posts.update);

// DELETE Post
router.delete('/:id', ctrl.posts.deletePost);

module.exports = router;
