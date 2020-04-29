import {Injectable, OnInit} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import {BehaviorSubject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService implements OnInit {

  constructor(private snackBar: MatSnackBar) {}
  snackBarRef: MatSnackBarRef<any>;
  snackBarOpened = new BehaviorSubject<boolean>(false);

  ngOnInit() {}

  openSnack(msg: string, action = 'Close', configs = {duration: -1, panelClass: ['snack-bar-msg']}) {
    this.snackBarRef = this.snackBar.open(msg, action, <MatSnackBarConfig>configs);

    this.snackBarRef.afterOpened().subscribe(() => this.snackBarOpened.next(true));
    this.snackBarRef.afterDismissed().subscribe(() => this.snackBarOpened.next(false));
  }

  closeSnack() {
    if (this.snackBarOpened.value) {
      this.snackBarRef.dismiss();
    }
  }
}
