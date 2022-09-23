import { Injectable } from '@angular/core';
import { Medicion } from '../model/Medicion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  ultimaMedicion: Medicion =  new Medicion(0, new Date(), 60, 0);

  constructor(private _http:HttpClient) { }

  getUltimaMedicion():Medicion {
    return this.ultimaMedicion;
  }
}
