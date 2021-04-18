const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/agregar', async (req, res) => {
    try{
        const farmacias = await pool.query('SELECT * FROM farmacia');
        res.render('empleado/agregar', {farmacias});
    }
    catch(error){
        console.error("Hubo un error :( ", error);  
    }
});

router.post('/agregar', async (req, res) => {
    try{
        const {ID_Farmacia, nombre, apellido_paterno, apellido_materno, CI, salario, fecha_nacimiento} = req.body;
        const newEmployee = {
            apellido_materno,
            apellido_paterno,
            CI,
            fecha_nacimiento,
            ID_Farmacia,
            nombre,
            salario,
        }
        await pool.query('INSERT INTO empleado set ?', [newEmployee]);
        req.flash('success', 'Empleado agregado correctamente');
        res.send('recibido');
    }
    catch(error){
        console.error("Ha ocurrido un error :(", error)
    }
});

router.get('/', (req, res) => {
    res.send('Panel empleado');
});

module.exports = router;