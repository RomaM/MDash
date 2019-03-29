import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as pagesReducer from './store/pages.reducer';
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
