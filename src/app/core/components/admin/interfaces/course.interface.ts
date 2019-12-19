export interface ICourse {
  _id?: string;
  label: string;
  description: string;
  modulesList: string[];
}



export interface IFullCourse {
  data: {
    courses: ICourse[]
  };
  count: number;
  pageCount: number;
}
