import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {QuestionData, QuestionModel} from '../../interface';
import {config} from '../../../shared/config';
import {AuthService} from '../auth/auth.service';
import {ISuccessHttpResponse} from '../../../shared/models/interfaces';


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

    return this.http.post<QuestionModel>(`${config.questionUrl}/${config.apiVersion}/questions`, question, options);
  }

  getMyQuestions(limit?: number, offset?: number): Observable<ISuccessHttpResponse> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };
// todo query params in options
    return this.http
      .get<ISuccessHttpResponse>(`${config.questionUrl}/questions/my?limit=${limit}&offset=${offset}`, options);
  }

  getAllQuestion(): Observable<QuestionData> {
    return this.http.get<QuestionData>(`${config.questionUrl}/${config.apiVersion}/questions`);
  }

  getProductById(id): Observable<QuestionData> {
    return this.http.get<QuestionData>(`${config.questionUrl}/${config.apiVersion}/questions/${id}`);
  }

  findQuestionByParams(params): Observable<QuestionData> {
    return this.http.get<QuestionData>(`${config.questionUrl}/${config.apiVersion}/questions`, {
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

    return this.http.delete<QuestionData>(`${config.questionUrl}/${config.apiVersion}/questions/${id}`, options);
  }

}
