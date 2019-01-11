import {Component, OnInit} from '@angular/core';
import {ItemsService} from '../../shared/services/items.service';
import {select, Store} from '@ngrx/store';
import * as pagesReducer from './store/pages.reducers';
import * as PagesActions from './store/pages.actions';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  constructor(private itemsService: ItemsService,
              private store: Store<pagesReducer.State>) {}

  ngOnInit() {
    // this.itemsService.onLoaded();

    // this.store.pipe(
    //   select('pagesState', 'loaded'),
    //   map((data) => {
    //     console.log(data);
    //   })
    // );

    // this.store.dispatch(new PagesActions.LoadingPagesAction(true));

    this.itemsService.fetchItems().subscribe(
      (serverData: any) => {
        console.log('Fetch');
        this.itemsService.onLoaded(serverData.list);

        this.store.dispatch(new PagesActions.LoadingPagesAction(true));
      },
      (error) => {
        console.log('Fetch Items Error: '); // todo: Error to Log
        console.log(error);
      }
    );
  }
}
