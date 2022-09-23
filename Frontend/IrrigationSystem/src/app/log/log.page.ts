import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {

  public dispositivo: Dispositivo;

  constructor(private router: ActivatedRoute, private dServ: DispositivoService) { }

  ngOnInit() {
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    this.dispositivo = this.dServ.getDispositivo(idDispositivo);
  }

}
