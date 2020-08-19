import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CustomSnackbarService} from '../../../../../shared/services';
import {fileConfigs, regExp} from '../../../../constans';
import {matchPassword} from '../../../../../shared/validators';
import {AdminUsersService} from '../../services';
import {IUser} from '../../interfaces';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  registrationForm: FormGroup;
  hide = true;
  hide2 = true;

  constructor(private dialog: MatDialog,
              private dialogRef: MatDialogRef<CreateUserComponent>,
              private customSnackbarService: CustomSnackbarService,
              private fb: FormBuilder,
              private userService: AdminUsersService
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
        population_point: this.fb.control(null, [
          Validators.required,
          Validators.pattern(regExp.nameRegexp)
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

      if (!fileConfigs.PHOTO_MIMETYPES.includes(file.type)) {
        this.customSnackbarService.open('Дозволені формати: gif, jpeg, pjpeg, png, webp');
      }

      if (file.size > fileConfigs.MAX_PHOTO_SIZE) {
        this.customSnackbarService.open('Розмір фото перевищено');
      }
      this.registrationForm.get('photo_path').setValue(file);
    }
  }

  newUser() {
    const data: IUser = {
      name: this.registrationForm.value.name,
      surname: this.registrationForm.value.surname,
      email: this.registrationForm.value.email,
      population_point: this.registrationForm.value.population_point,
      phone_number: this.registrationForm.value.phone_number,
      password: this.registrationForm.value.password,
      photo_path: this.registrationForm.value.photo_path
    };
    this.createUser(data);
  }

  createUser(user: IUser) {
    this.userService.createUser(user).subscribe(() => {
        this.registrationForm.reset();
        this.customSnackbarService.open('Реєстрація успішна', 'success');
        this.dialogRef.close(user);
      },
      () => this.customSnackbarService.open('Не вдала спроба', ''));
  }

}
