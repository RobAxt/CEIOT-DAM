import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import { MedicionService } from '../services/medicion.service';
import { Medicion } from '../model/Medicion';

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.page.html',
  styleUrls: ['./medicion.page.scss'],
})
export class MedicionPage implements OnInit {

  public dispositivo: Dispositivo = new Dispositivo(0,'','',0);;
  public mediciones:  Array<Medicion> = new Array<Medicion>;;

  constructor(private router: ActivatedRoute, private dServ: DispositivoService, private medServ: MedicionService) {
    let idDispositivo: number = parseInt(this.router.snapshot.paramMap.get('id'));
    this.leerDatos(idDispositivo);
   }

  ngOnInit() { }

  async leerDatos(idDispositivo: number) {
    try{
      this.dispositivo = await this.dServ.getDispositivo(idDispositivo);
      this.mediciones = await this.medServ.getMedicionDispositivo(idDispositivo);
    }
    catch {
      console.error('Error al leer datos del backend');
    }
  }

}
