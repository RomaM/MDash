import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {CoreModule} from "../../core/core.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    CoreModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
