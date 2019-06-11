import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {ProfilesService} from '../../../shared/services/profiles.service';
import {Store} from '@ngrx/store';
import * as profileReducer from '../store/profile.reducer';
import * as ProfileActions from '../store/profile.actions';
import {UserDetailsModel} from '../../../shared/models/user-details.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  profilesSubscription: Subscription;
  profilesData: any;
  currentProfile: [string, UserDetailsModel];

  constructor(private profileService: ProfilesService, private store: Store<profileReducer.State>) { }

  ngOnInit() {
    this.profilesSubscription = this.profileService.profilesDataSubject.subscribe(
      data => {
        this.currentProfile = this.profileService.profileSubject.value;
        if (data) {
          this.profilesData = data.filter( el => {
            return el[1]['uid'] !== this.currentProfile[1]['uid'];
          });
        }
      }
    );
  }

  removeItem(key) {
    this.store.dispatch(new ProfileActions.DeleteProfile(key));
  }

  ngOnDestroy() {
    this.profilesSubscription.unsubscribe();
  }

}
