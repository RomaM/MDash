import { Component, OnInit } from '@angular/core';
import {PageDetailsModel} from '../../../shared/models/page-detail.model';
import {select, Store} from '@ngrx/store';
import * as PagesActions from '../store/pages.actions';
import * as pagesReducer from '../store/pages.reducers';
import {Observable, pipe} from 'rxjs';
import {ItemsService} from '../../../shared/services/items.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  filterTitle: string;
  filterSteps: string;

  pagesList: Observable<PageDetailsModel[]>;
  // pagesList: PageDetailsModel[]
  //   = [
  //   {
  //     id: 1,
  //     title: 'breaking-news-mar966-en',
  //     brand: 'tradefw',
  //     lang: 'en',
  //     url: 'http://lp.tradefw.com/cmpn/page/breaking-news-mar966-en.php',
  //     taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-966',
  //     steps: 1,
  //     features: ['bb', 'video'],
  //     description: '',
  //     image: 'assets/images/funnels/TradeBreakingNews.png',
  //     date: '21.09.18',
  //   },
  //   {
  //     id: 2,
  //     title: 'centurenapp-it',
  //     brand: 'Glenm',
  //     lang: 'it',
  //     url: 'https://promotions.abvacapital.com/centurenapp-it/',
  //     taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-961',
  //     steps: 2,
  //     features: ['bb', 'video'],
  //     description: '',
  //     image: 'assets/images/funnels/CenturenApp.png',
  //     date: '12.09.18',
  //   },
  //   {
  //     id: 3,
  //     title: 'breaking-news-mar966-en',
  //     brand: 'tradefw',
  //     lang: 'en',
  //     url: 'http://lp.tradefw.com/cmpn/page/breaking-news-mar966-en.php',
  //     taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-966',
  //     steps: 1,
  //     features: ['bb', 'video'],
  //     description: '',
  //     image: 'assets/images/funnels/TradeBreakingNews.png',
  //     date: '21.09.18',
  //   },
  //   {
  //     id: 4,
  //     title: 'centurenapp-it',
  //     brand: 'Glenm',
  //     lang: 'it',
  //     url: 'https://promotions.abvacapital.com/centurenapp-it/',
  //     taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-961',
  //     steps: 2,
  //     features: ['bb', 'video'],
  //     description: '',
  //     image: 'assets/images/funnels/CenturenApp.png',
  //     date: '12.09.18',
  //   },
  //   {
  //     id: 5,
  //     title: 'breaking-news-mar966-en',
  //     brand: 'tradefw',
  //     lang: 'en',
  //     url: 'http://lp.tradefw.com/cmpn/page/breaking-news-mar966-en.php',
  //     taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-966',
  //     steps: 1,
  //     features: ['bb', 'video'],
  //     description: '',
  //     image: 'assets/images/funnels/TradeBreakingNews.png',
  //     date: '21.09.18',
  //   },
  //   {
  //     id: 6,
  //     title: 'centurenapp-it',
  //     brand: 'Glenm',
  //     lang: 'it',
  //     url: 'https://promotions.abvacapital.com/centurenapp-it/',
  //     taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-961',
  //     steps: 2,
  //     features: ['bb', 'video'],
  //     description: '',
  //     image: 'assets/images/funnels/CenturenApp.png',
  //     date: '12.09.18',
  //   },
  //   {
  //     id: 7,
  //     title: 'breaking-news-mar966-en',
  //     brand: 'tradefw',
  //     lang: 'en',
  //     url: 'http://lp.tradefw.com/cmpn/page/breaking-news-mar966-en.php',
  //     taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-966',
  //     steps: 1,
  //     features: ['bb', 'video'],
  //     description: '',
  //     image: 'assets/images/funnels/TradeBreakingNews.png',
  //     date: '21.09.18',
  //   },
  //   {
  //     id: 8,
  //     title: 'centurenapp-it',
  //     brand: 'Glenm',
  //     lang: 'it',
  //     url: 'https://promotions.abvacapital.com/centurenapp-it/',
  //     taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-961',
  //     steps: 2,
  //     features: ['bb', 'video'],
  //     description: '',
  //     image: 'assets/images/funnels/CenturenApp.png',
  //     date: '12.09.18',
  //   },
  //   {
  //     id: 9,
  //     title: 'breaking-news-mar966-en',
  //     brand: 'tradefw',
  //     lang: 'en',
  //     url: 'http://lp.tradefw.com/cmpn/page/breaking-news-mar966-en.php',
  //     taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-966',
  //     steps: 1,
  //     features: ['bb', 'video'],
  //     description: '',
  //     image: 'assets/images/funnels/TradeBreakingNews.png',
  //     date: '21.09.18',
  //   },
  //   {
  //     id: 10,
  //     title: 'centurenapp-it',
  //     brand: 'Glenm',
  //     lang: 'it',
  //     url: 'https://promotions.abvacapital.com/centurenapp-it/',
  //     taskUrl: 'https://jira.ourmicroservices.com/browse/MAR-961',
  //     steps: 2,
  //     features: ['bb', 'video'],
  //     description: '',
  //     image: 'assets/images/funnels/CenturenApp.png',
  //     date: '12.09.18',
  //   },
  // ];

  constructor(private store: Store<pagesReducer.State>,
              private itemsService: ItemsService) { }

  ngOnInit() {
    this.filterTitle = '';
    this.filterSteps = '';

    this.store.pipe(
      select('pagesState', 'pages')
    ).subscribe(
      data => this.pagesList = data
    );
  }

  push() {
    // this.store.dispatch(new PagesActions.PushPagesAction());

    // this.itemsService.storeItems(this.pagesList).subscribe();
  }
}
