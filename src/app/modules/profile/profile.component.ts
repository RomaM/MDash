import {Component, DoCheck, OnInit} from '@angular/core';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, DoCheck {

  constructor() { }

  ngOnInit() {

  }

  ngDoCheck () {
    // console.log('doCheck', Zone.currentTask.source, Zone.currentTask.data.__creationTrace_);
  }
}
