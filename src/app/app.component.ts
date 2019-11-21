import {
  AfterContentInit, AfterViewInit, Component, DoCheck, NgZone, OnChanges, OnDestroy, OnInit,
  SimpleChanges
} from '@angular/core';
import * as firebase from 'firebase';
import {environment} from '../environments/environment';
import {AuthService} from './shared/services/auth.service';
import {distinctUntilChanged, skipWhile, switchMap, takeWhile, tap} from 'rxjs/operators';
import * as ProfileActions from './modules/profile/store/profile.actions';
import {Store} from '@ngrx/store';
import * as profileReducer from './modules/profile/store/profile.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges, OnInit, DoCheck, AfterViewInit, AfterContentInit, OnDestroy {

  title = 'FD';

  constructor(private ngZone: NgZone,
              private authService: AuthService,
              private store: Store<profileReducer.State>) {
    // Preventing continual internal changes/operations from triggering change detection in DoCheck()
    this.ngZone.runOutsideAngular(() => {
      if (!firebase.apps.length) {
        firebase.initializeApp(environment.firebase);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {
    this.authService.autoLogin();

    this.authService.userDataSubject
      .subscribe(data => {
        if (data !== null) { this.store.dispatch(new ProfileActions.LoadProfiles()); }
      });


  }

  ngDoCheck() {}

  ngAfterContentInit() {}

  ngAfterViewInit() {}

  ngOnDestroy() {}
}
