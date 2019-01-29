import {Component, OnDestroy, OnInit} from '@angular/core';
import {ItemsData, PageDetailsModel} from '../../../shared/models/page-detail.model';
import {select, Store} from '@ngrx/store';
import * as pagesReducer from '../store/pages.reducers';
import {Observable, Subscription} from 'rxjs';
import {ItemsService} from '../../../shared/services/items.service';
import {tap, map, switchMap, timeout} from 'rxjs/operators';

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

  pagesData: any = {};
  objKeys = Object.keys;

  // pagesData: ItemsData = {
  //   list: [
  //       {
  //         id: 1,
  //         author: 'Roman Maiboroda',
  //         title: 'breaking-news-mar966-en',
  //         brand: 'tradefw',
  //         lang: 'en',
  //         url: 'http://lp.tradefw.com/cmpn/page/breaking-news-mar966-en.php',
  //         taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-966',
  //         steps: 1,
  //         features: {bb: true, video: true},
  //         description: '',
  //         image: 'assets/images/funnels/TradeBreakingNews.png',
  //         date: '21.09.18',
  //       },
  //       {
  //         id: 2,
  //         author: 'Roman Maiboroda',
  //         title: 'centurenapp-it',
  //         brand: 'glenm',
  //         lang: 'it',
  //         url: 'https://promotions.abvacapital.com/centurenapp-it/',
  //         taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-961',
  //         steps: 2,
  //         features: {bb: true, video: true},
  //         description: '',
  //         image: 'assets/images/funnels/CenturenApp.png',
  //         date: '12.09.18',
  //       },
  //       {
  //         id: 3,
  //         author: 'Roman Maiboroda',
  //         title: 'breaking-news-mar966-en',
  //         brand: 'tradefw',
  //         lang: 'en',
  //         url: 'http://lp.tradefw.com/cmpn/page/breaking-news-mar966-en.php',
  //         taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-966',
  //         steps: 1,
  //         features: {bb: true, video: true},
  //         description: '',
  //         image: 'assets/images/funnels/TradeBreakingNews.png',
  //         date: '21.09.18',
  //       },
  //       {
  //         id: 4,
  //         author: 'Roman Maiboroda',
  //         title: 'centurenapp-it',
  //         brand: 'glenm',
  //         lang: 'it',
  //         url: 'https://promotions.abvacapital.com/centurenapp-it/',
  //         taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-961',
  //         steps: 2,
  //         features: {bb: true, video: true},
  //         description: '',
  //         image: 'assets/images/funnels/CenturenApp.png',
  //         date: '12.09.18',
  //       },
  //       {
  //         id: 5,
  //         author: 'Roman Maiboroda',
  //         title: 'breaking-news-mar966-en',
  //         brand: 'tradefw',
  //         lang: 'en',
  //         url: 'http://lp.tradefw.com/cmpn/page/breaking-news-mar966-en.php',
  //         taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-966',
  //         steps: 1,
  //         features: {bb: true, video: true},
  //         description: '',
  //         image: 'assets/images/funnels/TradeBreakingNews.png',
  //         date: '21.09.18',
  //       },
  //       {
  //         id: 6,
  //         author: 'Roman Maiboroda',
  //         title: 'centurenapp-it',
  //         brand: 'glenm',
  //         lang: 'it',
  //         url: 'https://promotions.abvacapital.com/centurenapp-it/',
  //         taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-961',
  //         steps: 2,
  //         features: {bb: true, video: true},
  //         description: '',
  //         image: 'assets/images/funnels/CenturenApp.png',
  //         date: '12.09.18',
  //       },
  //       {
  //         id: 7,
  //         author: 'Roman Maiboroda',
  //         title: 'breaking-news-mar966-en',
  //         brand: 'tradefw',
  //         lang: 'en',
  //         url: 'http://lp.tradefw.com/cmpn/page/breaking-news-mar966-en.php',
  //         taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-966',
  //         steps: 1,
  //         features: {bb: true, video: true},
  //         description: '',
  //         image: 'assets/images/funnels/TradeBreakingNews.png',
  //         date: '21.09.18',
  //       },
  //       {
  //         id: 8,
  //         author: 'Roman Maiboroda',
  //         title: 'centurenapp-it',
  //         brand: 'glenm',
  //         lang: 'it',
  //         url: 'https://promotions.abvacapital.com/centurenapp-it/',
  //         taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-961',
  //         steps: 2,
  //         features: {bb: true, video: true},
  //         description: '',
  //         image: 'assets/images/funnels/CenturenApp.png',
  //         date: '12.09.18',
  //       },
  //       {
  //         id: 9,
  //         author: 'Roman Maiboroda',
  //         title: 'centurenapp-it',
  //         brand: 'glenm',
  //         lang: 'it',
  //         url: 'https://promotions.abvacapital.com/centurenapp-it/',
  //         taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-961',
  //         steps: 2,
  //         features: {bb: true, video: true},
  //         description: '',
  //         image: 'assets/images/funnels/CenturenApp.png',
  //         date: '12.09.18',
  //       },
  //       {
  //         id: 10,
  //         author: 'Roman Maiboroda',
  //         title: 'centurenapp-it',
  //         brand: 'glenm',
  //         lang: 'it',
  //         url: 'https://promotions.abvacapital.com/centurenapp-it/',
  //         taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-961',
  //         steps: 2,
  //         features: {bb: true, video: true},
  //         description: '',
  //         image: 'assets/images/funnels/CenturenApp.png',
  //         date: '12.09.18',
  //       },
  //
  //   ],
  //   timeStamp: 123123123
  // };

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
        if (Object.keys(data).length > 0 && data.constructor === Object) {
          this.pagesData = data;
        }
      }
    );
  }

  push() {
    console.log(this.pagesData);
    this.itemsService.pushItems(this.pagesData).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  fetch() {
    this.itemsService.fetchItems().subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.itemsLoadedSubscription.unsubscribe();
  }
}
