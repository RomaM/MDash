import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '../../core/core.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {StoreModule} from '@ngrx/store';
import {profileReducer} from './store/profile.reducer';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ProfileComponent, DetailsComponent],
  imports: [
    CommonModule,
    CoreModule,
    StoreModule.forFeature('profileState', profileReducer),
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
