import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../../core/core.module';
import {InfoComponent} from './info.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import {InfoRoutingModule} from './info-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import {infoReducer} from './store/info.reducer';
import {EffectsModule} from '@ngrx/effects';
import {InfoEffects} from './store/info.effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    InfoComponent,
    ListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    StoreModule.forFeature('infoState', infoReducer),
    EffectsModule.forFeature([InfoEffects]),
    InfoRoutingModule
  ]
})

export class InfoModule {}
