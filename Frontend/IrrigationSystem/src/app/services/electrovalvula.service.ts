import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Electrovalvula } from '../model/Electrovalvula';

@Injectable({
  providedIn: 'root'
})
export class ElectrovalvulaService {

//  listadoEV: Array<Electrovalvula> = new Array<Electrovalvula>();

  constructor(private _http: HttpClient) {
  /*   const ev1: Electrovalvula= new Electrovalvula(1,'elPatio',1);
    const ev2: Electrovalvula= new Electrovalvula(2,'elCocina',0);
    const ev3: Electrovalvula= new Electrovalvula(3,'elJardin Delantero',1);
    const ev4: Electrovalvula= new Electrovalvula(4,'elLiving',0);
    this.listadoEV.push(ev1);
    this.listadoEV.push(ev2);
    this.listadoEV.push(ev3);
    this.listadoEV.push(ev4); */
  }

  // con el Id del Dispositovo obtengo la electrovalvula asociada.
  getEV(idDispositivo): Promise<Electrovalvula> {
//    return this.listadoEV.filter(listadoEV=> listadoEV.evId==id)[0].apertura;
    return this._http.get<Electrovalvula>('http://localhost:8000/electrovalvula/'+idDispositivo).toPromise();
  }

  updateApertura(ev: Electrovalvula) {
    console.log('Actualizando estado de Valvula ' +  ev.electrovalvulaId + ' estado ' + ev.apertura);
    return this._http.put('http://localhost:8000/electrovalvula/estadoActualizar', {evId: ev.electrovalvulaId, apertura: ev.apertura} ).toPromise().then(
      (result) => {console.log(result);}
    );
      }
}
