import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {QuestionData, QuestionModel} from '../../interface';
import {config} from '../../../shared/config';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  data: any;

  constructor(private http: HttpClient) {
  }

  createQuestion(question): Observable<QuestionModel> {
    return this.http.post<QuestionModel>(`${config.apiUrl}/${config.apiVersion}/questions`, question);
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
