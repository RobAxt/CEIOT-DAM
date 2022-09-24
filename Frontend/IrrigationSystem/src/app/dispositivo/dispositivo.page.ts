import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import * as Highcharts from 'highcharts';
import { LogsService } from '../services/logs.service';
import { Logs } from '../model/Logs';
import { ElectrovalvulaService } from '../services/electrovalvula.service';
import { MedicionService } from '../services/medicion.service';
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
  estadoElectrovalvula: boolean;
  private valorObtenido: number;
  public myChart;
  private chartOptions;

  constructor(private router: ActivatedRoute, private dServ: DispositivoService, private medServ: MedicionService, private lServ: LogsService, private evServ: ElectrovalvulaService) { }

   ngOnInit() {
    // eslint-disable-next-line prefer-const
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    this.dispositivo = this.dServ.getDispositivo(idDispositivo);
    this.estadoElectrovalvula = Boolean(this.evServ.getEstadoActualEV(this.dispositivo.electrovalvulaId));
    this.valorObtenido= this.medServ.getUltimaMedicionDispositivo(idDispositivo).valor;
  }

   ionViewDidEnter() {
    this.generarChart();
   }

  cambiarEstadoElectrovalvula() {
    this.estadoElectrovalvula = !this.estadoElectrovalvula;
    console.log('Estado de la Electrovalvula del dispositovo' + this.dispositivo.nombre + ' es ' + this.estadoElectrovalvula);
    let log: Logs = new Logs(0, new Date, Number(this.estadoElectrovalvula), this.dispositivo.electrovalvulaId);
    this.lServ.newEntrada(log);
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
          text: [this.dispositivo.nombre]
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



}
