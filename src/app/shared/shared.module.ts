import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {NotFoundComponent} from './components/not-found/not-found.component';
import { DialogHostDirective } from './directives/dialog-host.directive';

@NgModule({
  declarations: [
    LoadingComponent,
    NotFoundComponent,
    DialogHostDirective
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    LoadingComponent,
    NotFoundComponent,
    DialogHostDirective
  ]
})

export class SharedModule {}
