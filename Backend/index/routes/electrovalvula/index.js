var express = require('express');
var routerElectrovalvula = express.Router();
var pool = require('../../mysql');

//Espera recibir por parámetro un id de dispositivo y devuelve la electrovalvula conectada a ese dispositivo
routerElectrovalvula.get('/:idDispositivo', function(req, res) {
    pool.query('SELECT Electrovalvulas.electrovalvulaId, Electrovalvulas.nombre, Electrovalvulas.apertura FROM Electrovalvulas INNER JOIN Dispositivos ON Dispositivos.electrovalvulaId = Electrovalvulas.electrovalvulaId WHERE Dispositivos.dispositivoId=? ', [req.params.idDispositivo], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        console.log("Estado Actual de la Electrovalvula: " + result[0].apertura)
        res.send(result[0]);
    });
});

//Espera recibir por body un id de dispositivo y un valor de apertura y lo actualiza en base de datos.
routerElectrovalvula.put('/estadoActualizar', function(req, res) {
    console.log('Actualizando estado de Valvula ' +  req.body.evId + ' estado ' + req.body.apertura);
    pool.query('UPDATE Electrovalvulas SET apertura = ? WHERE electrovalvulaId = ?', [req.body.apertura, req.body.evId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

module.exports = routerElectrovalvula;