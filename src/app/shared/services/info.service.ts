import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class InfoService {
  constructor(private httpClient: HttpClient) {}

  addItem(item: any) {
    return this.httpClient.post<any>('https://funnelsdetails.firebaseio.com/info.json', item);
  }

  fetchItems() {
    return this.httpClient.get<any>('https://funnelsdetails.firebaseio.com/info.json',
      {
        observe: 'body',
        responseType: 'json'
      })
      .pipe(
        map(data => data)
      );
  }
}
