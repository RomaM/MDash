import {TestBed, async, inject, fakeAsync, tick} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ProfilesService} from './profiles.service';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from './auth.service';
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
      ]
    });

    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('Should create Profile Service', inject([ProfilesService], (service: ProfilesService) => {
    const profileServiceInstance = TestBed.get(ProfilesService);

    expect(service).toBe(profileServiceInstance);
    expect(service).toBeTruthy();
  }));

  it('Should Fetch profiles', async(inject([ProfilesService, AuthService, HttpTestingController, AuthService],
    (service: ProfilesService, authService: AuthService, backend: HttpTestingController) => {

      const mockUser = {
        email: 'test@test.test',
        token: 'token',
        uid: 1,
        _token: 'token',
        _tokenExpirationDate: new Date()
      };

      const mockProfile = [
        'FBUID',
        {
          'email': 'test@test.test',
          'isSAdmin': false,
          'name': 'name',
          'phone': '7777777',
          'surname': 'surname',
          'uid': 'UID'
        }
      ];

      const spyProp = spyOnProperty(authService.userDataSubject, 'value', 'get').and.returnValue(mockUser);

      service.fetchUserProfiles().subscribe(data => {});

      const req = backend.expectOne('https://funnelsdetails.firebaseio.com/users.json');

      expect(req.request.method).toEqual('GET');

      req.flush(mockProfile);
    }))
  );


});
