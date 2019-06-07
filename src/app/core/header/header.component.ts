import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {UserDetailsModel} from '../../shared/models/user-details.model';
import {ProfilesService} from '../../shared/services/profiles.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private profileService: ProfilesService) { }

  activeUser: UserDetailsModel;

  ngOnInit() {
    this.activeUser = <UserDetailsModel>this.profileService.profileSubject.value[1];
    console.log(this.activeUser);
  }

  signOut() {
    this.authService.signOut();
  }
}
