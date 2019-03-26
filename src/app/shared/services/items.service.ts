import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ItemsData, PageDetailsModel} from '../models/page-detail.model';
import {map, tap, switchMap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {
  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  // loadedData = new BehaviorSubject<ItemsData>({list: [], timestamp: ''});
  loadedData = new BehaviorSubject<any>([]);

  generateTimestamp(data: PageDetailsModel): string {
    let timestamp = 'FailedTimestamp';
    if (data.title && data.author && data.date) {
      timestamp = (data.date + data.title + data.author).replace(/[-.* ]/g, '');
    }
    return timestamp;
  }

  addItem(item: any) {
    return this.httpClient.post<any>('https://funnelsdetails.firebaseio.com/pages/list.json',
      item
      );
    // return fromPromise(this.db.object('list').set(item));
  }

  updateItem(key: string, item: Object) {
    return this.httpClient.patch<any>(
      'https://funnelsdetails.firebaseio.com/pages/list/' + key + '.json',
      item
    );
  }

  removeItem(key) {
    return this.httpClient.delete<any>(
      'https://funnelsdetails.firebaseio.com/pages/list/' + key + '.json'
    );
  }

  pushItems(items: any) {
    const req = new HttpRequest('PUT', 'https://funnelsdetails.firebaseio.com/pages.json',
      items, {reportProgress: true});

    return this.httpClient.request(req);
  }

  fetchItems() {
    const token$ = fromPromise(this.authService.getToken());

    return token$.pipe(
      switchMap(
        (token) => {
          return this.httpClient.get<any>('https://funnelsdetails.firebaseio.com/pages.json?auth=' + token,
            {
              observe: 'body',
              responseType: 'json'
            });
        }
      ),
      map(data => {
        data.list = Object.entries(data.list);
        return data;
      })
    );

  }

  getTimestamp() {
    return this.httpClient.get('https://funnelsdetails.firebaseio.com/pages/timestamp.json')
      .pipe(
        map( timestamp => {
          return timestamp;
        })
      );
  }

  updateTimestamp(data: string) {
    return this.httpClient.patch('https://funnelsdetails.firebaseio.com/pages/timestamp.json',
      {val: data}, {reportProgress: true});
  }

  onLoaded(data: PageDetailsModel, key?: string) {
    if (key) {
      const newList = this.loadedData.getValue();

      newList.push([key, data]);
      this.loadedData.next(newList);
    } else {
      this.loadedData.next(data);
    }
  }
}

