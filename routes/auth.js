const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// PATH = /api/v1/auth
router.get('/verify', ctrl.auth.verify);

router.post('/register', ctrl.auth.register);

router.post('/login', ctrl.auth.login);

router.delete('/logout', ctrl.auth.logout);

module.exports = router;
