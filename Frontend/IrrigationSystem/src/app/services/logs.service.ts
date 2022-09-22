import { Injectable } from '@angular/core';
import { Logs } from '../model/Logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  public ultimoLog: Logs = {
    _logRiegoId : 0,
    _fecha : new Date(),
    _apertura : true,
    _electrovalvulaId : 0
   };
  constructor() { }

  getUltimoLog():Logs {
    return this.ultimoLog;
  }

}
