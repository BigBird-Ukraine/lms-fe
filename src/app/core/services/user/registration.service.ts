import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../../interface';
import {config} from '../../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  createUser(user): Observable<UserModel> {
    return this.http.post<UserModel>(`${config.apiUrl}/${config.apiVersion}/users`, user);
  }
}
