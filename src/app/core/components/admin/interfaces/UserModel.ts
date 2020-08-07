import {IUser} from './user.interface';

export interface IUserModel {
    users: IUser[];
    count: number;
}

export interface IUserEdit {
  email?: string;
  phone_number?: string;
  photo_path?: string;
  city?: string;
}
