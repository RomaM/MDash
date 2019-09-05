import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ProfilesService} from '../../../shared/services/profiles.service';
import {AuthService} from '../../../shared/services/auth.service';
import {UserDetailsModel} from '../../../shared/models/user-details.model';
import * as profileReducer from '../store/profile.reducer';
import * as ProfileActions from '../store/profile.actions';
import {Store} from '@ngrx/store';
import {skipWhile} from 'rxjs/operators';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  currentProfileSubscription: Subscription;
  detailsForm: FormGroup;
  editMode = false;
  selectedId = null;
  currentProfile: [string, UserDetailsModel] = [null, null];
  isSAdmin = false;

  constructor(private route: ActivatedRoute,
              private store: Store<profileReducer.State>,
              private profileService: ProfilesService) {
  }

  ngOnInit() {
    if ((this.route.snapshot.url.join('')).indexOf('edit') >= 0) {
      this.editMode = true;
      this.selectedId = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : null;
    }

    this.store.dispatch(new ProfileActions.EditedProfile({selectedId: this.selectedId, editedMode: this.editMode}));

    this.initForm();

    this.currentProfileSubscription = this.profileService.profileSubject
      .pipe(
        skipWhile(data => data === null)
      )
      .subscribe(
      data => {
        this.currentProfile = data;
        this.isSAdmin = this.currentProfile ? this.currentProfile[1].isSAdmin : false;

        !!this.selectedId
          ? this.detailsForm.patchValue(this.profileService.profilesDataSubject.value[this.selectedId][1])
          : this.detailsForm.patchValue(this.currentProfile[1]);
      }
    );
  }

  initForm() {
    this.detailsForm = new FormGroup({
      name: new FormControl({value: '', disabled: !this.editMode}, Validators.required),
      surname: new FormControl({value: '', disabled: !this.editMode}, Validators.required),
      email: new FormControl({value: '', disabled: true}, Validators.required),
      phone: new FormControl({value: '', disabled: !this.editMode}, Validators.required),
      uid: new FormControl({value: '', disabled: true}, Validators.required),
      isSAdmin: new FormControl({value: '', disabled: true}, Validators.required),

    });
  }

  saveChanges() {
    const data: UserDetailsModel = this.detailsForm.getRawValue();
    if (this.selectedId) {
      const profiles = this.profileService.profilesDataSubject.value;
      this.store.dispatch(
        new ProfileActions.UpdateProfile({key: profiles[this.selectedId][0], profile: data})
      );
    } else {
      this.store.dispatch(new ProfileActions.UpdateProfile({key: this.currentProfile[0], profile: data}));
    }

  }

  ngOnDestroy() {
    this.currentProfileSubscription.unsubscribe();
  }
}
