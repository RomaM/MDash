import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Store} from '@ngrx/store';

import * as pagesReducer from '../store/pages.reducers';
import * as PagesActions from '../store/pages.actions';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData;
  @Input() index;

  objKeys = Object.keys;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<pagesReducer.State>) { }

  ngOnInit() {

  }

  editItem(index: number) {
    this.router.navigate(['item', index], {relativeTo: this.route});
  }
}
