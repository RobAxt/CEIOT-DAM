import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abiertaCerrada'
})
export class AbiertaCerradaPipe implements PipeTransform {

  transform(value: boolean): string {
    return value? "ABIERTA":"CERRADA";
  }

}
