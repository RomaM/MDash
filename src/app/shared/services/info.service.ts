import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class InfoService {
  constructor(private httpClient: HttpClient) {}

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

  addItem(item: any) {
    return this.httpClient.post<any>('https://funnelsdetails.firebaseio.com/info.json', item);
  }

  removeItem(key: string) {
    return this.httpClient.delete<any>(`https://funnelsdetails.firebaseio.com/info/${key}.json`);
  }

  updateItem(key: string, infoDetails: any) {
    return this.httpClient.patch(`https://funnelsdetails.firebaseio.com/info/${key}.json`, infoDetails);
  }
}
