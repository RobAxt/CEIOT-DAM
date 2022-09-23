import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  listadoDispositivo: Array<Dispositivo> = new Array<Dispositivo>();

  constructor(private _http:HttpClient) {
    const disp: Dispositivo= new Dispositivo(1,'Sensor 1','Patio',1);
    const disp2: Dispositivo= new Dispositivo(2,'Sensor 2','Cocina',2);
    const disp3: Dispositivo= new Dispositivo(3,'Sensor 3','Jardin Delantero',3);
    const disp4: Dispositivo= new Dispositivo(4,'Sensor 4','Living',4);
    this.listadoDispositivo.push(disp);
    this.listadoDispositivo.push(disp2);
    this.listadoDispositivo.push(disp3);
    this.listadoDispositivo.push(disp4);
  }

  getDispositivo(id): Dispositivo {
    return this.listadoDispositivo.filter(dispositivo=> dispositivo.dispositivoId==id)[0];
  }

  getDispositivos(): Dispositivo[] {
    return this.listadoDispositivo;
  }
}
