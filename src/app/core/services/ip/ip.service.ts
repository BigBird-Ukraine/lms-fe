import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {commonAuthPath} from '../../../shared/api';
import {IIp} from '../../interface';
import {AuthService} from '../auth';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  getIps(): Observable<IIp[]> {
    const options = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAccessToken()
      })
    };

    return this.http.get<IIp[]>(`${commonAuthPath}/ips`, options);
  }
}
