import {Injectable} from '@angular/core';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import * as infoReducer from './info.reducer';
import {
  AddInfo,
  InfoActionsTypes,
  AddInfoSuccess,
  LoadInfoSuccess,
  DeleteInfo,
  DeleteInfoSuccess, EditInfo, UpdateInfo, UpdateInfoSuccess
} from './info.actions';
import {InfoService} from '../../../shared/services/info.service';
import {of, throwError} from 'rxjs';

@Injectable()

export class InfoEffects {
  constructor(private actions$: Actions,
              private store: Store<infoReducer.State>,
              private router: Router,
              private infoService: InfoService) {}

  @Effect()
  loadInfo$ = this.actions$.pipe(
    ofType(<string>InfoActionsTypes.LOAD_INFO),
    withLatestFrom(this.store.pipe(
      select(state => state['infoState'].loaded)
    )),
    filter(([, loaded]) => !loaded),
    switchMap(() => this.infoService.fetchItems().pipe(
      filter((data) => !!data),
      map(data => {
        const listArr = [];
        for (const [key, value] of Object.entries(data)) {
          value['key'] = key;
          listArr.push(value);
        }
        return new LoadInfoSuccess({loaded: true, linkList: listArr});
      })
    )),
    catchError(err => of(`Info List Loading: ${err}`))
  );

  @Effect()
  addInfo$ = this.actions$.pipe(
    ofType(<string>InfoActionsTypes.ADD_INFO),
    switchMap((action: AddInfo) => this.infoService.addItem(action.payload).pipe(
      map((res) => {
        const info = {...action.payload};
        info.key = res.name;
        return new AddInfoSuccess(info);
      }),
      tap(() => this.router.navigate(['/info'])),
      catchError(err => throwError(err))
    )),
    catchError(err => of(`Info Item Adding: ${err}`))
  );

  @Effect()
  deleteInfo$ = this.actions$.pipe(
    ofType(<string>InfoActionsTypes.DELETE_INFO),
    switchMap((action: DeleteInfo) => this.infoService.removeItem(action.payload).pipe(
      map(res => {
        return new DeleteInfoSuccess(action.payload);
      }),
      tap(() => this.router.navigate(['/info'])),
      catchError(err => throwError(err))
    )),
    catchError(err => of(`Info Item Removing: ${err}`))
  );

  @Effect()
  updateInfo$ = this.actions$.pipe(
    ofType(<string>InfoActionsTypes.UPDATE_INFO),
    switchMap((action: UpdateInfo) => {
      const {key, ...details} = action.payload;
      return this.infoService.updateItem(key, details).pipe(
        map(res => {
          return new UpdateInfoSuccess({key: key, ...details});
        }),
        tap(() => this.router.navigate(['/info'])),
        catchError(err => throwError(err))
      );
    }),
    catchError(err => of(`Info Item Editing: ${err}`))
  );
}
