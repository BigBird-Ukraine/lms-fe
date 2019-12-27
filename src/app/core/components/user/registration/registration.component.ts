import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {matchPassword} from '../../../../shared/validators';
import {UserModel} from '../../../interface';
import {UserService} from '../../../services';
import {regExp} from '../../../constans';
import {CustomSnackbarService} from '../../../../shared';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
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
    this.registrationForm = this.fb.group({
        name: this.fb.control(null, [
          Validators.required,
          Validators.pattern(regExp.nameRegexp)
        ]),
        surname: this.fb.control(null, [
          Validators.required,
          Validators.pattern(regExp.nameRegexp)
        ]),
        email: this.fb.control(null, [
          Validators.required,
          Validators.email
        ]),
        phone_number: this.fb.control(null, [
          Validators.pattern(regExp.phone)
        ]),
        password: this.fb.control(null, [
          Validators.required,
          Validators.pattern(regExp.passwordRegexp),
          Validators.minLength(8)
        ]),
        confirmPassword: this.fb.control(null,
          [Validators.required]),
        photo_path: ''
      },
      {validators: matchPassword}
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
          this.registrationForm.get('photo_path').setValue(file);
        }
        this.customSnackbarService.open('Завантажте менше фото');
      }
      this.customSnackbarService.open('Дозволені формати: gif, jpeg, pjpeg, png, webp');
      }
    }

  newUser() {
    const data: UserModel = {
      name: this.registrationForm.value.name,
      surname: this.registrationForm.value.surname,
      email: this.registrationForm.value.email,
      phone_number: this.registrationForm.value.phone_number,
      password: this.registrationForm.value.password,
      photo_path: this.registrationForm.value.photo_path
    };
    this.createUser(data);
  }

  createUser(user: UserModel) {
    this.userService.createUser(user).subscribe(() => {
        this.customSnackbarService.open('Реєстрація успішна', 'success');
        this.dialog.closeAll();
      },
      () => this.customSnackbarService.open('Не вдала спроба', ''));

    console.log(this.registrationForm.value.photo_path);
  }
}


