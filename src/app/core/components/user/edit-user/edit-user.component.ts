import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {CustomSnackbarService} from '../../../../shared/services';
import {UserService} from '../../../services/user';
import {regExp} from '../../../constans';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;

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
        email: this.fb.control(null, [Validators.email]),
        phone_number: this.fb.control(null, [Validators.pattern(regExp.phone)]),
        photo_path: ''
      },
    );
  }

  fileChange(photo) {
    if (photo.target.files.length > 0) {
      const file = photo.target.files[0];
      this.editForm.get('photo_path').setValue(file);
    }
  }

  editUser() {
    const data = this.editForm.value;
    this.updateUser(data);
  }

  updateUser(user) {
    this.userService.updateUser(user).subscribe(() => {
        this.customSnackbarService.open('Редагування пройшло усмішно', 'success');
        this.dialog.closeAll();
      },
      () => this.customSnackbarService.open('Невдала спроба', ''));
  }
}
