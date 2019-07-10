import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnack(msg: string, action = 'Close', configs = {duration: -1, panelClass: ['snack-bar-msg']}) {
    this.snackBar.open(msg, action, <MatSnackBarConfig>configs);
  }
}
