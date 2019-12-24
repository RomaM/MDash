import { Component, OnInit } from '@angular/core';
import * as PagesActions from '../items/store/pages.actions';
import {Store} from '@ngrx/store';
import * as pagesReducer from '../items/store/pages.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private store: Store<pagesReducer.State>) { }

  ngOnInit() {
    this.store.dispatch(new PagesActions.LoadPages());
  }

}
