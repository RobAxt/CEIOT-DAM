var mysql = require('mysql');

var configMysql = {
    connectionLimit: 10,
    host: 'mysql-server',
    port: 3306,
    user: 'root',
    password: 'userpass',
    database: 'DAM'
}

var pool = mysql.createPool(configMysql);

pool.getConnection((err, connection) => {
    if (err) {
        switch (err.code) {
            case 'ER_ACCESS_DENIED':
                console.error('Usuario o Password incorrecto');
                break;
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('La conexion a la DB se cerró.');
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('La base de datos tiene muchas conexiones');
                break;
            case 'ECONNREFUSED':
                console.error('La conexion fue rechazada');
            default:
                console.error(err.code);
                break;
        }
        if (connection) {
            connection.release();
        }
        return;
    }
});

module.exports = pool;