import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logs } from '../model/Logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private _http: HttpClient) { }

  //devuelve todos los logs de una electrovalvula, recibe el id de la electrovalvula
  getLogsValvula(id: number): Promise<Array<Logs>> {
    return this._http.get<Array<Logs>>('http://localhost:8000/log/' + id + '/todas').toPromise();
  }

  //inserta un nuevo log
  newEntrada(log: Logs) {
  let sqlFecha: string = log.fecha.getFullYear() + "-" + (log.fecha.getMonth() + 1) + "-" + log.fecha.getDate() + " " + log.fecha.getHours() + ":" + log.fecha.getMinutes() + ":" + log.fecha.getSeconds()
    return this._http.post('http://localhost:8000/log/agregar',{apertura: log.apertura, fecha: sqlFecha, electrovalvulaId: log.electrovalvulaId} ).toPromise().then((result) => {console.log(result);});
  }
}
