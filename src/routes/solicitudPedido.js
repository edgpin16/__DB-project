const express = require('express');
const router = express.Router();
const date = new Date();

const pool = require('../database');

router.get('/', (req, res) => {
    res.send('Panel solicitud pedido');
});

router.get('/agregar', async (req, res) => {
    try{
        const laboratorios = await pool.query('SELECT * FROM laboratorio');
        const farmacias = await pool.query('SELECT * FROM farmacia');
        //const analistas = await pool.query('SELECT * FROM (empleado RIGHT JOIN analista ON empleado.CI = analista.CI_Empleado)');
        res.render('solicitud_pedido/agregar', {laboratorios, farmacias});
    }
    catch(error){
        console.log("Ocurrio un error :(", error);
    }
});

router.get('/agregarAnalista', async (req, res) => {
    try{
        const {ID_Farmacia, ID_Laboratorio} = req.query;
        const farmacia = await pool.query(`SELECT * FROM farmacia WHERE ID = ${ID_Farmacia}`);
        const laboratorio = await pool.query(`SELECT * FROM laboratorio WHERE ID = ${ID_Laboratorio}`);
        const analistasFarmacia = await pool.query(`SELECT * FROM (empleado RIGHT JOIN analista ON empleado.CI = analista.CI_Empleado) WHERE empleado.ID_Farmacia = ${ID_Farmacia}`);
        res.render('solicitud_pedido/agregarAnalista', {laboratorio, farmacia, analistasFarmacia});
    }
    catch(error){
        console.log("Ocurrio un error :(", error);
    }
});

router.post('/agregarAnalista', async (req, res) => {
    try{
        const {ID_Farmacia, ID_Laboratorio, analista, tipo_pago} = req.body;
        const newSolicitud = {
            ID_Farmacia,
            ID_Laboratorio,
            analista,
        }
        await pool.query('INSERT INTO farmacia_laboratorio_solicitud_pedido set ?', [newSolicitud]);

        const [{ID}] = await pool.query(`SELECT ID from farmacia_laboratorio_solicitud_pedido WHERE analista = \'${analista}\' AND ID_Laboratorio = ${ID_Laboratorio} AND ID_Farmacia = ${ID_Farmacia}`);
        const newPedido = {
            ID_Solicitud_pedido : ID,
            forma_pago : tipo_pago
        }
        await pool.query('INSERT INTO pedido set ? ', [newPedido]);
        res.send('agregado');
    }
    catch(error){
        console.log("Ocurrio un error :(", error);
    }
});

// router.post('/agregar', async (req, res) => {
//     try {
//         const {ID_Farmacia, ID_Laboratorio, CI_Analista} = req.body;
//         const [{ID_Farmacia: busquedaFarmacia, nombre:analista}] = await pool.query(`SELECT ID_Farmacia, nombre FROM empleado WHERE empleado.CI = ${CI_Analista}`);
        
//         if (parseInt(ID_Farmacia, 10) === busquedaFarmacia){
//             const newSolicitudPedido = {
//                 ID_Farmacia,
//                 ID_Laboratorio,
//                 analista,
//             }
//             await pool.query('INSERT INTO farmacia_laboratorio_solicitud_pedido set ?', [newSolicitudPedido]);
//             res.send('Recibido');
//         }
//         else{
//             req.flash('error', 'Analista no pertenece a la farmacia.');
//             res.redirect('/solicitud_pedido/agregar')
//         }
//     }
//     catch (error) {
//         console.error("Ha ocurrido un error :(", error)
//     }
// });

module.exports = router;