import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {commonAdminPath} from '../../../../shared/api';
import {AdminAuthService} from './admin-auth.service';
import {QuestionData, QuestionModel} from '../interfaces/questionModel';
import {ISuccessHttpResponse} from '../../../../shared/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminQuestionsService {

  constructor(private http: HttpClient,
              private authService: AdminAuthService) { }

  createQuestion(question): Observable<QuestionModel> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.post<QuestionModel>(`${commonAdminPath}/questions`, question, options);
  }

  getAllQuestion(): Observable<QuestionData> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<QuestionData>(`${commonAdminPath}/questions`, options);
  }

  getMyQuestions(): Observable<ISuccessHttpResponse> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };
// todo query params in options
    return this.http.get<ISuccessHttpResponse>(`${commonAdminPath}/questions/my`, options);
  }

  findQuestionByParams(params): Observable<QuestionData> {
    return this.http.get<QuestionData>(`${commonAdminPath}/questions`, {
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

    return this.http.delete<QuestionData>(`${commonAdminPath}/questions/${id}`, options);
  }
}
