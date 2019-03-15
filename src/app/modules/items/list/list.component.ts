import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemsData, PageDetailsModel} from '../../../shared/models/page-detail.model';
import {select, Store} from '@ngrx/store';
import * as pagesReducer from '../store/pages.reducers';
import {Observable, Subscription} from 'rxjs';
import {ItemsService} from '../../../shared/services/items.service';
import {tap, map, switchMap, timeout} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit, OnDestroy {
  itemsLoadedSubscription: Subscription;

  filterTitle: string;
  filterSteps: string;
  filterBrands: string;
  filterLang: string;

  pagesData: any = [];

  constructor(private store: Store<pagesReducer.State>,
              private itemsService: ItemsService) { }

  ngOnInit() {
    this.filterTitle = '';
    this.filterSteps = '';
    this.filterBrands = '';
    this.filterLang = '';

    this.itemsLoadedSubscription = this.itemsService.loadedData
      .subscribe(
      (data: any) => {
        // if (Object.keys(data).length > 0 && data.constructor === Object) {
        if (data.length > 0) {
          this.pagesData = data;
        }
      }
    );
  }

  ngOnDestroy() {
    this.itemsLoadedSubscription.unsubscribe();
  }

  log() {
    // this.db.list('pages/list').valueChanges().subscribe(data =>
    // console.log(data));
  }
}
