export interface ILesson {
  number: string | number;
  _id?: string;
  label: string;
  description: string;
  video_path: string;
  tags: [string];
  module_id: string;
  tests?: [string];
  user_id: string;
}

export interface IFullLesson {
  data: {
    lesson: ILesson[];
    count: number;
    pageCount: number;
  };
}
