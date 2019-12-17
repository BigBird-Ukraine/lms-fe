export interface ICourse {
  _id?: string;
  label: string;
  description: string;
  modulesList: string[];
}

export interface IFullCourse {
  data: ICourse[];
}
