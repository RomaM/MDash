import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  spinnerColor = 'primary';
  spinnerMode = 'Indeterminate';
  spinnerValue = 50;
  constructor() { }

  ngOnInit() {
  }

}
