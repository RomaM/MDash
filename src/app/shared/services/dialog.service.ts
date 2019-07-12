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

  addDialogComponent(hostContainer, msg: string, confirmFn, declineFn?) {
    const dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const hostViewContainer = hostContainer.viewContainerRef;
    hostViewContainer.clear();
    const dialogComponentRef = hostViewContainer.createComponent(dialogComponentFactory);
    dialogComponentRef.instance.message = msg;
    dialogComponentRef.instance.confirmMsg = 'Yes';
    dialogComponentRef.instance.declineMsg = 'No';

    this.confirmSub = dialogComponentRef.instance.confirm.subscribe(() => {
      confirmFn();
      hostViewContainer.clear();
    });
    if (declineFn) {
      this.declineSub = dialogComponentRef.instance.decline.subscribe(() => {
        declineFn();
        hostViewContainer.clear();
      });
    } else {
      this.declineSub = dialogComponentRef.instance.decline.subscribe(() => {
        hostViewContainer.clear();
      });
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
