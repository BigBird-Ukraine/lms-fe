import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDialog} from '@angular/material';

import {CustomSnackbarService} from '../../../../shared/services';
import {UserService} from '../../../services/user';
import {fileConfigs, regExp} from '../../../constans';
import {IUserEdit, UserModel} from '../../../interface';


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
        name: this.fb.control(this.user.name, [Validators.pattern(regExp.nameRegexp)]),
        surname: this.fb.control(this.user.surname, [Validators.pattern(regExp.nameRegexp)]),
        phone_number: this.fb.control(this.user.phone_number, [Validators.pattern(regExp.phone)]),
        population_point: this.fb.control(this.user.population_point, [
          Validators.required,
          Validators.pattern(regExp.nameRegexp)
        ]),
        photo_path: ''
      },
    );
  }

  fileChange(photo) {
    if (photo.target.files.length) {
      const [file] = photo.target.files;

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
    const data: IUserEdit = this.editForm.value;
    const id: string = this.data.user._id;

    const strings = Object.keys(data);
    strings.forEach(key => {
      if (!data[key]) {
        delete data[key];
      }
    });

    this.updateUser(id, data);
  }

  updateUser(id: string, user: IUserEdit) {
    this.userService.updateUser(id, user).subscribe(() => {
        this.customSnackbarService.open('Редагування пройшло успішно', 'success');
        this.dialogRef.close();
      },
      () => this.customSnackbarService.open('Невдала спроба', ''));
  }
}
