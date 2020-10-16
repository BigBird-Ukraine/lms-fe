import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AdminAuthService} from './admin-auth.service';
import {IIp} from '../interfaces';
import {commonAdminPath} from '../../../../shared/api';

@Injectable({
  providedIn: 'root'
})
export class AdminIpService {

  constructor(private http: HttpClient, private authService: AdminAuthService) { }


  getIps(): Observable<IIp[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<IIp[]>(`${commonAdminPath}/ips`, options);
  }

  deleteIp(id: string): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.delete<void>(`${commonAdminPath}/ips?ip_id=${id}`, options);
  }

  createIp(data: IIp): Observable<void> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.post<void>(`${commonAdminPath}/ips`, data, options);
  }
}
