import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {switchMap, map, withLatestFrom, mergeMap} from 'rxjs/operators';

import * as PagesActions from './pages.actions';
import * as pageReducer from './pages.reducers';
import {ItemsService} from '../../../shared/services/items.service';

@Injectable()

export class PagesEffects {
  @Effect()
  fetchPages$: Observable<PagesActions.PageActions> = this.actions$.pipe(
    ofType(PagesActions.PageActionTypes.FETCH_PAGES),
    switchMap( () => {
      return this.itemsService.fetchItems();
    }),
    map((payload) => {
      return new PagesActions.SetPagesAction(payload);
    }),
    // map(() => new PagesActions.FetchSuccessAction())
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
