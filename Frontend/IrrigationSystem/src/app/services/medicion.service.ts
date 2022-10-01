import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicion } from '../model/Medicion';


@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  constructor(private _http: HttpClient) { }

  //devuelve todas las mediciones del dispositivo con Id
  getMedicionDispositivo(id): Promise<Array<Medicion>> {
    return this._http.get<Array<Medicion>>('http://localhost:8000/medicion/' + id + '/todas').toPromise();
  }

  //devuelve la última medicion del dispositivo con Id
  getUltimaMedicionByDispositivo(id): Promise<Medicion> {
    return this._http.get<Medicion>('http://localhost:8000/medicion/'+id).toPromise();
  }

  getLastMedByDisp(id): Observable<Medicion> {
    return this._http.get<Medicion>('http://localhost:8000/medicion/'+id);
  }

  // inserta una nueva medicion, solo para la simulación.
  newEntrada(med: Medicion) {
    let sqlFecha: string = med.fecha.getFullYear() + "-" + (med.fecha.getMonth() + 1) + "-" + med.fecha.getDate() + " " + med.fecha.getHours() + ":" + med.fecha.getMinutes() + ":" + med.fecha.getSeconds()
      return this._http.post('http://localhost:8000/medicion/agregar',{dispositivoId: med.dispositivoId, valor: med.valor, fecha:sqlFecha} ).toPromise().then((result) => {console.log(result);});
    }
}
