import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private DURATION = 900;
  private VERTICAL_POSITION: MatSnackBarVerticalPosition = 'top';

  constructor(readonly snackBar: MatSnackBar) {}

  public success(message: string) {
    this.snackBar.open(message, 'close', {
      duration: this.DURATION,
      verticalPosition: this.VERTICAL_POSITION,
      panelClass: 'success-snackbar',
    });
  }

  public warn(message: string) {
    this.snackBar.open(message, 'close', {
      duration: this.DURATION,
      verticalPosition: this.VERTICAL_POSITION,
      panelClass: 'warn-snackbar',
    });
  }

  public error(message: string) {
    this.snackBar.open(message, 'close', {
      duration: this.DURATION,
      verticalPosition: this.VERTICAL_POSITION,
      panelClass: 'error-snackbar',
    });
  }
}
