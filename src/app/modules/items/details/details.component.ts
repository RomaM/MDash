import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
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
  // detailsFormData = new PageDetailsModel( null, '', '', '', '', '', '', null, [], '', '', '');
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
            console.log(data[this.editedItem]);
            console.log(this.detailsForm.value);

            for (const [name, value] of this.detailsForm.value) {
              console.log(value);
              console.log('aaa');
            }
          }
        }
      );
    }

    this.pageFeatures.map( i => {
      this.featuresControls.push(new FormControl(i));
    });

    this.detailsForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'author': new FormControl('', Validators.required),
      'id': new FormControl('', Validators.required),
      'url': new FormControl('', Validators.required),
      'taskUrl': new FormControl('', Validators.required),
      'date': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required),
      'desc': new FormControl('', Validators.required),
      'brand': new FormControl(''),
      'lang': new FormControl(''),
      'step': new FormControl(''),
      'features': new FormArray([])
    });
  }

  onSubmit() {
  }

  ngOnDestroy() {
    this.itemsLoadedSubscription.unsubscribe();
  }

}
