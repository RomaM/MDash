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
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatCardModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {LoaderComponent} from './shared/components/loader/loader.component';

import {profileReducer} from './modules/profile/store/profile.reducer';
import {ProfileEffects} from './modules/profile/store/profile.effects';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    LoaderComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    BrowserModule,
    HttpClientModule,
    // NoopAnimationsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(profileReducer),
    EffectsModule.forRoot([ProfileEffects]),
    !environment.production ? StoreDevtoolsModule.instrument(<StoreDevtoolsOptions>{maxAge: 25}) : [],
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule {}
