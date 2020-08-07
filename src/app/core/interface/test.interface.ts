import {QuestionModel} from './questionModel';
import {ILesson} from './lesson.interface';

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
  created_at?: string;
}

export interface IPassedTestFull {
  questions: QuestionModel[];
  lesson: ILesson;
  result: number;
  created_at: string;
}


export interface IPassedData {
  _id?: string;
  lessons: ILesson[];
  passed_tests: IPassedTest[];
  questions: QuestionModel[];
}

