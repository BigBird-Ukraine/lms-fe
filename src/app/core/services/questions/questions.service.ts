import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {QuestionData, QuestionModel} from '../../interface';
import {AuthService} from '../auth';
import {ISuccessHttpResponse, commonQuestionPath} from '../../../shared';


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

    return this.http.post<QuestionModel>(`${commonQuestionPath}/questions`, question, options);
  }

  getMyQuestions(limit?: number, offset?: number): Observable<ISuccessHttpResponse> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };
// todo query params in options
    return this.http
      .get<ISuccessHttpResponse>(`${commonQuestionPath}/questions/my?limit=${limit}&offset=${offset}`, options);
  }

  getAllQuestion(): Observable<QuestionData> {
    return this.http.get<QuestionData>(`${commonQuestionPath}/questions`);
  }

  getProductById(id): Observable<QuestionData> {
    return this.http.get<QuestionData>(`${commonQuestionPath}/questions/${id}`);
  }

  findQuestionByParams(params): Observable<QuestionData> {
    return this.http.get<QuestionData>(`${commonQuestionPath}/questions`, {
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

    return this.http.delete<QuestionData>(`${commonQuestionPath}/questions/${id}`, options);
  }

}
