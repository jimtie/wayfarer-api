const express = require('express');
const router = express.Router();

// INDEX Cities
router.get('/', (req, res) => {
  res.json({
    apiCall: 'INDEX Cities'
  });
});

// SHOW City
router.get('/:id', (req, res) => {
  res.json({
    apiCall: 'SHOW City',
    id: req.params.id,
  });
});

module.exports = router;