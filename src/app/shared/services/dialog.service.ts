import {ComponentFactoryResolver, Injectable, OnDestroy} from '@angular/core';
import {DialogComponent} from '../components/dialog/dialog.component';
import {Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DialogService implements OnDestroy {

  private confirmSub: Subscription;
  private declineSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  openDialog(hostContainer, title: string, msg: string, confirmFn: Function, declineFn?: Function) {
    const dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const hostViewContainer = hostContainer;
    hostViewContainer.clear();
    const dialogComponentRef = hostViewContainer.createComponent(dialogComponentFactory);
    dialogComponentRef.instance.title = title;
    dialogComponentRef.instance.message = msg;
    dialogComponentRef.instance.confirmMsg = 'Close';

    this.confirmSub = dialogComponentRef.instance.confirm.subscribe(confirmFn);
    if (declineFn) {
      dialogComponentRef.instance.confirmMsg = 'Yes';
      dialogComponentRef.instance.declineMsg = 'No';
      this.declineSub = dialogComponentRef.instance.decline.subscribe(declineFn);
    }
  }

  ngOnDestroy() {
    if (this.confirmSub) {
      this.confirmSub.unsubscribe();
    } else if (this.declineSub) {
      this.declineSub.unsubscribe();
    }
  }
}
