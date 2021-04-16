const mysql = require('mysql');
const {promisify} = require('util');
const {database} = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((error, connection) => {
    if(error)
        if(error.code === 'PROTOCOL_CONNECTION_LOST')
            console.error("Conexión con la bases de datos cerrada");
        else if(error.code === 'ER_CON_COUNT_ERROR')
            console.error("La base de datos tiene muchas conexiones");
        else if(error.code === 'ECONNREFUSED')
            console.error("Conexión con la bases de datos rechazada");
    else if(connection){
        connection.release();
        console.log("Base de datos conectada");
    }
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;