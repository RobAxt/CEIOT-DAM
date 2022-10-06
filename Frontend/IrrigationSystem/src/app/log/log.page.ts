import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { Logs } from '../model/Logs';
import { DispositivoService } from '../services/dispositivo.service';
import { LogsService } from '../services/logs.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {

  public dispositivo: Dispositivo = new Dispositivo(0,'','',0);
  public logs: Array<Logs> = new Array<Logs>;

  constructor(private router: ActivatedRoute, private dServ: DispositivoService, private lServ: LogsService) {
    let idDispositivo: number = parseInt(this.router.snapshot.paramMap.get('id'));
    this.leerDatos(idDispositivo);
   }

  ngOnInit() { }

  ionViewDidEnter() { }

  async leerDatos(idDispositivo: number) {
    try{
      this.dispositivo = await this.dServ.getDispositivo(idDispositivo);
      this.logs = await this.lServ.getLogsValvula(this.dispositivo.electrovalvulaId);
    }
    catch {
      console.error('Error al leer datos del backend');
    }
  }
}
