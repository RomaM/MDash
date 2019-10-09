import {TestBed, async, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatMenuModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule} from '@ngrx/store';
import {profileReducer} from '../../modules/profile/store/profile.reducer';
import {ProfilesService} from '../../shared/services/profiles.service';
import {BehaviorSubject} from 'rxjs';
import {UserDetailsModel} from '../../shared/models/user-details.model';
import {By} from '@angular/platform-browser';

describe('COMPONENT -> Header Component', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let profileService: ProfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatMenuModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({profileReducer})
      ],
      providers: [ProfilesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    profileService = TestBed.get(ProfilesService);
  });

  it('Should create Header Component', () => {
    expect(component).toBeTruthy();
  });

  it('Should get an active user', () => {
    // const profileService = fixture.debugElement.injector.get(ProfilesService);
    const currProfile = new UserDetailsModel(false, 'user', 'user', 'email', 123, 'uid');
    const currUser = ['uid', currProfile];

    profileService.profileSubject.next(currUser);
    expect(component.activeUser).toEqual(currProfile);
  });

  it('Should has header username equal to a test data', () => {
    const currProfile = new UserDetailsModel(false, 'user', 'user', 'email', 123, 'uid');
    const currUser = ['uid', currProfile];
    profileService.profileSubject.next(currUser);
    const headerText = fixture.debugElement.query(By.css('.header__user-name'));
    component.ngOnInit();
    fixture.detectChanges();

    console.log(fixture.debugElement.query(By.css('.header__user-name')).nativeElement);
    console.log(fixture.nativeElement);

    expect(headerText.nativeElement.textContent).toEqual(`${currProfile.name} ${currProfile.surname}`);
  });

  // it('Should get an active user async string', fakeAsync(() => {
  //   const profileService = fixture.debugElement.injector.get(ProfilesService);
  //   const spy = spyOn(profileService, 'getAsyncStringForTest').and.returnValue(Promise.resolve('ASD'));
  //   tick();
  //   expect(component.asyncStringForTest).toBe('ASD');
  // }));
});
