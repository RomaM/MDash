import { Injectable } from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingService implements PreloadingStrategy {
  preload(route: Route, fn: Function): Observable<any> {
    return route.data && route.data['preload'] ? fn() : of(null);
  }
}
