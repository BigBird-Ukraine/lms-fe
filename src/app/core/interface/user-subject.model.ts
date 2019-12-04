export interface IUserSubjectModel {
  name: string;
  surname: string;
  role_id: number;
  status_id: number;
  id?: string;
  photo_path?: string;
  group?: {
    label: string
  };
}
