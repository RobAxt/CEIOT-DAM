import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicionPageRoutingModule } from './medicion-routing.module';

import { MedicionPage } from './medicion.page';
import { UnidadPipe } from '../pipes/unidad.pipe';
import { ResaltarDirective } from '../directives/resaltar.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicionPageRoutingModule
  ],
  declarations: [
    MedicionPage,
    UnidadPipe,
    ResaltarDirective
  ]
})
export class MedicionPageModule {}
