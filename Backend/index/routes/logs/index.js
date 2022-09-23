var express = require('express');
var routerLog = express.Router();
var pool = require('../../mysql');

//Espera recibir por parámetro un id de electrovalvula y devuelve su última log
routerLog.get('/:electrovalvulaId', function(req, res) {
    pool.query('Select * from Log_Riegos where electrovalvulaId=? order by fecha desc', [req.params.electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result[0]);
    });
});

//Espera recibir por parámetro un id de electrovalvula y devuelve todas sus logs
routerLog.get('/:electrovalvulaId/todas', function(req, res) {
    pool.query('Select * from Log_Riegos where electrovalvulaId=? order by fecha desc', [req.params.electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

//Espera recibir por parámetro un id de dispositivo y un valor de medición y lo inserta en base de datos.
routerLog.post('/agregar', function(req, res) {
    pool.query('Insert into Log_Riegos (apertura, fecha, electrovalvulaId) values (?,?,?)', [req.body.apertura, req.body.fecha, req.body.electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

module.exports = routerLog;