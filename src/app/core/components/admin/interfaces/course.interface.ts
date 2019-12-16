export interface ICourse {
  id?: string;
  label: string;
  description: string;
  modulesList: string[];
}

export interface IFullCourse {
  data: ICourse[];
}
