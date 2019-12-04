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

  data: any;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  createQuestion(question): Observable<QuestionModel> {
    return this.http.post<QuestionModel>(`${config.apiUrl}/${config.apiVersion}/questions`, question);
  }

  getMyQuestions(limit?: number, offset?: number): Observable<ISuccessHttpResponse> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };
// todo query params in options
    return this.http
      .get<ISuccessHttpResponse>(`${config.apiUrl}/${config.apiVersion}/questions/my?limit=${limit}&offset=${offset}`, options);
  }

  getAllQuestion(): Observable<QuestionData> {
    return this.http.get<QuestionData>(`${config.apiUrl}/${config.apiVersion}/questions`);
  }

  getProductById(id): Observable<QuestionData> {
    return this.http.get<QuestionData>(`${config.apiUrl}/${config.apiVersion}/questions/${id}`);
  }

  findQuestionByParams(params): Observable<QuestionData> {
    return this.http.get<QuestionData>(`${config.apiUrl}/${config.apiVersion}/questions`, {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  deleteQuestionById(id): Observable<QuestionData> {
    return this.http.delete<QuestionData>(`${config.apiUrl}/${config.apiVersion}/questions/${id}`);
  }

}
