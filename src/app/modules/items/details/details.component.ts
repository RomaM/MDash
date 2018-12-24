import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  detailsForm: FormGroup;
  isEduitedMode: false;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm () {
    const title = '';
    const brand = new FormArray([]);
    const lang = new FormArray([]);
    const steps = new FormArray([]);
    const features = new FormArray([]);


    if (this.isEduitedMode) {


    }


    this.detailsForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'brand': brand,
      'lang': lang,
      'steps': steps,
      'features': features
    });
  }

  onSubmit() {
  }

}
