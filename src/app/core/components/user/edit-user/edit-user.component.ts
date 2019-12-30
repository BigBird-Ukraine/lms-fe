import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDialog} from '@angular/material';

import {CustomSnackbarService} from '../../../../shared/services';
import {UserService} from '../../../services/user';
import {fileConfigs, regExp} from '../../../constans';
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
        email: this.fb.control(this.user.email, [Validators.email]),
        phone_number: this.fb.control(this.user.phone_number, [Validators.pattern(regExp.phone)]),
        photo_path: this.user.photo_path
      },
    );
  }

  fileChange(photo) {
    if (photo.target.files.length > 0) {
      const file = photo.target.files[0];

      if (!fileConfigs.PHOTO_MIMETYPES.includes(file.type)) {
        this.customSnackbarService.open('Дозволені формати: gif, jpeg, pjpeg, png, webp');
      }

      if (file.size > fileConfigs.MAX_PHOTO_SIZE) {
        this.customSnackbarService.open('Розмір фото перевищено');
      }
      this.editForm.get('photo_path').setValue(file);
    }
  }

  editUser() {
    const data = this.editForm.value;
    const id = this.data.user._id;
    this.updateUser(id, data);
  }

  updateUser(id, user) {
    this.userService.updateUser(id, user).subscribe((value) => {
        this.customSnackbarService.open('Редагування пройшло успішно', 'success');
        this.dialogRef.close(value);
      },
      () => this.customSnackbarService.open('Невдала спроба', ''));
  }
}
