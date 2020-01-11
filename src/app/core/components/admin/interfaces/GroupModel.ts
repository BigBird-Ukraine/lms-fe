export interface GroupModel {
  _id: string;
  label: string;
  course_id: string;
  city: string;
  started_at: string;
  finished_at: string;
  users_list: string[];
  created_at: string;
  updated_at: string;
}

export interface IGroupData {
    groups: [GroupModel]
    count: number
}
