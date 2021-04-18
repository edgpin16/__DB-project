const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', (req, res) => {
    res.send('Panel laboratorio');
});

router.get('/agregar', async (req, res) => {
    res.render('laboratorio/agregar');
});

router.post('/agregar', async (req, res) => {
    try {
        const {nombre, pais, provincia, ciudad} = req.body;
        const newLaboratory = {
            nombre,
            pais,
            provincia, 
            ciudad,
        }
        await pool.query('INSERT INTO laboratorio set ?', [newLaboratory]);
        req.flash('success', 'Laboratorio agregado correctamente');
        res.send('recibido');
    }
    catch (error) {
        console.error("Ha ocurrido un error :(", error)
    }
});

module.exports = router;