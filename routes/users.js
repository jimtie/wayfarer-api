const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    a: 1
  })
});

module.exports = router;