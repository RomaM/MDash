import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatCardModule} from '@angular/material';
import {NotFoundComponent} from './components/not-found/not-found.component';

@NgModule({
  declarations: [LoadingComponent, DialogComponent, NotFoundComponent],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [LoadingComponent, DialogComponent, NotFoundComponent]
})

export class SharedModule {}
