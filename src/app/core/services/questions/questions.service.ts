import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import { QuestionData, QuestionModel} from '../../interface';
import {AuthService} from '../auth';
import {ISuccessHttpResponse, commonAuthPath} from '../../../shared';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  createQuestion(question): Observable<QuestionModel> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.post<QuestionModel>(`${commonAuthPath}/questions`, question, options);
  }

  getMyQuestions(): Observable<ISuccessHttpResponse> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };
// todo query params in options
    return this.http
      .get<ISuccessHttpResponse>(`${commonAuthPath}/questions/my`, options);
  }

  getAllQuestion(): Observable<QuestionData> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<QuestionData>(`${commonAuthPath}/questions`, options);
  }

  getProductById(id): Observable<QuestionData> {
    return this.http.get<QuestionData>(`${commonAuthPath}/questions/${id}`);
  }

  findQuestionByParams(params): Observable<QuestionData> {
    return this.http.get<QuestionData>(`${commonAuthPath}/questions`, {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      }),

      params: new HttpParams({
        fromObject: params
      })
    });
  }

  deleteQuestionById(id): Observable<QuestionData> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.delete<QuestionData>(`${commonAuthPath}/questions/${id}`, options);
  }

}
