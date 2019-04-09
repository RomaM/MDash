import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '../../core/core.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {StoreModule} from '@ngrx/store';
import {profileReducer} from './store/profile.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ProfileEffects} from './store/profile.effects';
import {DetailsComponent} from './details/details.component';
import {RegisterComponent} from './register/register.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ProfileComponent, DetailsComponent, RegisterComponent, ListComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    StoreModule.forFeature('profileState', profileReducer),
    EffectsModule.forFeature([ProfileEffects]),
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
