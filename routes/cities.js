const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// INDEX Cities
router.get('/', ctrl.cities.index);

// SHOW City
router.get('/:id', ctrl.cities.show);

module.exports = router;
