import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable, empty} from 'rxjs';
import {switchMap, map, withLatestFrom, takeUntil, takeWhile, tap} from 'rxjs/operators';

import * as PagesActions from './pages.actions';
import * as pageReducer from './pages.reducers';
import {ItemsService} from '../../../shared/services/items.service';

@Injectable()

export class PagesEffects {
  @Effect()
  fetchPages$: Observable<PagesActions.PageActions> = this.actions$.pipe(
    ofType(PagesActions.PageActionTypes.FETCH_PAGES),
    withLatestFrom(this.store.pipe(
      select('pagesState', 'loaded')
    )),
    takeWhile(([, loaded]) => {
      console.log('Loaded: ' + loaded);
      return loaded === false;
    }),
    switchMap( () => {
      console.log('Fetch Req');
      return this.itemsService.fetchItems();
    }),
    map((payload) => {
      return new PagesActions.SetPagesAction(payload);
    })
  );

  // @Effect()
  // setPages$ = this.actions$.pipe(
  //   ofType(PagesActions.PageActionTypes.PUSH_PAGES),
  //   withLatestFrom(() => {
  //     const state = this.store.select('pagesState');
  //     console.log(state);
  //     return state;
  //   }),
  //   switchMap((payload) => {
  //     const req = new HttpRequest('PUT', 'https://funnelsdetails.firebaseio.com/pages.json',
  //       payload, {reportProgress: true});
  //
  //     return this.httpClient.request(req);
  //   })
  // );

  constructor(private actions$: Actions,
              private store: Store<pageReducer.State>,
              private itemsService: ItemsService) {}
}
