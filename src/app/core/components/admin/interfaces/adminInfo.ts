export interface AdminInfo {
  data: {
    _id: number
  email: string;
  name: string;
  surname: string;
  role_id: number;
  status_id: number;
  photo_path?: string;
  group?: {
    label: string
  }
  };
}
