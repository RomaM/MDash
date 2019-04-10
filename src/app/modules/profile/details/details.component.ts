import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/index';
import {ProfilesService} from '../../../shared/services/profiles.service';
import {AuthService} from '../../../shared/services/auth.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  profilesDataSubscription: Subscription;
  // userDataSubscription: Subscription;
  detailsForm: FormGroup;
  editMode: boolean;
  isSAdmin = true;

  constructor(private route: ActivatedRoute,
              private profileService: ProfilesService,
              private authService: AuthService) {
  }

  ngOnInit() {
    (this.route.snapshot.url.join('')).indexOf('edit') >= 0 ? this.editMode = true : this.editMode = false;
    this.initForm();

    this.profilesDataSubscription = this.profileService.currentProfileSubject.subscribe(
      data => {
        if (data && this.detailsForm) {

        }
      }
    );

    // this.userDataSubscription = this.authService.userDataSubject.subscribe(
    //   data => console.log(data)
    // );
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
    // this.userDataSubscription.unsubscribe();
  }
}
