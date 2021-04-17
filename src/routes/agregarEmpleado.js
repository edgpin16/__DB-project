const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/agregar', (req, res) => {
    res.render('empleado/agregar');
});

router.post('/agregar', (req, res) => {
    res.send('recibido');
});

module.exports = router;