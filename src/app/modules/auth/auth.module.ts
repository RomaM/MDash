import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../../core/core.module';
import {AuthRoutingModule} from './auth-routing.module';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AuthRoutingModule
  ]
})

export class AuthModule {}

