import {IPassedTest} from './test.interface';

export interface UserModel {
  _id?: string;
  name: string;
  surname: string;
  phone_number?: string;
  email: string;
  password: string;
  photo_path?: string;
  passed_tests?: IPassedTest[];
}

export interface IUser {
  data: UserModel;
}

export interface IUserEdit {
  email?: string;
  phone_number?: string;
  photo_path?: string;
}
