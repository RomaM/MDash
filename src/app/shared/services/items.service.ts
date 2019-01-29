import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ItemsData, PageDetailsModel} from '../models/page-detail.model';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {
  constructor(private httpClient: HttpClient) {}

  loadedData = new BehaviorSubject(<any>{});

  addItem(item: any) {
    // const req = new HttpRequest('POST', 'https://funnelsdetails.firebaseio.com/pages.json',
    //   item, {reportProgress: true});
    //
    // return this.httpClient.request(req);

    const params = new HttpParams().set('name', '10');

    return this.httpClient.post<any>('https://funnelsdetails.firebaseio.com/pages/list.json',
      item, { params }
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
      });
  }

  onLoaded(data) {
    this.loadedData.next(data);
  }
}

