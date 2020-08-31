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
  created_at?: string;
}

export interface IPassedData {
  _id?: string;
  questions: Partial<QuestionModel[]>;
  lesson_label: string;
  lesson_description: string;
  result: number;
  created_at: string;
}
