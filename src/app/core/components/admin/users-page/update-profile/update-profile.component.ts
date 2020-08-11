import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AdminUsersService} from "../../services";
import {CustomSnackbarService} from "../../../../../shared/services";
import {IUser} from "../../interfaces";
import {regExp} from "../../../../constans";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  form: FormGroup;
  private user: IUser;
  constructor(
    private usersService: AdminUsersService,
    private dialog: MatDialog,
    private customSnackbarService: CustomSnackbarService,
    public dialogRef: MatDialogRef<UpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.user = this.data.user;
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.user.name, [Validators.minLength(2), Validators.maxLength(255), Validators.pattern(regExp.nameRegexp), Validators.required]),
      surname: new FormControl(this.user.surname, [Validators.minLength(2), Validators.maxLength(255), Validators.pattern(regExp.nameRegexp), Validators.required]),
      population_point: new FormControl(this.user.population_point, [Validators.minLength(2), Validators.maxLength(255), Validators.pattern(regExp.nameRegexp), Validators.required]),
      email: new FormControl(this.user.email, [Validators.email, Validators.required]),
      phone_number: new FormControl(this.user.phone_number, [Validators.pattern(regExp.phone)]),
    });
  }


  update() {
    this.usersService.updateProfile(this.data.user._id, this.form.value).subscribe((value) => {
      this.customSnackbarService.open('Данні оновлено');
      this.dialogRef.close(value);
    });

  }
}
