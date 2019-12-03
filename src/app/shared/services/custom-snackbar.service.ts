import {Injectable, NgZone} from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Injectable()
export class CustomSnackbarService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone) { }

  public open(message, action = 'success', duration = 4000) {
    this.zone.run(() => {
      let config = new MatSnackBarConfig();
      config.verticalPosition = this.verticalPosition;
      config.horizontalPosition = this.horizontalPosition;
      config.duration = duration;
      this.snackBar.open(message, action, config);
    })
  }
}
