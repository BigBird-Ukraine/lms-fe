import {Tags} from '../../../interface';

export interface ILesson {
  number: string | number;
  label: string;
  description?: string;
  video_path?: string;
  tags?: Tags[];
}
