import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs/index';
import {ProfilesService} from '../../../shared/services/profiles.service';
import {AuthService} from '../../../shared/services/auth.service';
import {UserDetailsModel} from '../../../shared/models/user-details.model';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  profilesDataSubscription: Subscription;
  detailsForm: FormGroup;
  editMode = false;
  selectedId = -1;
  currentProfile: [string, UserDetailsModel] = [null, null];
  isSAdmin = false;

  constructor(private route: ActivatedRoute,
              private profileService: ProfilesService,
              private authService: AuthService) {
  }

  ngOnInit() {
    (this.route.snapshot.url.join('')).indexOf('edit') >= 0 ? this.editMode = true : this.editMode = false;
    this.selectedId = this.route.snapshot.params.id;

    this.initForm();

    this.profilesDataSubscription = this.profileService.profilesDataSubject.subscribe(
      data => {
        if (data) {
          this.currentProfile = this.profileService.profileSubject.value;
          console.log(this.currentProfile)
          this.isSAdmin = this.currentProfile[1].isSAdmin;

          !!this.selectedId
            ? this.detailsForm.patchValue(data[this.selectedId][1])
            : this.detailsForm.patchValue(this.currentProfile[1]);
        }
      }
    );
  }

  initForm() {
    this.detailsForm = new FormGroup({
      name: new FormControl({value: '', disabled: !this.editMode}, Validators.required),
      surname: new FormControl({value: '', disabled: !this.editMode}, Validators.required),
      email: new FormControl({value: '', disabled: !this.editMode}, Validators.required),
      phone: new FormControl({value: '', disabled: !this.editMode}, Validators.required),
      uid: new FormControl({value: '', disabled: !this.editMode}, Validators.required),

    });
  }

  ngOnDestroy() {
    this.profilesDataSubscription.unsubscribe();
  }
}
