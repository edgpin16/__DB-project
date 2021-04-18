const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', (req, res) => {
    res.send('Panel monodroga');
});

router.get('/agregar', async (req, res) => {
    try{
        const medicamentos = await pool.query('SELECT * FROM medicamento');
        res.render('monodroga/agregar', {medicamentos});
    }
    catch(error){
        console.log("Ocurrio un error :(", error);
    }
});

router.post('/agregar', async (req, res) => {
    try {
        const { n_serial_medicamento, nombre_monodroga } = req.body;
        const newMonodroge = {
            n_serial_medicamento,
            nombre_monodroga
        }
        await pool.query('INSERT INTO monodroga set ?', [newMonodroge]);
        req.flash('success', 'Medicamento agregado correctamente');
        res.send('recibido');
    }
    catch (error) {
        console.error("Ha ocurrido un error :(", error)
    }
});

module.exports = router;