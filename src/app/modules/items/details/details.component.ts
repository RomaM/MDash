import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {from, Observable, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import * as pagesReducer from '../store/pages.reducers';
import * as PagesActions from '../store/pages.actions';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {PageDetailsModel} from '../../../shared/models/page-detail.model';
import {ItemsService} from '../../../shared/services/items.service';
import {takeWhile} from 'rxjs/internal/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  detailsForm: FormGroup;
  editedItem: any;
  itemsLoadedSubscription: Subscription;

  pageBrands = ['RCPro', 'S2Trade', 'Glenm', 'TradeLTD', 'TradeFW'];
  pageLangs = ['ru', 'en', 'de', 'es', 'it'];
  pageSteps = [1, 2];

  imageUrl = 'assets/images/noimage.png';

  key = '';

  constructor(private itemsService: ItemsService,
              private store: Store<pagesReducer.State>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.editedItem = this.route.snapshot.params.id;

    this.initForm();
  }

  initForm () {
    this.detailsForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'author': new FormControl('', Validators.required),
      'id': new FormControl({value: 0, disabled: true}, Validators.required),
      'url': new FormControl('', Validators.required),
      'taskUrl': new FormControl('', Validators.required),
      'date': new FormControl('', Validators.required),
      'image': new FormControl(this.imageUrl, Validators.required),
      'description': new FormControl(''),
      'brand': new FormControl('', Validators.required),
      'lang': new FormControl('', Validators.required),
      'steps': new FormControl('', Validators.required),
      'features': new FormGroup({
        'bb': new FormControl(false),
        'push': new FormControl(false),
        'video': new FormControl(false),
        'slider': new FormControl(false),
        'form': new FormControl(false),
      })
    });

    if (!!this.editedItem) {
      console.log('Edit Mode');
      this.store.dispatch(new PagesActions.EditedPage({ selectedID: +this.editedItem, editedMode: true }));

      this.itemsLoadedSubscription = this.itemsService.loadedData.subscribe(
        data => {
          // if (data.hasOwnProperty('list') && data.list.length > 0) {
          if (data.length > 0) {
            console.log(data);
            this.key = data[this.editedItem][0];

            this.detailsForm.patchValue(data[this.editedItem][1]);
          }
        }
      );
    }
  }

  onSubmit() {
    console.log('Submited'); // ToDo: Loader for communications with server

    if (this.detailsForm.valid) {
      console.log('Submited Success');

      if (!!this.editedItem) {
        // this.itemsService.updateItem(this.detailsForm.getRawValue(), this.key).subscribe(
        //   res => {
        //     this.itemsService.setTimestamp({request: 'edit'}).subscribe(data => console.log(data));
        //   },
        //   err => console.log(err)
        // );

        this.store.dispatch(new PagesActions.UpdatePage({key: this.key, val: this.detailsForm.getRawValue()}));
      } else {
        this.store.dispatch(new PagesActions.AddPage(this.detailsForm.getRawValue()));
      }
    }
  }

  remove() {
    this.itemsService.removeItem(this.key).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/list']);
      },
      err => console.log(err)
    );
  }

  setImage(event) {
    const imgName = event.srcElement.files[0].name;
    this.detailsForm.patchValue({image: 'assets/images/funnels/' + imgName});
  }

  ngOnDestroy() {
    if (!!this.editedItem) {
      this.itemsLoadedSubscription.unsubscribe();

      this.store.dispatch(new PagesActions.EditedPage(
        {selectedID: -1, editedMode: false}
        )
      );
    }
  }

}
