const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', (req, res) => {
    res.send('Panel medicamento');
});

router.get('/agregar', async (req, res) => {
    res.render('medicamento/agregar');
});

router.post('/agregar', async (req, res) => {
    try {
        const { nombreMedicamento, accionTerapeutica, componentePrincipal, presentacion, NSerial} = req.body;
        const newMedicamento = {
            nombre_medicamento: nombreMedicamento,
            accion_terapeutica: accionTerapeutica,
            nombre_componente_principal: componentePrincipal,
            presentacion,
            n_serial: NSerial,
        }
        await pool.query('INSERT INTO medicamento set ?', [newMedicamento]);
        req.flash('success', 'Medicamento agregado correctamente');
        res.send('recibido');
    }
    catch (error) {
        console.error("Ha ocurrido un error :(", error)
    }
});

module.exports = router;