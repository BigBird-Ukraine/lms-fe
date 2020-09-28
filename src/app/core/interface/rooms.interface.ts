import { UserModel} from './UserModel';

export interface IRoom {
  _id: string;
  label: string;
  description: string;
  count_all_places: number;
  free_places?: number;
  start_at: string;
  close_at: string;
  city: string;
  groups?: string[];
  booked_users?: IBookUser[];
  owner_id: string;
}

export interface IBookUser {
  id?: string;
  user_id?: string;
  table_number: number;
  rent_start: string;
  rent_end: string;
}

export interface IBookUserFull {
  _id?: string;
  user_id: Partial<UserModel>;
  table_number: number;
  rent_start: Date;
  rent_end: Date;
}

export interface IValidDate {
  start_at: string;
  close_at: string;
  status: boolean;
}

export interface IBookRoomSetting {
  tableNumber: number;
  roomId: string;
  roomCloseAt: Date;
  roomStartAt: Date;
  userInfo: Partial<UserModel>;
}

export interface ICutRoom {
  _id: string;
  label: string;
  description: string;
  start_at: string;
  close_at: string;
  city: string;
  count_all_places: number;
  countBookedPlaces: number;
  numbersPlaces: number[];
  idPlaces: number[];
}
