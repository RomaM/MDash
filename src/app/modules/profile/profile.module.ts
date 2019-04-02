import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '../../core/core.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {StoreModule} from '@ngrx/store';
import {profileReducer} from './store/profile.reducer';
import { DetailsComponent } from './details/details.component';
import {RegisterComponent} from './register/register.component';

@NgModule({
  declarations: [ProfileComponent, DetailsComponent, RegisterComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature('profileState', profileReducer),
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
