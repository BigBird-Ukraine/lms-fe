import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';

import {CustomSnackbarService} from '../../../../shared/services';
import {UserService} from '../../../services/user';
import {regExp} from '../../../constans';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserModel} from '../../../interface';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  user: UserModel;

  constructor(private dialog: MatDialog,
              private customSnackbarService: CustomSnackbarService,
              private fb: FormBuilder,
              private userService: UserService,
              public dialogRef: MatDialogRef<EditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.user = this.data.user;
  }

  ngOnInit() {
    this.formData();
  }

  formData() {
    this.editForm = this.fb.group({
        email: this.fb.control(null, [Validators.email]),
        // phone_number: this.fb.control(null, [Validators.pattern(regExp.phone)]),
        photo_path: ''
      },
    );
  }

  fileChange(photo) {
    if (photo.target.files.length > 0) {
      const file = photo.target.files[0];

      if (file.type === 'image/gif' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/pjpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/webp') {
        if (file.size < 5 * 1024 * 1024) {
          this.editForm.get('photo_path').setValue(file);
        }
        this.customSnackbarService.open('Завантажте менше фото');
      }
      this.customSnackbarService.open('Дозволені формати: gif, jpeg, pjpeg, png, webp');
    }
  }

  editUser() {
    const data = this.editForm.value;
    const id = this.data.user._id;
    this.updateUser(id, data);
  }

  updateUser(id, user) {
    this.userService.updateUser(id, user).subscribe((value) => {
        this.customSnackbarService.open('Редагування пройшло усмішно', 'success');
        this.dialogRef.close(value);
      },
      () => this.customSnackbarService.open('Невдала спроба', ''));
  }
}
