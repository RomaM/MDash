import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  showLoader = new BehaviorSubject<boolean>(false);

  show() { this.showLoader.next(true); }

  hide() { this.showLoader.next(false); }

  constructor() { }
}
