import {TestBed, async, ComponentFixture, fakeAsync, tick, inject} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ProfilesService} from '../../../shared/services/profiles.service';
import {ListComponent} from './list.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {State, Store, StoreModule} from '@ngrx/store';
import {profileReducer} from '../store/profile.reducer';
import Spy = jasmine.Spy;
import {from, Observable, of} from 'rxjs';

describe('COMPONENT -> List Component', () => {
  let fixture: ComponentFixture<ListComponent>;
  let component: ListComponent;
  let profileService: ProfilesService;
  let spy: Spy;
  let mockProfiles;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('profileState', profileReducer)
      ],
      providers: [ProfilesService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    profileService = fixture.debugElement.injector.get(ProfilesService);
    // spy = spyOn(profileService, 'fetchUserProfiles').and.returnValue(of(mockProfiles));

    fixture.detectChanges();
  });

  it('Should create Component', () => {
    expect(component).toBeTruthy();
  });

  it('Should inject Profile service', () => {
    expect(profileService).toBeTruthy();
  });

  // it('Should call fetch data', () => {
  //   expect(spy.calls.any).toBeTruthy();
  // });

  // it('Should set a current profile', fakeAsync(() => {
  //   tick(5000);
  //   expect(component.currentProfile).toEqual('');
  // }));
});
