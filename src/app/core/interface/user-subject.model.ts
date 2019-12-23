export interface IUserSubjectModel {
  name: string;
  surname: string;
  role_id: number;
  status_id: number;
  _id?: string;
  photo_path?: string;
  group?: {
    label: string
  };
}
