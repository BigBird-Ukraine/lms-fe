export interface IUserSubjectModel {
  data: {
    created_at?: string;
    email: string;
    groups_id?: [string];
    name: string;
    population_point: string;
    passed_tests?: []
    role_id: number;
    status_id: number;
    surname: string;
    phone_number?: string;
    photo_path?: string;
    __v?: number;
    _id?: string;
  };
}
