export interface IRoom {
  _id: string;
  label: string;
  count_all_places: number;
  free_places?: number;
  start_at: Date;
  close_at: Date;
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
