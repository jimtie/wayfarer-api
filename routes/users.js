const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// SHOW User
router.get('/:id', ctrl.users.show);

// UPDATE User
router.put('/:id', ctrl.users.update);

module.exports = router;
