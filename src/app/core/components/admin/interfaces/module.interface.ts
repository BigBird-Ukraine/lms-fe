import {Tags} from '../../../interface';

export interface IModule {
  label: string;
  lessons: string[];
  description?: string;
  tags?: Tags[];
}
