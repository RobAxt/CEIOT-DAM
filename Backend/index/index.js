var express = require('express');
var app = express();
var PORT = 3000;
var cors = require('cors');
var corsConfig = {
    origin:'*',
    optionSuccessStatus:200
}

app.use(cors(corsConfig));
//ruteo dispositivo
var routerDisp = require('./routes/dispositivo');
//ruteo medicion
var routerMedicion = require('./routes/medicion');
//ruteo logs
var routerLog = require('./routes/logs');
//ruteo electrovalvula
var routerElectrovalvula = require('./routes/electrovalvula');

app.use(express.json());

app.use('/dispositivo', routerDisp);

app.use('/medicion', routerMedicion);

app.use('/log', routerLog);

app.use('/electrovalvula', routerElectrovalvula);

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});