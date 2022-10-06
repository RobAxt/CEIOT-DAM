import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Electrovalvula } from '../model/Electrovalvula';

@Injectable({
  providedIn: 'root'
})
export class ElectrovalvulaService {

  constructor(private _http: HttpClient) { }

  // con el Id del Dispositovo obtengo la electrovalvula asociada.
  getEV(idDispositivo: number): Promise<Electrovalvula> {
    return this._http.get<Electrovalvula>('http://localhost:8000/electrovalvula/'+idDispositivo).toPromise();
  }

  // actualizo el estado de la electrovalvula, ya que se agrego en la tabla electrovalvula el campo apertura que indicaría el estado actual.
  updateApertura(ev: Electrovalvula) {
    console.log('Actualizando estado de Valvula ' +  ev.electrovalvulaId + ' estado ' + ev.apertura);
    return this._http.put('http://localhost:8000/electrovalvula/estadoActualizar', {evId: ev.electrovalvulaId, apertura: ev.apertura} ).toPromise().then((result) => {console.log(result);});
  }
}
