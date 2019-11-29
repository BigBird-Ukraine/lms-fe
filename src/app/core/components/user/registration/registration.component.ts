import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchPassword} from '../../../validators';
import {UserModel} from '../../../interface';
import {RegistrationService} from '../../../services/user/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  passwordRegexp = '^(?!.* )(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[@$!%*#?&]).{8,}$';

  constructor(private dialog: MatDialog,
              private fb: FormBuilder,
              private registrationService: RegistrationService
  ) {
  }

  ngOnInit() {
    this.formData();
  }

  formData() {
    this.registrationForm = this.fb.group({
        name: this.fb.control(null, [Validators.required]),
        surname: this.fb.control(null, [Validators.required]),
        email: this.fb.control(null, [Validators.required, Validators.email]),
        password: this.fb.control(null, [
          Validators.required,
          Validators.pattern(this.passwordRegexp),
          Validators.minLength(8)
        ]),
        confirmPassword: this.fb.control(null, [Validators.required])
      },
      {validators: matchPassword}
    );
  }

  newUser() {
    const data = this.registrationForm.value;
    this.createUser(data);
    console.log(data);
  }

  createUser(user: UserModel) {
    this.registrationService.createUser(user).subscribe(() => console.log('user create'));
  }
}
