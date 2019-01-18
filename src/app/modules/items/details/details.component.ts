import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs/index';
import * as pagesReducer from '../store/pages.reducers';
import * as PagesActions from '../store/pages.actions';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {PageDetailsModel} from '../../../shared/models/page-detail.model';
import {ItemsService} from '../../../shared/services/items.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  detailsForm: FormGroup;
  detailsFormData = new PageDetailsModel( null, '', '', '', '', '', '', null, [], '', '', '');
  editedItem = -1;
  itemsLoadedSubscription: Subscription;

  pageBrands = ['RCPro', 'S2Trade', 'Glenm', 'TradeLTD', 'TradeFW'];
  pageLangs = ['ru', 'en', 'de', 'es'];
  pageSteps = ['1', '2'];
  pageFeatures = ['bb', 'push', 'video', 'slider', 'forms'];

  featuresControls = [];

  constructor(private itemsService: ItemsService,
              private store: Store<pagesReducer.State>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.store.pipe(
    //   select('pagesState', 'edited'),
    //   tap((edited) => {
    //     this.isEditedMode = edited;
    //   })
    // );

    this.editedItem = +this.route.snapshot.params.id;

    this.initForm();
  }

  initForm () {
    if (this.editedItem >= 0) {
      this.store.dispatch(new PagesActions.EditedPagesAction({edited: true, selected: this.editedItem}));

      this.itemsLoadedSubscription = this.itemsService.loadedData.subscribe(
        data => {
          if (data.length > 0) {
            this.detailsFormData = data[this.editedItem];
          }
        }
      );
    }

    this.pageFeatures.map( i => {
      this.featuresControls.push(new FormControl(i));
    });

    this.detailsForm = new FormGroup({
      'title': new FormControl(this.detailsFormData.title, Validators.required),
      'author': new FormControl(this.detailsFormData.author, Validators.required),
      'id': new FormControl(this.detailsFormData.id, Validators.required),
      'url': new FormControl(this.detailsFormData.url, Validators.required),
      'taskUrl': new FormControl(this.detailsFormData.taskUrl, Validators.required),
      'date': new FormControl(this.detailsFormData.date, Validators.required),
      'image': new FormControl(this.detailsFormData.image, Validators.required),
      'desc': new FormControl(this.detailsFormData.description, Validators.required),
      'brand': new FormControl(this.detailsFormData.brand),
      'lang': new FormControl(this.detailsFormData.lang),
      'step': new FormControl(this.detailsFormData.steps),
      'features': new FormArray(this.featuresControls)
    });
  }

  onSubmit() {
  }

  ngOnDestroy() {
    this.itemsLoadedSubscription.unsubscribe();
  }

}
