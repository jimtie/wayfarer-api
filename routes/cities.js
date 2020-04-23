const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// INDEX Cities
router.get('/', ctrl.cities.index);

// SHOW City
router.get('/:id', ctrl.cities.show);

// CREATE City
router.post('/', ctrl.cities.create);

module.exports = router;
