import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';

import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule, StoreDevtoolsOptions} from '@ngrx/store-devtools';
import {AppRoutingModule } from './app-routing.module';

import {AppComponent } from './app.component';
import {NotFoundComponent} from './core/not-found/not-found.component';
// import {AngularFireModule} from '@angular/fire';
// import {AngularFireAuthModule} from '@angular/fire/auth';
// import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // NoopAnimationsModule,
    BrowserAnimationsModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    StoreModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 25,}) : [],
    EffectsModule.forRoot([]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
