import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {QuestionModel} from '../../interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) {}

  createQuestion(question): Observable<QuestionModel> {
    return this.http.post<QuestionModel>('http://localhost:3000/api/questions', question);
  }

  getAllQuestion(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>('http://localhost:3000/api/questions');
  }

  getProductById(id): Observable<QuestionModel> {
    return this.http.get<QuestionModel>(`http://localhost:3000/api/questions/${id}`);
  }

  findQuestionByParams(params): Observable<QuestionModel> {
    return this.http.get<QuestionModel>('http://localhost:3000/api/questions/find', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  deleteQuestionById(id): Observable<QuestionModel> {
    return this.http.delete<QuestionModel>(`http://localhost:3000/api/questions/${id}`);
  }
}
