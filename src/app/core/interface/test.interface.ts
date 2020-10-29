import {QuestionModel} from './questionModel';
import {ILesson} from './lesson.interface';

export interface ITest {
  data: {
    questions: QuestionModel[];
    maxMark: number;
  };
}

export interface IPassedTest {
  questions_id: string[];
  _id: string;
  lesson_id?: string;
  result: number;
  maxMark: number;
  created_at?: string;
}

export interface IPassedData {
  passed_tests: [{
    passed_at: Date;
    passed_lesson_id?: {
      lesson_description: string;
      lesson_label: string;
      questions: Partial<QuestionModel[]>
    },
    passed_questions_id?: [Partial<QuestionModel>]
    max_mark: number;
    result: number;
  }];
}
