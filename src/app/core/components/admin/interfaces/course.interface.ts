import {IModule, IModuleFull} from './module.interface';

export interface ICourse {
  _id?: string;
  label: string;
  level?: number | string;
  description: string;
  modules_list: IModule[];
  created_at: string;
  updated_at: string;
}

export interface PatricalICourse {
  groups_id: {
    course_id: {
      label: string;
      description: string;
      modules_list: IModuleFull[];
    }
  };
}


export interface IFullCourse {
  data: {
    courses: ICourse[]
    count: number;
  };

}
