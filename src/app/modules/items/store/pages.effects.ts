import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Observable, throwError} from 'rxjs';
import {switchMap, withLatestFrom, map, catchError} from 'rxjs/operators';

import * as PagesActions from './pages.actions';
import * as pageReducer from './pages.reducers';
import {ItemsService} from '../../../shared/services/items.service';

@Injectable()

export class PagesEffects {
  // @Effect()
  // fetchPages$: Observable<PagesActions.PageActions> = this.actions$.pipe(
  //   ofType(PagesActions.PageActionTypes.FETCH_PAGES),
  //   withLatestFrom(this.store.pipe(
  //     select('pagesState', 'loaded')
  //   )),
  //   takeWhile(([, loaded]) => {
  //     console.log('Loaded: ' + loaded);
  //     return loaded === false;
  //   }),
  //   switchMap( () => {
  //     console.log('Fetch Req');
  //     return this.itemsService.fetchItems();
  //   }),
  //   map((payload) => {
  //     return new PagesActions.SetPagesAction(payload);
  //   })
  // );

  // @Effect()
  // addItem$: Observable<PagesActions.AddPageAction> = this.actions$.pipe(
  //   ofType(PagesActions.PageActionTypes.ADD_PAGE),
  //
  // );

  @Effect()
  loadPages$: Observable<PagesActions.PageActions> = this.actions$.pipe(
    ofType(PagesActions.PageActionTypes.LOAD_PAGES),
    switchMap(() => this.itemsService.fetchItems().pipe(
        map( data => data),
        catchError((err) => throwError(err))
      )
    ),
    map( data => {
      this.itemsService.onLoaded(data);
      return new PagesActions.LoadingPages(true);
    })
  );

  @Effect()
  pushPage$ = this.actions$.pipe(
    ofType(PagesActions.PageActionTypes.ADD_PAGE, PagesActions.PageActionTypes.UPDATE_PAGE),
    withLatestFrom(this.store.select('pagesState', 'selected')),
    switchMap((item) => {
     if (item) {

       // this.itemsService.addItem(item);
     }
    })
  )

  constructor(private actions$: Actions,
              private store: Store<pageReducer.State>,
              private itemsService: ItemsService) {}
}
