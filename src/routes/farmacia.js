const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/agregar', (req, res) => {
    res.render('farmacia/agregar');
});

router.post('/agregar', async (req, res) => {
    const {nombre, ciudad, provincia, extension} = req.body;
    const newFarmacia = {
        nombre, 
        ciudad,
        provincia,
        extension,
    }
    await pool.query('INSERT INTO farmacia set ?', [newFarmacia]);
    req.flash('success', 'Farmacia agregada correctamente');
    res.send('recibido farmacia');
});

router.get('/', async(req, res) => {
    const farmacias = await pool.query('SELECT * FROM farmacia');
    res.render('farmacia/list', {farmacias});
});

module.exports = router;