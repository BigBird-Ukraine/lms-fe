import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {log} from 'util';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-add-question-form',
  templateUrl: './add-question-form.component.html',
  styleUrls: ['./add-question-form.component.scss']
})
export class AddQuestionFormComponent implements OnInit {
  questionForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  clickCount = 0;
  text = '';

  subjects = [
    {value: 'history', viewValue: 'History'},
    {value: 'math', viewValue: 'Math'},
    {value: 'language', viewValue: 'Language'}
  ];

  levels = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'height', viewValue: 'Height'}
  ];

  themes = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'}
  ];

  // answers = [
  //   {valid: 'false', label: ''},
  //   {valid: 'false', label: ''},
  //   {valid: 'false', label: ''},
  //   {valid: 'false', label: ''},
  // ];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.questionForm = this.fb.group({
      subject: this.fb.control(null, Validators.required),
      theme: this.fb.control(null, Validators.required),
      level: this.fb.control(null, Validators.required),
      tags: this.fb.array([], Validators.required),
      question: this.fb.control(null, Validators.required),
      answersForm: this.fb.array([])
    });
    // this.patch();
  }

  // patchValues(label, valid) {
  //   return this.fb.group({
  //     label: [label],
  //     valid: [false]
  //   });
  // }
  //
  //
  // patch() {
  //   const control = this.questionForm.get('answersForm') as FormArray;
  //   this.answers.forEach(x => {
  //     control.push(this.patchValues(x.label, x.valid));
  //   });
  // }

  newTag(tag) {
    this.text = tag.target.value;
  }

  removeAnswer(answer) {
    const control = this.questionForm.get('answersForm') as FormArray;
    const index = control.value.indexOf(ans => ans === answer);
    control.removeAt(index);
    this.clickCount--;
  }

  addAnswer() {
    if (this.clickCount < 5) {

      const control = new FormGroup({
        label: new FormControl('', Validators.required),
        valid: new FormControl(false)
      });
      (this.questionForm.get('answersForm') as FormArray).push(control);

      this.clickCount++;
    } else {
      return;
    }
  }

  addQuestion() {
    const tagArr = this.text.split(/\s*,\s*/);
    const control = new FormControl(tagArr, Validators.required);
    (this.questionForm.get('tags') as FormArray).push(control);

    const formData = this.questionForm.value;
    console.log(formData);
    this.questionForm.reset();
  }
}
