import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {UserDetailsModel} from '../../shared/models/user-details.model';
import {ProfilesService} from '../../shared/services/profiles.service';
import {Observable, Subscription} from 'rxjs';
import {skipWhile, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private profileService: ProfilesService) { }

  profileSubscription: Subscription;
  // activeUser: UserDetailsModel;
  activeUser = new UserDetailsModel(false, '', '', '', '', '');


  ngOnInit() {
    // this.activeUser = this.profileService.profileSubject
    //   .pipe(skipWhile(data => !!data[1]));

    this.profileSubscription = this.profileService.profileSubject
      .pipe(skipWhile(data => data === null))
      .subscribe(data => {
        this.activeUser = data[1];
      });
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }
}
