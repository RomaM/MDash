import {TestBed, async, inject, fakeAsync, tick} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ProfilesService} from './profiles.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './auth-interceptor.service';
import {AuthService} from './auth.service';
import {tap} from 'rxjs/operators';
import {AuthComponent} from '../../modules/auth/auth.component';
import {AuthModule} from '../../modules/auth/auth.module';

describe('SERVICE -> Profile Service', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AuthModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'auth', component: AuthComponent}
        ])
      ],
      providers: [
        ProfilesService,
        AuthService,
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: AuthInterceptorService,
        //   multi: true
        // }
      ]
    });

    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('Should create Profile Service', inject([ProfilesService], (service: ProfilesService) => {
    const profileServiceInstance = TestBed.get(ProfilesService);
    // profileServiceInstance = {...profileServiceInstance, 'testProp': 'Test Value'};
    // console.log(profileServiceInstance);

    expect(service).toBe(profileServiceInstance);
    expect(service).toBeTruthy();
  }));

  it('Should Sign In', fakeAsync(inject([HttpTestingController, AuthService],
    (backend: HttpTestingController, authService: AuthService) => {
      const mockUser = {
        email: 'test@test.test',
        uid: 1,
        _token: 'token',
        _tokenExpirationDate: new Date()
      };

      authService.signIn('super@admin.mail', 'password').subscribe(
        () => {
          console.log('SIGNED IN');
        }
      );

      const req = backend.expectOne({url:
          `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBZRtSixnLvglkNRxsX6hH3nkxybI_JSz4`
      });

      expect(req.request.method).toEqual('POST');

      req.flush(mockUser);
      tick();
    }))
  );

  it('Should use Fetch profiles', async(inject([ProfilesService, HttpTestingController, AuthService],
    (service: ProfilesService, backend: HttpTestingController) => {
      const mockProfiles = {email: 'test@email.com'};

      service.fetchUserProfiles()
        .subscribe(data => {
          console.log('SUBSCRIPTION');
          console.log(data);
          // expect(data).toEqual(mockProfiles);
        });

      const url = 'https://funnelsdetails.firebaseio.com/users.json';
      const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlMjc0MWQ0MWY5ZDQzZmFiMWU2MjhhODVlZmI0MmE4OGVmMzIyOWYiLCJ0eXAiOiJKV1QifQ';
      const req = backend.expectOne('https://funnelsdetails.firebaseio.com/users.json');

      expect(req.request.method).toEqual('GET');

      req.flush(mockProfiles);
    }))
  );
});
