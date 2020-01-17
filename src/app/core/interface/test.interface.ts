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

