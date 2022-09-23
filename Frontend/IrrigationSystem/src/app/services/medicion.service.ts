import { Injectable } from '@angular/core';
import { Medicion } from '../model/Medicion';


@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  ultimaMedicion: Medicion =  new Medicion(0, new Date(), 60, 0);

  constructor() { }

  getUltimaMedicion():Medicion {
    return this.ultimaMedicion;
  }
}
