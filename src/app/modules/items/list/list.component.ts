import { Component, OnInit } from '@angular/core';
import {PageDetailsModel} from '../../../shared/models/page-detail.model';
import {ItemsService} from '../../../shared/services/items.service';
import {List} from './list.data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pagesList: PageDetailsModel[]
    // = this.list.list;

  constructor(private itemsService: ItemsService, private list: List) { }

  ngOnInit() {
    this.itemsService.getItems()
      .subscribe(
        (response) => {
          this.pagesList = response;
        }
      );
  }

  store() {
    this.itemsService.storeItems(this.pagesList)
      .subscribe(
        (response) => { console.log(response); }
      );
  }

  get() {
    this.itemsService.getItems()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

}
