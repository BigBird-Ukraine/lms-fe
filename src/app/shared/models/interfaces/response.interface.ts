import { HttpErrorResponse } from '@angular/common/http';

export interface ISuccessHttpResponse {
  data: any;
}

export interface IErrorHttpResponse extends HttpErrorResponse {
  error: {
    error: {
      message: string;
      code: number;
      data: any;
    };
  };
}
