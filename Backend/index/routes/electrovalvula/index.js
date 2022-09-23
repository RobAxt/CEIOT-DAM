var express = require('express');
var routerElectrovalvula = express.Router();
var pool = require('../../mysql');

//Espera recibir por parámetro un id de dispositivo y devuelve el estado actual de la electrovalvula conectada a ese dispositivo
routerElectrovalvula.get('/estadoActual/:idDispositivo', function(req, res) {
    pool.query('SELECT Electrovalvulas.apertura FROM Electrovalvulas INNER JOIN Dispositivos ON Dispositivos.electrovalvulaId = Electrovalvulas.electrovalvulaId WHERE Dispositivos.dispositivoId=? ', [req.params.idDispositivo], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result[0]);
    });
});

module.exports = routerElectrovalvula;