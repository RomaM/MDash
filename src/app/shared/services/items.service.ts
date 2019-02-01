import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ItemsData, PageDetailsModel} from '../models/page-detail.model';
import {map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ItemsService {
  constructor(private httpClient: HttpClient) {}

  loadedData = new BehaviorSubject(<any>{});

  addItem(item: any) {
    return this.httpClient.post<any>('https://funnelsdetails.firebaseio.com/pages/list.json',
      item
      );
  }

  updateItem(item: any, key) {
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
    return this.httpClient.get<any>('https://funnelsdetails.firebaseio.com/pages.json',
      {
        observe: 'body',
        responseType: 'json'
      }).pipe(
        map(data => {
          data.list = Object.entries(data.list);
          return data;
        }),
    );
  }

  setTimestamp(timestamp) {
    return this.httpClient.put('https://funnelsdetails.firebaseio.com/pages/timestamp.json',
      timestamp, {reportProgress: true});
  }

  getTimestamp() {
    return this.httpClient.get<{key, val}>('https://funnelsdetails.firebaseio.com/pages/timestamp.json')
      .pipe(
        map( timestamp => {
          return timestamp;
        })
      );
  }

  onLoaded(data) {
    this.loadedData.next(data);
  }
}

