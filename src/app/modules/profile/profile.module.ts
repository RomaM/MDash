import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '../../core/core.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {StoreModule} from '@ngrx/store';
import {profileReducer} from './store/profile.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ProfileEffects} from './store/profile.effects';
import {DetailsComponent} from './details/details.component';
import {RegisterComponent} from './register/register.component';
import { ListComponent } from './list/list.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
    DetailsComponent,
    RegisterComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
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
