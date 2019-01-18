import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ItemsData} from '../models/page-detail.model';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {
  constructor(private httpClient: HttpClient) {}

  loadedData = new BehaviorSubject([]);

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

  onLoaded(data: Array<ItemsData>) {
    this.loadedData.next(data);
  }
}

