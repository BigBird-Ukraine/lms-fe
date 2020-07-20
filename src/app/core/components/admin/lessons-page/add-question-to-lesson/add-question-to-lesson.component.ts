import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {AdminQuestionsService} from '../../services';
import {QuestionData, QuestionModel, Tags} from '../../interfaces';
import {InfoHelperService} from '../../../../services/questions';

@Component({
  selector: 'app-add-question-to-lesson',
  templateUrl: './add-question-to-lesson.component.html',
  styleUrls: ['./add-question-to-lesson.component.scss']
})
export class AddQuestionToLessonComponent implements OnInit {

  filterQuestions: FormGroup;
  tagsForAutocomplete: Tags[] = [];
  tags: Tags[] = [];
  questions: QuestionModel[];
  existingQuestions: QuestionModel[];
  pageIndex = 1;

  constructor(private dialogRef: MatDialogRef<AddQuestionToLessonComponent>,
              private fb: FormBuilder,
              private infoService: InfoHelperService,
              private questionService: AdminQuestionsService,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit() {
    this.filterForm();
    this.getTags();
    this.getQuestions();
  }

  filterForm() {
    this.filterQuestions = this.fb.group({
      tags: this.fb.array([])
    });
  }

  getTags() {
    this.infoService.getTags().subscribe((tags: Tags[]) => this.tagsForAutocomplete = tags);
  }

  newTag(tag) {
    const text = tag.target.value;

    if (text.length) {
      this.tags.push(text);
    }
    tag.target.value = '';
  }

  delTag(tag) {
    const index = this.tags.findIndex(delTag => delTag === tag);

    this.tags.splice(index, 1);
  }

  getQuestions() {
    this.questionService.getAllQuestion().subscribe((questionList: QuestionData) => {
      this.existingQuestions = questionList.data.questions.filter((question: QuestionModel) =>
        this.data.includes(question._id)
      );
      const ids = this.existingQuestions.map(question => question._id);
      this.questions = questionList.data.questions.filter((ques: QuestionModel) =>
        !ids.includes(ques._id)
      );
    });
  }

  showFiltered() {
    this.filterQuestions.value.tags = this.tags;
    const params = {
      ...this.filterQuestions.value
    };

    this.questionService.findQuestionByParams(params).subscribe((question: QuestionData) => {
      const ids = this.existingQuestions.map(questionOne => questionOne._id);
      this.questions = question.data.questions.filter((ques: QuestionModel) =>
        !ids.includes(ques._id)
      );
    });
  }

  drop(event: CdkDragDrop<QuestionModel[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dblclickMove(itemName: string, ...targets: string[]) {
    const strings = itemName.split(' ');
    const target = [...this[targets[1]]] as QuestionModel[];
    const index = target.findIndex(value => value.question === strings[0]);
    this[targets[0]] = [
      ...this[targets[1]].splice(index, 1),
      ...this[targets[0]]
    ];
  }

  scroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight + 2) {
      this.pageIndex++;
      // this.subject.next();
    }
  }
}
