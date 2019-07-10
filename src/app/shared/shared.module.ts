import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {NotFoundComponent} from './components/not-found/not-found.component';
import { DialogHostDirective } from './directives/dialog-host.directive';

@NgModule({
  declarations: [
    NotFoundComponent,
    DialogHostDirective
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    NotFoundComponent,
    DialogHostDirective
  ]
})

export class SharedModule {}
