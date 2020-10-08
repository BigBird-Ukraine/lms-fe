export interface IUserSubjectModel {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  population_point: string;
  role_id: number;
  status_id: number;
  _id?: string;
  photo_path?: string;
  groups_id?: [string];
  booking_ban_status?: {
    status: number,
    date: Date
  };
}
