const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', (req, res) => {
    res.send('Panel solicitud pedido');
});

router.get('/agregar', async (req, res) => {
    try{
        const laboratorios = await pool.query('SELECT * FROM laboratorio');
        const farmacias = await pool.query('SELECT * FROM farmacia');
        const analistas = await pool.query('SELECT * FROM (empleado RIGHT JOIN analista ON empleado.CI = analista.CI_Empleado)');
        res.render('solicitud_pedido/agregar', {laboratorios, farmacias, analistas});
    }
    catch(error){
        console.log("Ocurrio un error :(", error);
    }
});

router.post('/agregar', async (req, res) => {
    try {
        const {ID_Farmacia, ID_Laboratorio, CI_Analista} = req.body;
        const [{ID_Farmacia: busquedaFarmacia, nombre:analista}] = await pool.query(`SELECT ID_Farmacia, nombre FROM empleado WHERE empleado.CI = ${CI_Analista}`);
        
        if (parseInt(ID_Farmacia, 10) === busquedaFarmacia){
            const newSolicitudPedido = {
                ID_Farmacia,
                ID_Laboratorio,
                analista,
            }
            await pool.query('INSERT INTO farmacia_laboratorio_solicitud_pedido set ?', [newSolicitudPedido]);
            res.send('Recibido');
        }
        else{
            req.flash('success', 'Analista no pertenece a la farmacia.');
            res.redirect('/solicitud_pedido/agregar')
        }
    }
    catch (error) {
        console.error("Ha ocurrido un error :(", error)
    }
});

router.get('/agregarAnalista', async (req, res) => {
    try{
        res.render('solicitud_pedido/agregarAnalista');
    }
    catch(error){
        console.error("Ha ocurrido un error :(", error);
    }
});

module.exports = router;