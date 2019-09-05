import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {UserDetailsModel} from '../../shared/models/user-details.model';
import {ProfilesService} from '../../shared/services/profiles.service';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, skipWhile, takeWhile} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as ProfileActions from '../../modules/profile/store/profile.actions';
import * as profileReducer from '../../modules/profile/store/profile.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              private profileService: ProfilesService,
              private store: Store<profileReducer.State>) { }

  profileSubscription: Subscription;
  currentUserSubscription: Subscription;
  activeUser = new UserDetailsModel(false, '', '', '', '', '');


  ngOnInit() {
    // this.currentUserSubscription = this.authService.userDataSubject
    //   .pipe(takeWhile(data => data !== null))
    //   .subscribe(currUser => {
    //     console.log(currUser)
    //     if (currUser['email'] !== this.authService.userDataSubject.value['email']) {
    //       this.profileService.profilesDataSubject.next(null);
    //     }
    //   });

    this.profileSubscription = this.profileService.profileSubject
      .pipe(skipWhile(data => data === null))
      .subscribe(data => this.activeUser = data[1]);
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
    // this.currentUserSubscription.unsubscribe();
  }
}
