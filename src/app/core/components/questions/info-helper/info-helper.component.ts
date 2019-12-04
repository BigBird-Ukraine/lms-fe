import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-info-helper',
  templateUrl: './info-helper.component.html',
  styleUrls: ['./info-helper.component.scss']
})
export class InfoHelperComponent implements OnInit {

  subjectForm: FormGroup;

  groupForm: FormGroup;

  levelForm: FormGroup;

  questions = [];

  constructor() {
  }

  ngOnInit() {
    this.subjectForm = new FormGroup({subject: new FormControl(null, Validators.required)});
    this.groupForm = new FormGroup({group: new FormControl(null, Validators.required)});
    this.levelForm = new FormGroup({level: new FormControl(null, Validators.required)});
  }
}
