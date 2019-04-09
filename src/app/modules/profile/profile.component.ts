import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import {Store} from '@ngrx/store';
import * as profileReducer from './store/profile.reducer';
import {ProfilesService} from '../../shared/services/profiles.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, DoCheck {
  constructor(private profileService: ProfilesService,
              private store: Store<profileReducer.State>) { }

  ngOnInit() {
  }

  ngDoCheck () {
    // console.log('doCheck', Zone.currentTask.source, Zone.currentTask.data.__creationTrace_);
  }
}
