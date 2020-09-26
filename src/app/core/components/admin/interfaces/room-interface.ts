export interface IRoom {
  _id: string;
  label: string;
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
  id: string;
  rent_start: Date;
  rent_end: Date;
}

export interface IValidDate {
  start_at: string;
  close_at: string;
  status: boolean;
}

export interface ISettingRoom {
  _id?: string;
  label: string;
  start_at: ITime;
  close_at: ITime;
  count_places: number;
  period_time_to_sign_up: number; // h
  cities: string[];
}

export interface ITime {
  hour: number;
  minute: number;
  second: number;
}
