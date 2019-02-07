import {Component, OnInit} from '@angular/core';
import {ItemsService} from '../../shared/services/items.service';
import {select, Store} from '@ngrx/store';
import * as pagesReducer from './store/pages.reducers';
import * as PagesActions from './store/pages.actions';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  constructor(private store: Store<pagesReducer.State>) {}

  ngOnInit() {
    this.store.dispatch(new PagesActions.LoadPages());
  }
}
