import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {PageDetailsModel} from '../models/page-detail.model';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {
  constructor(private httpClient: HttpClient) {}

  storeItems(items: any[]) {
    const req = new HttpRequest('PUT', 'https://funnelsdetails.firebaseio.com/pages.json',
      items, {reportProgress: true});

    return this.httpClient.request(req);
  }

  getItems() {
    return this.httpClient.get<any>('https://funnelsdetails.firebaseio.com/pages.json',
      {
        observe: 'body',
        responseType: 'json'
      });
  }
}

