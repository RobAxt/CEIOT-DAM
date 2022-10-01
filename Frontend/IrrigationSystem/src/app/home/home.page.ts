import { Component } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../model/Dispositivo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listadoDispositivo: Array<Dispositivo> = new Array<Dispositivo>;

  constructor( public dispositivoServ: DispositivoService) {
  }

  ionViewDidEnter() {
    this.dispositivoServ.getDispositivos()
      .then(lst=>{
        this.listadoDispositivo=lst;
      })
      .catch(err=>{
        console.error('Error al obtener datos del Dispositivo');
      });
  }
}
