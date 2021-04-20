const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', (req, res) => {
    res.send('Panel productos solicitados');
});

router.get('/agregar', async (req, res) => {
    try{
        const [{ID}] = await pool.query('SELECT * FROM pedido');
        const [{analista, ID_Farmacia, ID_Laboratorio}] = await pool.query('SELECT * FROM pedido LEFT JOIN farmacia_laboratorio_solicitud_pedido ON pedido.ID_Solicitud_pedido = farmacia_laboratorio_solicitud_pedido.ID');
        const [{nombre: nombreFarmacia, ciudad: ciudadFarmacia}] = await pool.query(`SELECT * FROM farmacia WHERE id = ${ID_Farmacia}`);
        const [{nombre: nombreLaboratorio, ciudad: ciudadLaboratorio}] = await pool.query(`SELECT * FROM laboratorio WHERE id = ${ID_Laboratorio}`);
        
        const masterObject = [{
            ID,
            analista,
            nombreFarmacia,
            ciudadFarmacia,
            nombreLaboratorio,
            ciudadLaboratorio,
        }];

        console.log(masterObject)
        
        res.render('productos_solicitados/agregar', {masterObject})
    }
    catch(error){
        console.log("Ocurrio un error :(", error);
    }
});

router.get('/agregarProductos', async (req, res) => {
    try{
        console.log(req.query);
        const elementosPrueba = [
        {
            nombre: 'nombre',
            cantidad: 100,
            costo: 1222,
            id: 1,
        },
        {
            nombre: 'nombre2',
            cantidad: 100,
            costo: 1222,
            id: 2,
        },
        {
            nombre: 'nombre3',
            cantidad: 100,
            costo: 1222,
            id: 3,
        }
        ];
        res.render('productos_solicitados/agregarProductos', {elementosPrueba});
    }
    catch(error){
        console.log("Ocurrio un error :(", error);
    }
});

router.get('/modificarProducto', async (req, res) => {
    try{
        console.log(req.query);
        const simulacionProducto = [
            {
                nombre: 'UnNombre',
                cantidad: 1212,
                costo: 12121
            }
        ]

        res.render('productos_solicitados/modificarProducto', {simulacionProducto})
    }
    catch(error){
        console.log("Ocurrio un error :(", error);
    }
});

router.post('/modificarProducto', async (req, res) => {
    try{
        console.log(req.body);
        res.send('Producto enviado');
        // const simulacionProducto = [
        //     {
        //         nombre: 'UnNombre',
        //         cantidad: 1212,
        //         costo: 12121
        //     }
        // ]

        // res.render('productos_solicitados/modificarProducto', {simulacionProducto})
    }
    catch(error){
        console.log("Ocurrio un error :(", error);
    }
});

// router.post('/agregarProductos', async (req, res) => {
//     try {
//         console.log(req.body);
//         res.send('Productos enviados');
//     }
//     catch (error) {
//         console.error("Ha ocurrido un error :(", error)
//     }
// });

module.exports = router;