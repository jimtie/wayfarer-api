const express = require('express');
const router = express.Router();

// INDEX Posts
router.get('/', (req, res) => {
  res.json({
    apiCall: 'INDEX Posts'
  });
});

// SHOW Post
router.get('/:id', (req, res) => {
  res.json({
    apiCall: 'SHOW Post',
    id: req.params.id,
  });
});

// CREATE Post
router.post('/', (req, res) => {
  res.json({
    apiCall: 'CREATE Post',
    data: req.body,
  })
});

// UPDATE Post
router.put('/:id', (req, res) => {
  res.json({
    apiCall: 'UPDATE Post',
    id: req.params.id,
    data: req.body,
  })
});

// DELETE Post
router.delete('/:id', (req, res) => {
  res.json({
    apiCall: 'DELETE Post',
    id: req.params.id,
  })
});

module.exports = router;