import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfilesService} from '../../../shared/services/profiles.service';
import {select, Store} from '@ngrx/store';
import {State} from '../store/info.reducer';
import {AddInfo, EditInfo, UpdateInfo} from '../store/info.actions';
import {catchError, filter} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private profileService: ProfilesService,
              private store: Store<State>) { }


  editMode = false;
  editedItem;
  detailsForm: FormGroup;

  ngOnInit() {
    this.initForm();

    if ((this.route.snapshot.url.join('')).indexOf('edit') >= 0) {
      this.editMode = true;
      const selectedId = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : null;

    this.store.pipe(
      select(state => state['infoState'].linkList),
      filter((data: any[]) => data.length > 0),
      catchError(err => of(`Info List Error: ${err}`))
  ).subscribe(list => {
    this.editedItem = list[selectedId];

    this.store.dispatch(new EditInfo({selectedID: +selectedId, editedMode: true}));

    this.detailsForm.patchValue(this.editedItem);
      });
    }
  }

  initForm() {
    this.detailsForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'link': new FormControl(''),
      'details': new FormControl(''),
      });
  }

  onSubmit() {
    if (this.detailsForm.valid) {
      if (!!this.editMode && this.editedItem['key']) {
        this.store.dispatch(new UpdateInfo(
          {key: this.editedItem['key'],
            ...this.detailsForm.getRawValue()}
        ));
      } else if (!this.editMode) {
        this.store.dispatch(new AddInfo(this.detailsForm.getRawValue()));
      } else {
        throw new Error('Update Info Error');
      }
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new EditInfo({selectedID: -1, editedMode: false}));
  }

}
