import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';

import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import {DialogHostDirective} from '../../shared/directives/dialog-host.directive';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AuthRoutingModule
  ]
})

export class AuthModule {}

