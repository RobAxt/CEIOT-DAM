import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {

  constructor(private el:ElementRef) {
    //el.nativeElement.style.backgroundColor="blue";
   }

   private cambiar(color:string){
    this.el.nativeElement.style.backgroundColor=color;
   }

   @HostListener('mouseenter') onMouseEnter() {
    this.cambiar('gainsboro');
   }
   @HostListener('mouseleave') onMouseLeave() {
    this.cambiar('');
  }

}
