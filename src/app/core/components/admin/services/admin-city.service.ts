import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {commonAdminPath} from '../../../../shared/api';
import {ICity} from '../interfaces';
import {AuthService} from '../../../services/auth';


@Injectable({
  providedIn: 'root'
})
export class AdminCityService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  saveCity(city: ICity): Observable<ICity> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.post<ICity>(`${commonAdminPath}/cities`, city, options);
  }

  getCities(): Observable<ICity[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<ICity[]>(`${commonAdminPath}/cities`, options);
  }

  deleteCity(): Observable<ICity> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.delete<ICity>(`${commonAdminPath}/cities`, options);
  }
}
