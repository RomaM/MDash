import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DialogHostDirective} from '../../shared/directives/dialog-host.directive';
import {DialogService} from '../../shared/services/dialog.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as profileReducer from '../../modules/profile/store/profile.reducer';
import * as ProfileActions from '../../modules/profile/store/profile.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  @ViewChild(DialogHostDirective, {static: true}) dialogDirective: DialogHostDirective;
  dialogSubscription: Subscription;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    this.dialogSubscription = this.dialogService.createDialog.subscribe(
      data => {
        this.dialogService.addDialogComponent(this.dialogDirective, data.msg, data.confirmFunc);
      }
    );
  }

  ngOnDestroy() {
    if (this.dialogSubscription) {this.dialogSubscription.unsubscribe();}
  }

}
