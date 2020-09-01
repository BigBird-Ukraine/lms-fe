import {QuestionModel} from './questionModel';

export interface ITest {
  data: {
    questions_id: QuestionModel[];
  };
}

export interface IPassedTest {
  questions_id: string[];
  _id: string;
  lesson_id: string;
  result: number;
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
    result: number;
  }];
}
