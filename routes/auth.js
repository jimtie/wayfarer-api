const express = require('express');
const router = express.Router();


// PATH = /api/v1/auth
router.get('/verify', (req, res) => {
  res.json({
    apiCall: 'Auth Verify',
  });
});

router.post('/register', (req, res) => {
  res.json({
    apiCall: 'Auth Register',
    data: req.body,
  });
});

router.post('/login', (req, res) => {
  res.json({
    apiCall: 'Auth Login',
    data: req.body,
  });
});

router.delete('/logout', (req, res) => {
  res.json({
    apiCall: 'Auth Logout'
  });
});

module.exports = router;