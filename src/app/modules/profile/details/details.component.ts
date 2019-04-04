import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  detailsForm: FormGroup;
  editMode: boolean;
  isSAdmin: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    (this.route.snapshot.url.join('')).indexOf('edit') >= 0 ? this.editMode = true : this.editMode = false;
    this.initForm();
    this.isSAdmin = true;
  }

  initForm() {
    this.detailsForm = new FormGroup({
      name: new FormControl({value: '', disabled: !this.editMode}, Validators.required),
      surname: new FormControl({value: '', disabled: !this.editMode}, Validators.required),
      email: new FormControl({value: '', disabled: !this.editMode}, Validators.required),
      phone: new FormControl({value: '', disabled: !this.editMode}, Validators.required),
      uid: new FormControl({value: '', disabled: !this.editMode}, Validators.required),

    });
  }
}
