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
  ip_address: string;

  idPlaces?: number[];
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
  cities: string[];
}

export interface ITime {
  hour: number;
  minute: number;
  second: number;
}

export interface ITable {
  confirm_status: number;
  rent_end: Date;
  rent_start: Date;
  table_number: number;
  user_id: {
    _id: string,
    name: string,
    surname: string
  };
  _id: string;
}
