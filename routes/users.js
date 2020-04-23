const express = require('express');
const router = express.Router();

// SHOW User
router.get('/:id', (req, res) => {
  res.json({
    apiCall: 'SHOW User',
    id: req.params.id,
  });
});

// CREATE User
router.post('/', (req, res) => {
  res.json({
    apiCall: 'CREATE User',
    data: req.body,
  });
});

// UPDATE User
router.put('/:id', (req, res) => {
  res.json({
    apiCall: 'UPDATE User',
    id: req.params.id,
    data: req.body,
  });
});

module.exports = router;