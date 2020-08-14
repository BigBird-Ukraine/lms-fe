import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user';
import {AuthService} from '../../../services/auth';
import {IPassedData, IPassedTestFull, QuestionModel} from '../../../interface';

@Component({
  selector: 'app-my-passed-test',
  templateUrl: './my-passed-test.component.html',
  styleUrls: ['./my-passed-test.component.scss']
})
export class MyPassedTestComponent implements OnInit {

  userPassedTest: IPassedTestFull[] = [];

  constructor(public userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.userService.getUserPassedTest(this.authService.getAccessToken())
      .subscribe((res) => {
        const array: IPassedData = res[0];

        for (let i = 0; i < array.passed_tests.length; i++) {
          const obj: IPassedTestFull = {
            result: array.passed_tests[i].result,
            lesson: array.lessons[i],
            questions: this.findQuestionById(array.passed_tests[i].questions_id, array.questions),
            created_at: array.passed_tests[i].created_at
          };

          this.userPassedTest.push(obj);
        }
      });
  }

  findQuestionById(IDs: string[], questions: QuestionModel[]) {
    const arrQuestions: QuestionModel[] = [];

    IDs.forEach(id => {
      arrQuestions.push(questions.find(q => q._id === id));
    });

    return arrQuestions;
  }

}
