const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', (req, res) => {
    res.send('Panel telefono laboratorio');
});

router.get('/agregar', async (req, res) => {
    try{
        const laboratorios = await pool.query('SELECT * FROM laboratorio');
        console.log(laboratorios);
        res.render('telefono_laboratorio/agregar', {laboratorios});
    }
    catch(error){
        console.log("Ocurrio un error :(", error);
    }
});

router.post('/agregar', async (req, res) => {
    try {
        const {ID_Laboratorio, telefono} = req.body;
        const newLaboratoryPhone = {
            ID_Laboratorio,
            telefono,
        }
        await pool.query('INSERT INTO laboratorio_telefono set ?', [newLaboratoryPhone]);
        req.flash('success', 'Laboratorio agregado correctamente');
        res.send('recibido');
    }
    catch (error) {
        console.error("Ha ocurrido un error :(", error)
    }
});

module.exports = router;