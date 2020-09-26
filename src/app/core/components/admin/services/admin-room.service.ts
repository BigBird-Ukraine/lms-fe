import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IRoom, ISettingRoom} from '../interfaces';
import {commonAdminPath, commonAuthPath} from '../../../../shared/api';
import {AdminAuthService} from "./admin-auth.service";


@Injectable({
  providedIn: 'root'
})
export class AdminRoomService {
  roomUrl = `${commonAdminPath}/rooms`;

  constructor(private http: HttpClient, private authService: AdminAuthService) {
  }

  createSettingRoom(room: ISettingRoom): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.post<void>(`${this.roomUrl}/setting`, room, options);
  }

  getSettingsRoom(params?: any): Observable<ISettingRoom[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    if (params) {
      return this.http.get<Partial<ISettingRoom[]>>(`${this.roomUrl}/setting?select=${params}`, options);
    } else {
      return this.http.get<ISettingRoom[]>(`${this.roomUrl}/setting`, options);
    }
  }

  getSettingRoomsById(id: string) {
    return this.http.get<ISettingRoom>(`${this.roomUrl}/setting?_id=${id}`, {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    });
  }

  createRoom(room: IRoom): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.post <void>(`${this.roomUrl}`, {...room}, options);
  }

  getRooms() {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<IRoom[]>(`${this.roomUrl}`, options);
  }

  deleteRoom(id: string): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.delete<void>(`${this.roomUrl}`, options);
  }


}
