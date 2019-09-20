import {TestBed, async, ComponentFixture, fakeAsync, tick} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatMenuModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {StoreModule} from '@ngrx/store';
import {profileReducer} from '../../modules/profile/store/profile.reducer';
import {ProfilesService} from '../../shared/services/profiles.service';
import {publishBehavior} from 'rxjs/operators';
import {BehaviorSubject, Subject} from 'rxjs';

describe('COMPONENT -> Header Component', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatMenuModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({profileReducer})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('Should create Header Component', () => {
    expect(component).toBeTruthy();
  });

  it('Should get the test async string at the beginning as empty', () => {
    const profileService = fixture.debugElement.injector.get(ProfilesService);
    const spy = spyOn(profileService, 'getAsyncStringForTest').and.returnValue(Promise.resolve('ASD'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled(); // The method called
    expect(component.asyncStringForTest).toBe(''); // The method returns an empty string;
  });

  it('Should get the test async string asynchronously', async(() => {
    // const profileService = fixture.debugElement.injector.get(ProfilesService);
    const profileService = TestBed.get(ProfilesService);
    const spy = spyOn(profileService, 'getAsyncStringForTest').and.returnValue(Promise.resolve('ASD'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.asyncStringForTest).toBe('ASD');
    });
  }));

  it('Should get the test async string asynchronously after a while', fakeAsync(() => {
    const profileService = fixture.debugElement.injector.get(ProfilesService);
    const spy = spyOn(profileService, 'getAsyncStringForTest').and.returnValue(Promise.resolve('ASD'));
    fixture.detectChanges();
    tick();
    expect(component.asyncStringForTest).toBe('ASD');
  }));
});
