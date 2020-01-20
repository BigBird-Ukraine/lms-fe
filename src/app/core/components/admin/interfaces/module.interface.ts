import {Tags} from '../../../interface';

export interface IModule {
  label: string;
  lessons: string[];
  description?: string;
  _id?: string;
  tags?: Tags[];
}

export interface IFullModule {
  data: IModule[];

}

export interface IModuleSubject {
  data: {
    modules: IModule[],
    count: number
  }

}
