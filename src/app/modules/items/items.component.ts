import {Component, OnInit} from '@angular/core';
import {ItemsService} from '../../shared/services/items.service';
import {select, Store} from '@ngrx/store';
import * as pagesReducer from './store/pages.reducers';
import * as PagesActions from './store/pages.actions';
import {map, tap} from 'rxjs/operators';
import {ItemsData} from '../../shared/models/page-detail.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  constructor(private itemsService: ItemsService,
              private store: Store<pagesReducer.State>) {}

  itemsData: Array<ItemsData>;

  ngOnInit() {
    // this.store.pipe(
    //   select('pagesState', 'loaded'),
    //   map((data) => {
    //     console.log(data);
    //   })
    // );

    this.store.dispatch(new PagesActions.LoadPages());

  }
}
