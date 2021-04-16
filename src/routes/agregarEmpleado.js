const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/agregar', (req, res) => {
    res.render('empleado/agregar');
});

module.exports = router;