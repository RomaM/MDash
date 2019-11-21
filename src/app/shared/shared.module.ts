import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatProgressSpinner, MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {NotFoundComponent} from './components/not-found/not-found.component';
import { DialogHostDirective } from './directives/dialog-host.directive';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    NotFoundComponent
  ]
})

export class SharedModule {}
