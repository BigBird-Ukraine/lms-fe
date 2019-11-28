import {FormGroup} from '@angular/forms';

export function matchPassword(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const password = formGroup.controls[controlName].value;
    const confirmPassword = formGroup.controls[matchingControlName].value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {passwordsMismatch: true};
    }
  };
}

{

}
