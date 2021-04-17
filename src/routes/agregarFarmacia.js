const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/agregar', (req, res) => {
    res.render('farmacia/agregar');
});

router.post('/agregar', (req, res) => {
    res.send('recibido farmacia');
});

module.exports = router;