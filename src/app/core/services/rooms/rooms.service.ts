import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthService} from '../auth';
import {commonAuthPath} from '../../../shared/api';
import {IRoom} from '../../interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllRooms(): Observable<IRoom[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get <IRoom[]>(`${commonAuthPath}/rooms`, options);
  }

  getSingleRoom(id: string): Observable<IRoom> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<IRoom>(`${commonAuthPath}/rooms/${id}`, options);
  }

  getMyRooms(): Observable<IRoom[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<IRoom[]>(`${commonAuthPath}/rooms/my`, options);
  }

  getRoomsByParams(params): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${commonAuthPath}/rooms`, {
      params: new HttpParams({
        fromObject: params
      }),
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    });
  }

  deleteRoom(id: string): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.delete<void>(`${commonAuthPath}/rooms/${id}`, options);
  }
}
