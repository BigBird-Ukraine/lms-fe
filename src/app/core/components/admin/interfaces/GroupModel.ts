import {ICourse} from "./course.interface";
import {IUser} from "./user.interface";

export interface GroupModel {
  _id: string;
  label: string;
  course_id: ICourse;
  city: string;
  started_at: string;
  finished_at: string;
  users_list: IUser[];
  created_at: string;
  updated_at: string;
}

export interface IGroupData {
    groups: [GroupModel]
    count: number
}
