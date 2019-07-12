import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProfilesService} from '../../../shared/services/profiles.service';
import {Store} from '@ngrx/store';
import * as profileReducer from '../store/profile.reducer';
import {UserDetailsModel} from '../../../shared/models/user-details.model';
import {DialogService} from '../../../shared/services/dialog.service';
import {DialogHostDirective} from '../../../shared/directives/dialog-host.directive';
import * as ProfileActions from '../store/profile.actions';
import * as profileReducers from '../store/profile.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  profilesSubscription: Subscription;
  profilesData: any;
  currentProfile: [string, UserDetailsModel];
  @ViewChild(DialogHostDirective, {static: false}) hostDialog: DialogHostDirective;

  constructor(
    private profileService: ProfilesService,
    private store: Store<profileReducer.State>,
    private dialogService: DialogService) { }

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
    this.dialogService.addDialogComponent(this.hostDialog, 'Do you really want to Delete this profile?', this.removeItemConfirmed(key));
  }

  removeItemConfirmed(key) {
    return () => {
      this.store.dispatch(new ProfileActions.DeleteProfile(key));
    };
  }

  ngOnDestroy() {
    this.profilesSubscription.unsubscribe();
  }

}
