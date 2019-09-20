import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatProgressSpinnerModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from './shared/services/auth.service';
import {Store, StoreModule} from '@ngrx/store';
import {profileReducer} from './modules/profile/store/profile.reducer';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('COMPONENT -> App Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoaderComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        // MatProgressSpinnerModule,
        StoreModule.forRoot({profileReducer})
      ],
      providers: [
        AuthService,
        Store
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FD'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('FD');
  });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to FD!');
  // });
});
