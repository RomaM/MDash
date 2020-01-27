import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as infoReducer from './store/info.reducer';
import {LoadInfo} from './store/info.actions';

@Component({
  selector: 'app-items',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  constructor(private store: Store<infoReducer.State>) {}

  ngOnInit() {
    this.store.dispatch(new LoadInfo());
  }
}
