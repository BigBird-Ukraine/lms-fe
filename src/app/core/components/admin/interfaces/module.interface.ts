import {Tags} from '../../../interface';

export interface IModule {
  label: string;
  lessons_list?: string[];
  description?: string;
  _id?: string;
  tag_list?: Tags[];
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
