import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ISettingRoom} from '../interfaces';
import {commonAdminPath} from '../../../../shared/api';
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

  getSettingsRoom(): Observable<ISettingRoom[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<ISettingRoom[]>(`${this.roomUrl}/setting`, options);
  }
}
