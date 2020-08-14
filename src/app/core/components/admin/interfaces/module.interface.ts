import {Tags} from '../../../interface';
import {ILesson} from './lesson.interface';

export interface IModule {
  label: string;
  lessons_list?: string[];
  description?: string;
  _id?: string;
  tag_list?: Tags[];
}

export interface IModuleFull {
  label: string;
  description: string;
  lessons_list?: Partial<ILesson>[];
}

export interface IFullModule {
  data: IModule[];
}

export interface IModuleSubject {
  data: {
    modules: IModule[],
    count: number
  };
}

export interface IModuleStatistics {
  label: string;
  count: number;
  _id?: string;
}
