import {Tags} from './questionModel';

export interface ILesson {
  number: number;
  _id?: string;
  label: string;
  description: string;
  video_path: string;
  tags: Tags[];
  module_id: string;
  tests?: [string];
  questions_id?: [string];
  user_id: string;
  __v?: string;
}

export interface IFullLesson {
  data: {
    lesson: ILesson[];
    count: number;
    pageCount: number;
  };
}

export interface IEditLesson {
  data: ILesson;
}

export interface ILessonStatistics {
  label: string;
  count: [{lessons_list: number}];
  _id?: string;
}
