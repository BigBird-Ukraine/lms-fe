import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  constructor() {
  }

  ngOnInit() {
    this.questionForm = new FormGroup({
      subject: new FormControl(this.subjects[0].value, [
        Validators.required
      ]),
      theme: new FormControl(null, [
        Validators.required
      ]),
      level: new FormControl(null, [
        Validators.required
      ]),
      question: new FormControl(null, [
        Validators.required
      ])
    });
  }

  addQuestion() {
    const formData = this.questionForm.value;
    console.log(formData);
  }
}
