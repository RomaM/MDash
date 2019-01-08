import { Component, OnInit } from '@angular/core';
import {PageDetailsModel} from '../../shared/models/page-detail.model';
import {Store} from '@ngrx/store';
import * as pagesReducers from './store/pages.reducers';
import * as pagesActions from './store/pages.actions';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  pagesList: PageDetailsModel[];

  constructor(private store: Store<pagesReducers.State>) {

  }

  ngOnInit() {
    this.store.dispatch(new pagesActions.FetchPagesAction());
    setTimeout(() => {
      this.store.dispatch(new pagesActions.FetchPagesAction());
    }, 2000);
  }

}
