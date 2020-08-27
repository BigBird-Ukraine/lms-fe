import {UserModel} from './UserModel';

export interface ICommentPaginator {
  data: {
    comments: [{
      _id: string;
      text: string;
      user_id: Partial<UserModel>
    }],
    count: number;
  };
}

export interface IComment {
  text: string;
}

export interface ICommentFull {
  _id: string;
  text: string;
  user_id: Partial<UserModel>;
}
