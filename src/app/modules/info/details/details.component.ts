import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as PagesActions from '../../items/store/pages.actions';
import {ProfilesService} from '../../../shared/services/profiles.service';
import {Store} from '@ngrx/store';
import {State} from '../store/info.reducer';
import {AddInfo} from '../store/info.actions';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private profileService: ProfilesService,
              private store: Store<State>) { }


  editMode = false;
  selectedId = -1;
  detailsForm: FormGroup;

  ngOnInit() {
    if ((this.route.snapshot.url.join('')).indexOf('edit') >= 0) {
      this.editMode = true;
      this.selectedId = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : null;
    }

    this.initForm();
  }

  initForm() {
    this.detailsForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'link': new FormControl(''),
      'details': new FormControl(''),
      });

    // this.itemsLoadedSubscription = this.itemsService.loadedData
    //   .subscribe(
    //     data => {
    //       if (!!this.editedItem && data.length > 0) {
    //         this.store.dispatch(new PagesActions.EditedPage({ selectedID: +this.editedItem, editedMode: true }));
    //
    //         this.key = data[this.editedItem][0];
    //         this.detailsForm.patchValue(data[this.editedItem][1]);
    //
    //       } else if (data.length > 0) {
    //         this.detailsForm.patchValue({
    //           'id': data.length + 1,
    //           'author': `${this.activeUser.name} ${this.activeUser.surname}`
    //         }); // Add an ID field if a new page is creating
    //       }
    //     }
    //   );
  }

  onSubmit() {
    if (this.detailsForm.valid) {
      if (!!this.editMode) {
        // this.store.dispatch(new PagesActions.UpdatePage({key: this.key, val: this.detailsForm.getRawValue()}));
      } else {
        this.store.dispatch(new AddInfo(this.detailsForm.getRawValue()));
      }
    }
  }

}
