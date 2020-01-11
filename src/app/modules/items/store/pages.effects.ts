import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Observable, of, throwError} from 'rxjs';
import {combineLatest, tap, switchMap, withLatestFrom, map, catchError, takeWhile, filter} from 'rxjs/operators';

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
      select(state => state['pagesState'].loaded)
    )),
    takeWhile(([, loaded]) => !loaded),
    switchMap(() => this.itemsService.fetchItems().pipe(
      // filter(data => !!data),
      map( data => {
        data['list'].sort((prev, next) => <any>new Date(prev[1].date) - <any>new Date(next[1].date));
        this.itemsService.loadedData.next(data['list']);
        return data;
      }),
      catchError((err) => {
        this.itemsService.loadedData.next([]);
        return throwError(err);
      })
      )
    ),
    switchMap( data => {
      return [
        new PagesActions.LoadingPages(true),
        new PagesActions.SetTimestamp(data['timestamp'].val)
      ];
    }),
    catchError( err => of(`Pages Service [Load Pages]: ${err}`))
  );

  @Effect()
  addPage$ = this.actions$.pipe(
    ofType(<string>PagesActions.PageActionTypes.ADD_PAGE),
    switchMap((action: PagesActions.AddPage) => this.itemsService.addItem(action.payload).pipe(
      map(data => {
        const timestamp = this.itemsService.generateTimestamp(action.payload);
        // this.itemsService.onLoaded(action.payload, data.name);

        const newList = this.itemsService.loadedData.getValue();
        newList.push([data['name'], action.payload]);

        newList.sort((prev, next) => <any>new Date(prev[1].date) - <any>new Date(next[1].date));

        this.itemsService.loadedData.next(newList);
        return new PagesActions.UpdateTimestamp(timestamp);
      }),
      catchError(err => throwError(err))
    )),
    tap(() => this.router.navigate(['/list'])),
    catchError( err => of(`Pages Service [Add Page]: ${err}`))
  );

  @Effect({dispatch: false})
  updatePage$ = this.actions$.pipe(
    ofType(<string>PagesActions.PageActionTypes.UPDATE_PAGE),
    switchMap((action: PagesActions.UpdatePage) => {
      let newList = this.itemsService.loadedData.getValue();
      newList = newList.map(el => {
        if (el[0] === action.payload.key) { el[1] = {...action.payload.val};
        }
        return el;
      });
      this.itemsService.loadedData.next(newList);

      return this.itemsService.updateItem(action.payload.key, action.payload.val);
    }),
    catchError(err => {
      return throwError(err);
    }),
    tap(() => this.router.navigate(['/list'])),
    catchError( err => of(`Pages Service [Update Page]: ${err}`))
  );

  @Effect({dispatch: false})
  deletePage$ = this.actions$.pipe(
    ofType(<string>PagesActions.PageActionTypes.DELETE_PAGE),
    switchMap((action: PagesActions.DeletePage) => {
      let newList = this.itemsService.loadedData.getValue();
      newList = newList.filter(el => el[0] !== action.payload);
      this.itemsService.loadedData.next(newList);

      return this.itemsService.removeItem(action.payload);
    }),
    catchError(err => {
      return throwError(err);
    }),
    tap(() => this.router.navigate(['/list'])),
    catchError( err => of(`Pages Service [Delete Page]: ${err}`))
  );

  @Effect()
  getTimestamp$ = this.actions$.pipe(
    ofType(<string>PagesActions.PageActionTypes.GET_TIMESTAMP),
    switchMap(data => this.itemsService.getTimestamp().pipe(
      map((timestamp: {[key: string]: string}) => new PagesActions.SetTimestamp(timestamp['key']))
    )),
    catchError( err => of(`Pages Service [Timestamp Get]: ${err}`))
  );

  @Effect()
  updateTimestamp$ = this.actions$.pipe(
    ofType(<string>PagesActions.PageActionTypes.UPDATE_TIMESTAMP),
    switchMap((action: PagesActions.UpdateTimestamp) => {
      return this.itemsService.updateTimestamp(action.payload).pipe(
        map(data => new PagesActions.SetTimestamp(action.payload))
      );
    }),
    catchError( err => of(`Pages Service [Timestamp Update]: ${err}`))
  );
}
