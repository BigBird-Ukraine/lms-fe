export interface ISettingRoom {
  _id?: string;
  label: string;
  start_at: ITime;
  close_at: ITime;
  count_places: number;
  period_time_to_sign_up: number; // h
}

export interface ITime {
  hour: number;
  minute: number;
  second: number;
}
