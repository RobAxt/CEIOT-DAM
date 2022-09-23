import { Injectable } from '@angular/core';
import { Medicion } from '../model/Medicion';


@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  mediciones: Array<Medicion> = new Array<Medicion>();

  constructor() {
    const med1: Medicion= new Medicion(1,new Date,20,1);
    const med2: Medicion= new Medicion(2,new Date,61,1);
    const med3: Medicion= new Medicion(3,new Date,20,2);
    const med4: Medicion= new Medicion(4,new Date,51,2);
    const med5: Medicion= new Medicion(5,new Date,10,3);
    const med6: Medicion= new Medicion(6,new Date,61,3);
    const med7: Medicion= new Medicion(7,new Date,70,4);
    const med8: Medicion= new Medicion(8,new Date,21,4);
    this.mediciones.push(med1);
    this.mediciones.push(med2);
    this.mediciones.push(med3);
    this.mediciones.push(med4);
    this.mediciones.push(med5);
    this.mediciones.push(med6);
    this.mediciones.push(med7);
    this.mediciones.push(med8);
   }

  getMedicionDispositivo(id):Medicion[] {
    return this.mediciones.filter(mediciones=> mediciones.dispositivoId==id);
  }
}
