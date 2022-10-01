import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicion } from '../model/Medicion';


@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  constructor(private _http: HttpClient) { }

  getMedicionDispositivo(id): Promise<Array<Medicion>> {
    return this._http.get<Array<Medicion>>('http://localhost:8000/medicion/' + id + '/todas').toPromise();
  }

  getUltimaMedicionDispositivo(id): Promise<Medicion> {
    return this._http.get<Medicion>('http://localhost:8000/medicion/'+id).toPromise();
  }

  newEntrada(med: Medicion) {
    let sqlFecha: string = med.fecha.getFullYear() + "-" + (med.fecha.getMonth() + 1) + "-" + med.fecha.getDate() + " " + med.fecha.getHours() + ":" + med.fecha.getMinutes() + ":" + med.fecha.getSeconds()
      return this._http.post('http://localhost:8000/medicion/agregar',{dispositivoId: med.dispositivoId, valor: med.valor, fecha:sqlFecha} ).toPromise().then((result) => {console.log(result);});
    }
}
