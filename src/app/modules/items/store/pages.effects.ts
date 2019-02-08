import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Observable, throwError} from 'rxjs';
import {combineLatest, switchMap, withLatestFrom, map, catchError, takeWhile} from 'rxjs/operators';

import * as PagesActions from './pages.actions';
import * as pageReducer from './pages.reducers';
import {ItemsService} from '../../../shared/services/items.service';
import {mergeMap} from 'rxjs/internal/operators';

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
    withLatestFrom(this.store.pipe(
      select('pagesState', 'loaded')
    )),
    takeWhile(([, loaded]) => {
      return loaded === false;
    }),
    switchMap(() => this.itemsService.fetchItems().pipe(
        map( data => data),
        catchError((err) => throwError(err))
      )
    ),
    map( data => {
      this.itemsService.onLoaded(data.list);
      return data;
    }),
    switchMap( data => {
      return [
        new PagesActions.LoadingPages(true),
        new PagesActions.SetTimestamp(data.timestamp.val)];
    })
  );

  @Effect({dispatch: false})
  addPage$ = this.actions$.pipe(
    ofType(PagesActions.PageActionTypes.ADD_PAGE),
    mergeMap((action: PagesActions.AddPage) => {
      return [
        this.itemsService.setTimestamp(action.payload),
        this.itemsService.addItem(action.payload)
      ];
    })
    );

  @Effect({dispatch: false})
  updatePage$ = this.actions$.pipe(
    ofType(PagesActions.PageActionTypes.UPDATE_PAGE),
    switchMap((action: PagesActions.UpdatePage) => {
      return this.itemsService.updateItem(action.payload.key, action.payload.val);
    }),
    catchError(err => {
      console.log(throwError(err));
      return throwError(err);
    })
  );

  constructor(private actions$: Actions,
              private store: Store<pageReducer.State>,
              private itemsService: ItemsService) {}
}
