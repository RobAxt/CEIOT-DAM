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

  public dispositivo: Dispositivo;
  public logs: Array<Logs>;

  constructor(private router: ActivatedRoute, private dServ: DispositivoService, private lServ: LogsService) { }

  ngOnInit() {
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    this.leerDatos(idDispositivo);
  //  this.dispositivo = this.dServ.getDispositivo(idDispositivo);
  //  this.logs = this.lServ.getLogsValvula(this.dispositivo.electrovalvulaId);
  }

  async leerDatos(idDispositivo: string) {
    try{
      this.dispositivo = await this.dServ.getDispositivo(idDispositivo);
      this.logs = await this.lServ.getLogsValvula(this.dispositivo.electrovalvulaId);
    }
    catch {
      console.error('Error al leer datos del backend');
    }
  }
}
