import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';

import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule, StoreDevtoolsOptions} from '@ngrx/store-devtools';
import {AppRoutingModule } from './app-routing.module';

import {AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {AuthInterceptorService} from './shared/services/auth-interceptor.service';
import {DialogComponent} from './shared/components/dialog/dialog.component';
import {
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    BrowserModule,
    HttpClientModule,
    // NoopAnimationsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument(<StoreDevtoolsOptions>{maxAge: 25}) : [],
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {}
