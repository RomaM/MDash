import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DialogHostDirective} from '../../shared/directives/dialog-host.directive';
import {DialogService} from '../../shared/services/dialog.service';
import {Subscription} from 'rxjs/index';

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
    this.dialogSubscription.unsubscribe();
  }

}
