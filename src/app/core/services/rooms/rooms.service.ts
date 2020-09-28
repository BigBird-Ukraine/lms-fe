import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthService} from '../auth';
import {commonAuthPath} from '../../../shared/api';
import {IBookUser, IBookUserFull, ICutRoom, IRoom, ISettingRoom} from '../../interface';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  createRoom(room: IRoom): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.post <void>(`${commonAuthPath}/rooms`, {...room}, options);
  }

  getAllRooms(): Observable<IRoom[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get <IRoom[]>(`${commonAuthPath}/rooms`, options);
  }

  getSingleRoom(id: string): Observable<ICutRoom> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<ICutRoom>(`${commonAuthPath}/rooms/${id}`, options);
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

  selectSettingRoomsByParams(params: any): Observable<Partial<ISettingRoom[]>> {
    return this.http.get<Partial<ISettingRoom[]>>(`${commonAuthPath}/rooms/setting?select=${params}`, {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    });
  }

  getSettingRoomsById(id: string): Observable<ISettingRoom> {
    return this.http.get<ISettingRoom>(`${commonAuthPath}/rooms/setting?_id=${id}`, {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    });
  }

  getSettingRoomsByParams(params: any): Observable<ISettingRoom> {
    return this.http.get<ISettingRoom>(`${commonAuthPath}/rooms/setting`, {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      }),
      params,
    });
  }

  updateRoom(id: string, room: Partial<IRoom>): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.put<void>(`${commonAuthPath}/rooms/${id}`, room, options);
  }

  getBookTable(roomId: string, tableNumber: number): Observable<IBookUserFull[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<IBookUserFull[]>(`${commonAuthPath}/rooms/${roomId}/${tableNumber}`, options);
  }

  bookTable(roomId: string, value: IBookUser): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.post<any>(`${commonAuthPath}/rooms/${roomId}/${value.table_number}`, {
      rent_start: value.rent_start,
      rent_end: value.rent_end
    }, options);
  }

  deleteBookedUser(rendId: string, roomId: string): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.delete<void>(`${commonAuthPath}/rooms/${roomId}/${rendId}`, options);
  }
}
