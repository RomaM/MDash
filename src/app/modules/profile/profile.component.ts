import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import {Subscription} from 'rxjs/index';
import {AuthService} from '../../shared/services/auth.service';
import {Store} from '@ngrx/store';
import * as profileReducer from './store/profile.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, DoCheck, OnDestroy {
  profilesSubscription: Subscription;

  constructor(private authService: AuthService,
              private store: Store<profileReducer.State>) { }

  ngOnInit() {
    this.profilesSubscription = this.authService.userDataSubject.subscribe(
      profiles => {
        console.log(profiles);
      }
    );
  }

  ngDoCheck () {
    // console.log('doCheck', Zone.currentTask.source, Zone.currentTask.data.__creationTrace_);
  }

  ngOnDestroy() {
    this.profilesSubscription.unsubscribe();
  }
}
