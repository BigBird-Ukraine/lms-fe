import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {CustomSnackbarService} from '../../../../shared/services';
import {UserService} from '../../../services/user';
import {regExp} from '../../../constans';
import {matchPassword} from '../../../../shared/validators';
import {UserModel} from '../../../interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  hide = true;
  hide2 = true;

  constructor(private dialog: MatDialog,
              private customSnackbarService: CustomSnackbarService,
              private fb: FormBuilder,
              private userService: UserService
  ) {
  }

  ngOnInit() {
    this.formData();
  }

  formData() {
    this.editForm = this.fb.group({
        name: this.fb.control(null, [Validators.pattern(regExp.nameRegexp)
        ]),
        surname: this.fb.control(null, [Validators.pattern(regExp.nameRegexp)
        ]),
        email: this.fb.control(null, [Validators.email
        ]),
        password: this.fb.control(null, [
          Validators.pattern(regExp.passwordRegexp),
          Validators.minLength(8)
        ]),
        confirmPassword: this.fb.control(null)
      },
      {validators: matchPassword}
    );
  }

  editUser() {
    const data: UserModel = {
      name: this.editForm.value.name,
      surname: this.editForm.value.surname,
      email: this.editForm.value.email,
      password: this.editForm.value.password
    };
    this.updateUser(data);
  }

  updateUser(user: UserModel) {
    this.userService.updateUser(user).subscribe(() => {
        this.customSnackbarService.open('Редагування пройшло усмішно', 'success');
        this.dialog.closeAll();
      },
      () => this.customSnackbarService.open('Не вдала спроба', ''));
  }
}
