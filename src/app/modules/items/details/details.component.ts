import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {from, Observable, Subscription} from 'rxjs';
import * as pagesReducer from '../store/pages.reducers';
import * as PagesActions from '../store/pages.actions';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {PageDetailsModel} from '../../../shared/models/page-detail.model';
import {ItemsService} from '../../../shared/services/items.service';

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
    // this.store.pipe(
    //   select('pagesState', 'edited'),
    //   tap((edited) => {
    //     this.isEditedMode = edited;
    //   })
    // );

    this.editedItem = this.route.snapshot.params.id;

    this.initForm();

    // this.itemsService.getTimestamp().subscribe(data => console.log(data));
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
      this.itemsLoadedSubscription = this.itemsService.loadedData.subscribe(
        data => {
          if (data.hasOwnProperty('list')) {
            this.key = data.list[this.editedItem][0];

            this.store.dispatch(new PagesActions.EditedPageAction(
              {selected: data.list[this.editedItem], edited: true})
            );

            this.detailsForm.patchValue(data.list[this.editedItem][1]);
          }
        }
      );
    }
  }

  onSubmit() {
    console.log('Submited'); // ToDo: Loader for communications with server

    if (this.detailsForm.valid) {

      this.store.dispatch();

      if (!!this.editedItem) {
        this.itemsService.updateItem(this.detailsForm.getRawValue(), this.key).subscribe(
          res => {
            this.itemsService.setTimestamp({request: 'edit'}).subscribe(data => console.log(data));
          },
          err => console.log(err)
        );
      } else {
        this.itemsService.addItem(this.detailsForm.getRawValue()).subscribe(
          res => {
            this.itemsService.setTimestamp({request: 'add'}).subscribe(data => console.log(data));
          },
          err => console.log(err)
        );
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

      this.store.dispatch(new PagesActions.EditedPageAction(
        {selected: '', edited: false}
        )
      );
    }
  }

}
