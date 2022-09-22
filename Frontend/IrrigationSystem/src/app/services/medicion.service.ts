import { Injectable } from '@angular/core';
import { Medicion } from '../model/Medicion';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  ultimaMedicion: Medicion = {
    _medicionId : 0,
    _fecha : new Date(),
    _valor : 60,
    _dispositivoId : 1
  };
  constructor() { }

  getUltimaMedicion():Medicion {
    return this.ultimaMedicion;
  }
}
