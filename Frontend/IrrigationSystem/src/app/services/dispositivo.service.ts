import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http: HttpClient) { }

  //devuelve un dispositivo con id
  getDispositivo(id): Promise<Dispositivo> {
    return this._http.get<Dispositivo>('http://localhost:8000/dispositivo/'+id).toPromise();
  }

  //devuele todos los dispositivos
  getDispositivos():  Promise<Array<Dispositivo>> {
    return this._http.get<Array<Dispositivo>>('http://localhost:8000/dispositivo').toPromise();
  }
}
