const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', (req, res) => {
    res.send('Panel produccion medicinas');
});

router.get('/agregar', async (req, res) => {
    try{
        const laboratorios = await pool.query('SELECT * FROM laboratorio');
        const medicamentos = await pool.query('SELECT * FROM medicamento');
        res.render('produccion_medicina/agregar', {laboratorios, medicamentos});
    }
    catch(error){
        console.log("Ocurrio un error :(", error);
    }
});

router.post('/agregar', async (req, res) => {
    try {
        const {ID_Laboratorio, n_serial_medicamento} = req.body;
        const newLaboratoryMedicinaProduction = {
            ID_Laboratorio,
            n_serial_medicamento,
        }
        await pool.query('INSERT INTO medicamento_laboratorio_produccion set ?', [newLaboratoryMedicinaProduction]);
        req.flash('success', 'Laboratorio agregado correctamente');
        res.send('recibido');
    }
    catch (error) {
        console.error("Ha ocurrido un error :(", error)
    }
});

module.exports = router;