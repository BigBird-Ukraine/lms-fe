import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-question-form',
  templateUrl: './add-question-form.component.html',
  styleUrls: ['./add-question-form.component.scss']
})
export class AddQuestionFormComponent implements OnInit {
  questionForm: FormGroup;

  subjects = [
    {value: 'history', viewValue: 'History'},
    {value: 'math', viewValue: 'Math'},
    {value: 'language', viewValue: 'Language'}
  ];

  levels = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'hight', viewValue: 'Hight'}
  ];

  themes = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'}
  ];

  answers = [
    {valid: 'false', label: ''},
    {valid: 'false', label: ''},
    {valid: 'false', label: ''},
    {valid: 'false', label: ''},
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.questionForm = this.fb.group({
      subject: this.fb.control(null),
      theme: this.fb.control(null),
      level: this.fb.control(null),
      question: this.fb.control(null),
      answersForm: this.fb.array([])
    });
    this.patch();
  }

  patchValues(label, valid) {
    return this.fb.group({
      label: [label],
      valid: [false]
    });
  }

  patch() {
    const control = this.questionForm.get('answersForm') as FormArray;
    this.answers.forEach(x => {
      control.push(this.patchValues(x.label, x.valid));
    });
  }

  addQuestion() {
    const formData = this.questionForm.value;
    console.log(formData);
  }
}
