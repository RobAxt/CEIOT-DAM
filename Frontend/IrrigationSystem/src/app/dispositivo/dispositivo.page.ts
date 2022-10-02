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
  public valorObtenido: number = 0;
  private simTimerId: any;
  private refreshTimerId: any;
  public myChart;
  private chartOptions;

  constructor(private router: ActivatedRoute, private dServ: DispositivoService, private medServ: MedicionService, private lServ: LogsService, private evServ: ElectrovalvulaService) { }

  ngOnInit() {
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
      this.medicion = await this.medServ.getUltimaMedicionByDispositivo(idDispositivo);
      this.valorObtenido = Number(this.medicion.valor);
    }
    catch {
      console.error('Error al leer datos del backend');
    }
  }

// refresco asincronico de la medición del dispositivo
  refrescarDatos() {
    this.refreshTimerId =  setInterval( async ()=> {
      this.medicion = await this.medServ.getUltimaMedicionByDispositivo(this.dispositivo.dispositivoId);
      this.valorObtenido = Number(this.medicion.valor);
      console.log('Lectura Medicion Async: ' + this.medicion.valor)
      this.myChart.update({series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' kPA'
        }
      }]});
    },5000);
  }

  cambiarEstadoElectrovalvula() {
    this.electrovalvula.apertura = this.electrovalvula.apertura?0:1;
    console.log('Estado de la Electrovalvula del dispositivo ' + this.dispositivo.nombre + ' es ' + this.electrovalvula.apertura);
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

  ionViewDidLeave() {
    clearInterval(this.simTimerId);
    console.log('Finaliza Simulacion');
    clearInterval(this.refreshTimerId);
  }

// Este método simula el envio periodico del dispositivo de los datos de medición.
  simulacionMedicion(): void {
    console.log('Comenzando Simulación');
    this.simTimerId = setInterval( ()=> {
      var inc: number, newVal: number;
      var newMed: Medicion;

      inc = Math.round((Math.random() - 0.5) * 100);
      newVal = this.valorObtenido + inc;
      if (newVal < 0 || newVal > 100) {
          newVal =this.valorObtenido - inc;
      }
      console.log('Nueva Simulación: ' + newVal);

      newMed = new Medicion(0, new Date, newVal, this.dispositivo.dispositivoId);
      this.medServ.newEntrada(newMed);

    }, 10000);
  }
}
