export interface UserModel {
  _id?: string;
  name: string;
  surname: string;
  phone_number?: string;
  email: string;
  password: string;
  photo_path?: string;
  passed_tests_id?: [string];
}
