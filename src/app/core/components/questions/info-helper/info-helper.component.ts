import {Component, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {InfoHelperService} from '../../../services/questions/infohelper.service';
import {Subject} from '../../../interface';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-info-helper',
  templateUrl: './info-helper.component.html',
  styleUrls: ['./info-helper.component.scss']
})
export class InfoHelperComponent implements OnInit {

  subjectForm: FormGroup;
  subjects = [];

  groupForm: FormGroup;
  groups = [];

  levelForm: FormGroup;
  levels = [];

  questionForm: FormGroup;
  questions = [];

  constructor(private infoService: InfoHelperService) {
  }

  ngOnInit() {
    this.subjectForm = new FormGroup({subject: new FormControl(null, Validators.required)});
    this.groupForm = new FormGroup({group: new FormControl(null, Validators.required)});
    this.levelForm = new FormGroup({level: new FormControl(null, Validators.required)});

  }

  createSubject() {
    const subject = this.subjectForm.value;
    this.subjects.push(subject);
    console.log(this.subjects);
    this.subjectForm.reset();
  }

  createGroup() {
    const group = this.groupForm.value;
    this.groups.push(group);
    console.log(this.groups);
    this.groupForm.reset();
  }

  createLevel() {
    const level = this.levelForm.value;
    this.levels.push(level);
    console.log(this.levels);
    this.levelForm.reset();
  }
}
