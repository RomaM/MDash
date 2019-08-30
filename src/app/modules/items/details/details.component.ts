import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {from, Observable, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import * as pagesReducer from '../store/pages.reducer';
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
  editedItem: number;
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
    this.editedItem = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : 0;
    this.initForm();
  }

  initForm () {
    this.detailsForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'author': new FormControl('', Validators.required),
      'id': new FormControl({value: this.editedItem, disabled: true}, Validators.required),
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

    this.itemsLoadedSubscription = this.itemsService.loadedData.subscribe(
      data => {
        if (!!this.editedItem && data.length > 0) {
          this.store.dispatch(new PagesActions.EditedPage({ selectedID: +this.editedItem, editedMode: true }));

          console.log(data[this.editedItem][0]);

          this.key = data[this.editedItem][0];

          this.detailsForm.patchValue(data[this.editedItem][1]);
        } else if (data.length > 0) {
          this.detailsForm.patchValue({id: data.length + 1});
        }
      }
    );
  }

  onSubmit() {
    if (this.detailsForm.valid) {

      if (!!this.editedItem) {
        this.store.dispatch(new PagesActions.UpdatePage({key: this.key, val: this.detailsForm.getRawValue()}));
      } else {
        this.store.dispatch(new PagesActions.AddPage(this.detailsForm.getRawValue()));
      }
    }
  }

  remove() {
    this.store.dispatch(new PagesActions.DeletePage(this.key));
    // this.itemsService.removeItem(this.key).subscribe(
    //   res => {
    //     // console.log(res);
    //     this.router.navigate(['/list']);
    //   },
    //   err => console.log(err)
    // );
  }

  setImage(event) {
    const imgName = event.srcElement.files[0].name;
    this.detailsForm.patchValue({image: 'assets/images/funnels/' + imgName});
  }

  ngOnDestroy() {
    this.itemsLoadedSubscription.unsubscribe();

    this.store.dispatch(new PagesActions.EditedPage(
      {selectedID: -1, editedMode: false}
      )
    );

    if (!!this.editedItem) {

    }
  }

}
