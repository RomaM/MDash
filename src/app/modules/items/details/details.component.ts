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
  editedItem = -1;
  itemsLoadedSubscription: Subscription;

  pageBrands = ['RCPro', 'S2Trade', 'Glenm', 'TradeLTD', 'TradeFW'];
  pageLangs = ['ru', 'en', 'de', 'es'];
  pageSteps = ['1', '2'];

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
            Object.entries(data[this.editedItem]).map(
              ([key, value]) => {
                if (Array.isArray(value)) {

                }
              }
            );

            this.detailsForm.patchValue(data[this.editedItem]);
            // this.detailsForm.patchValue({features: {bb: true}});
          }
        }
      );
    }

    this.detailsForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'author': new FormControl('', Validators.required),
      'id': new FormControl('', Validators.required),
      'url': new FormControl('', Validators.required),
      'taskUrl': new FormControl('', Validators.required),
      'date': new FormControl('', Validators.required),
      'image': new FormControl('', Validators.required),
      'desc': new FormControl('', Validators.required),
      'brand': new FormControl('', Validators.required),
      'lang': new FormControl('', Validators.required),
      'step': new FormControl('', Validators.required),
      'features': new FormGroup({
        'bb': new FormControl(false),
        'push': new FormControl(false),
        'video': new FormControl(false),
        'slider': new FormControl(false),
        'form': new FormControl(false),
      })
    });
  }

  onSubmit() {
  }

  ngOnDestroy() {
    this.itemsLoadedSubscription.unsubscribe();
  }

}
