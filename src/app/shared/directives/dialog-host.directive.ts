import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appDialog]'
})
export class DialogHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
