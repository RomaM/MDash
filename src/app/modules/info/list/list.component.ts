import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfilesService} from '../../../shared/services/profiles.service';
import {Observable, of, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {infoReducer, initialState, State} from '../store/info.reducer';
import {catchError, filter, map, skipWhile, tap} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(private profileService: ProfilesService,
              private store: Store<State>) {}

  profileSubscription: Subscription;
  isSAdmin = false;
  infoList$: Observable<any>;

  ngOnInit() {
    this.profileSubscription = this.profileService.profileSubject.subscribe(data => {
      if (data !== null) { this.isSAdmin = data[1]['isSAdmin']; }
    });

    // this.store.pipe(
    //   select(state => console.log(state))
    // ).subscribe();

    this.infoList$ = this.store.pipe(
      select(state => state['infoState'].linkList),
      filter((data: any[]) => data.length > 0),
      catchError(err => of(`Info List Error: ${err}`))
    );
  }

  editItem() {
  }

  removeItem() {}

  ngOnDestroy() {
    if (this.profileSubscription) { this.profileSubscription.unsubscribe(); }
  }
}
