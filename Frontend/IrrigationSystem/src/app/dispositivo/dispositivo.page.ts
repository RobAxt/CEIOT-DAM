import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import * as Highcharts from 'highcharts';
import { LogsService } from '../services/logs.service';
import { Logs } from '../model/Logs';
import { ElectrovalvulaService } from '../services/electrovalvula.service';
import { MedicionService } from '../services/medicion.service';
import { Electrovalvula } from '../model/Electrovalvula';
import { Medicion } from '../model/Medicion';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  public dispositivo: Dispositivo;
  public electrovalvula: Electrovalvula;
  public medicion: Medicion;
  private valorObtenido: number = 0;
  public myChart;
  private chartOptions;

  constructor(private router: ActivatedRoute, private dServ: DispositivoService, private medServ: MedicionService, private lServ: LogsService, private evServ: ElectrovalvulaService) { }

   ngOnInit() {
    // eslint-disable-next-line prefer-const
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    this.leerDatos(idDispositivo);
 }

   ionViewDidEnter() {
    this.generarChart();
    this.simulacionMedicion();
    this.refrescarDatos();
   }

  async leerDatos(idDispositivo: string) {
    try{
      this.dispositivo = await this.dServ.getDispositivo(idDispositivo);
      this.electrovalvula = await this.evServ.getEV(idDispositivo);
      console.log('Electrovalvula: ' + JSON.stringify(this.electrovalvula));
      this.medicion = await this.medServ.getUltimaMedicionDispositivo(idDispositivo);
      console.log('Valor medicion: ' + this.medicion.valor)
      this.valorObtenido = Number(this.medicion.valor);
    }
    catch {
      console.error('Error al leer datos del backend');
    }
    this.myChart.update({series: [{
      name: 'kPA',
      data: [this.valorObtenido],
      tooltip: {
          valueSuffix: ' kPA'
      }
    }]});
  }

// refresco asincronico de la medición del dispositivo
  refrescarDatos() {}

  cambiarEstadoElectrovalvula() {
    this.electrovalvula.apertura = this.electrovalvula.apertura?0:1;
    console.log('Estado de la Electrovalvula del dispositovo' + this.dispositivo.nombre + ' es ' + this.electrovalvula.apertura);
    let log: Logs = new Logs(0, new Date, Number(this.electrovalvula.apertura), this.dispositivo.electrovalvulaId);
    this.lServ.newEntrada(log);
    this.evServ.updateApertura(this.electrovalvula);
  }

  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          height: '300px'
        }
        ,title: {
          text:'Presión de Capilar'
        }
        ,credits:{enabled:false}
        ,pane: {
            startAngle: -150,
            endAngle: 150,

            center: ['50%', '50%'],
            size: '100%'
        }
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
    series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]
    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

// Este método simula el envio periodico del dispositivo de los datos de medición.
  simulacionMedicion() {}
}
