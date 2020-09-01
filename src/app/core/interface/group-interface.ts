import {UserModel} from './UserModel';

export interface IGroup {
  _id: string;
  label: string;
  course_id: string;
  city: string;
  started_at: string;
  finished_at: string;
  users_list: UserModel[];
  attendance: IAttendance[];
  created_at: string;
  updated_at: string;
}

export interface ISingleGroup {
  data: IGroup;
}

export interface IFullGroup {
  data: {
    groups: IGroup[];
    count: number;
  };
}

export interface IGroupStudents {
  data: {
    users_list: UserModel[];
  };
}

export interface IAttendance {
  _id?: string;
  date: string;
  present_students_id: string[];
  absent_students_id: string[];
}
