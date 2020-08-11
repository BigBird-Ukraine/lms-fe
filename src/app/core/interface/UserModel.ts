import {IPassedTest} from './test.interface';

export interface UserModel {
  status_id?: number;
  role_id?: number;
  _id?: string;
  groups_id?: string[];
  name: string;
  surname: string;
  phone_number?: string;
  email: string;
  password: string;
  photo_path?: string;
  population_point: string;
  passed_tests?: IPassedTest[];
}

export interface IUser {
  data: UserModel;
}

export interface IUserEdit {
  email?: string;
  phone_number?: string;
  photo_path?: string;
  population_point?: string;
}
