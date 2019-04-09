import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {UserDetailsModel} from '../../../shared/models/user-details.model';
import {ProfilesService} from '../../../shared/services/profiles.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  profilesSubscription: Subscription;
  profilesData: UserDetailsModel[];

  constructor(private profileService: ProfilesService) { }

  ngOnInit() {
    this.profilesSubscription = this.profileService.profilesDataSubject.subscribe(
      data => {
        this.profilesData = data;
      }
    );
  }

  ngOnDestroy() {
    this.profilesSubscription.unsubscribe();
  }

}
