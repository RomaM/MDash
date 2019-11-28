import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from './store/info.reducer';
import {LoadInfo} from './store/info.actions';

@Component({
  selector: 'app-items',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new LoadInfo());
  }
}
