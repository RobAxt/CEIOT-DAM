import { Injectable } from '@angular/core';
import { Logs } from '../model/Logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  public ultimoLog: Logs = new Logs(0,new Date(), true,0);
  constructor() { }

  getUltimoLog():Logs {
    return this.ultimoLog;
  }

}
