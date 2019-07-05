import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Observable, of, throwError} from 'rxjs';
import {combineLatest, tap, switchMap, withLatestFrom, map, catchError, takeWhile} from 'rxjs/operators';

import * as PagesActions from './pages.actions';
import * as pageReducer from './pages.reducer';
import {ItemsService} from '../../../shared/services/items.service';
import {Route, Router} from '@angular/router';

@Injectable()

export class PagesEffects {
  constructor(private actions$: Actions,
              private store: Store<pageReducer.State>,
              private itemsService: ItemsService,
              private router: Router) {}

  @Effect()
  loadPages$ = this.actions$.pipe(
    ofType(<string>PagesActions.PageActionTypes.LOAD_PAGES),
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
      this.itemsService.onLoaded(data['list']);
      return data;
    }),
    switchMap( data => {
      return [
        new PagesActions.LoadingPages(true),
        new PagesActions.SetTimestamp(data['timestamp'].val)];
    }),
    catchError( err => of(`Pages Service: ${err}`))
  );

  @Effect()
  addPage$ = this.actions$.pipe(
    ofType(<string>PagesActions.PageActionTypes.ADD_PAGE),
    switchMap((action: PagesActions.AddPage) => this.itemsService.addItem(action.payload).pipe(
      map(data => {
        const timestamp = this.itemsService.generateTimestamp(action.payload);
        this.itemsService.onLoaded(action.payload, data.name);
        return new PagesActions.UpdateTimestamp(timestamp);
      }),
      catchError(err => throwError(err))
    )),
    tap(() => this.router.navigate(['/list'])),
    catchError( err => of(`Pages Service: ${err}`))
  );

  @Effect({dispatch: false})
  updatePage$ = this.actions$.pipe(
    ofType(<string>PagesActions.PageActionTypes.UPDATE_PAGE),
    switchMap((action: PagesActions.UpdatePage) => {
      return this.itemsService.updateItem(action.payload.key, action.payload.val);
    }),
    catchError(err => {
      return throwError(err);
    }),
    tap(() => this.router.navigate(['/list'])),
    catchError( err => of(`Pages Service: ${err}`))
  );

  @Effect()
  getTimestamp$ = this.actions$.pipe(
    ofType(<string>PagesActions.PageActionTypes.GET_TIMESTAMP),
    switchMap(data => this.itemsService.getTimestamp().pipe(
      map((timestamp: {[key: string]: string}) => new PagesActions.SetTimestamp(timestamp['key']))
    )),
    catchError( err => of(`Pages Service: ${err}`))
  );

  @Effect()
  updateTimestamp$ = this.actions$.pipe(
    ofType(<string>PagesActions.PageActionTypes.UPDATE_TIMESTAMP),
    switchMap((action: PagesActions.UpdateTimestamp) => {
      return this.itemsService.updateTimestamp(action.payload).pipe(
        map(data => new PagesActions.SetTimestamp(action.payload))
      );
    }),
    catchError( err => of(`Pages Service: ${err}`))
  );
}
