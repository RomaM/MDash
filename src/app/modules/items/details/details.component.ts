import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  detailsForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm () {
    const noimage = '/assets/noimage.png';
    const title = 'asd';
    const brand = new FormArray([]);
    const lang = new FormArray([]);
    const steps = new FormArray([]);
    const features = new FormArray([]);

    this.detailsForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'brand': brand,
      'lang': lang,
      'steps': steps,
      'features': features
    });
  }

  onSubmit() {}

}
