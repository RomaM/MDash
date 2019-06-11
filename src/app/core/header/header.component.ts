import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {UserDetailsModel} from '../../shared/models/user-details.model';
import {ProfilesService} from '../../shared/services/profiles.service';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private profileService: ProfilesService) { }

  profileSubscription: Subscription;
  activeUser: UserDetailsModel;

  ngOnInit() {
    this.activeUser = this.authService.userDataSubject.value;
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {}
}
