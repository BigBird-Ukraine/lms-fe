import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {IBookUser, IRoom, ISettingRoom, ITable} from '../interfaces';
import {commonAdminPath, commonAuthPath} from '../../../../shared/api';
import {AdminAuthService} from './admin-auth.service';
import {ICutRoom} from '../../../interface';


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

  deleteSettingRoom(id: string): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.delete<void>(`${this.roomUrl}/setting/${id}`, options);
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

  updateRoom(id: string, room: Partial<IRoom>): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.put<void>(`${this.roomUrl}/${id}`, room, options);
  }

  deleteRoom(id: string): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.delete<void>(`${this.roomUrl}/${id}`, options);
  }

  getRoomsByParams(params): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(`${this.roomUrl}`, {
      params: new HttpParams({
        fromObject: params
      }),
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    });
  }

  getSingleRoom(id: string): Observable<IRoom> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<IRoom>(`${this.roomUrl}/${id}`, options);
  }

  getUsersOfTables(roomId: any, tableNumber: any): Observable<ITable[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<ITable[]>(`${this.roomUrl}/${roomId}/${tableNumber}`, options);
  }

  deleteUserOfTable(rentStart: Date, tableId: string, roomId: string): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.delete<void>(`${this.roomUrl}/${roomId}/${tableId}?rentStart=${rentStart}`, options);
  }
}
