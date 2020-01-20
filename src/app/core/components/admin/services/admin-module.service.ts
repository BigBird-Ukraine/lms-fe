import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Params} from "@angular/router";

import {IModule} from '../interfaces';
import {commonAdminPath} from '../../../../shared/api';

@Injectable({
  providedIn: 'root'
})
export class AdminModuleService {
  moduleUrl = `${commonAdminPath}/modules`;

  constructor(private http: HttpClient) {
  }

  addModule(module): Observable<IModule> {
    return this.http.post<IModule>(`${this.moduleUrl}`, module);
  }

  getAll(params: Params): Observable<any> {
    return this.http.get(`${this.moduleUrl}`, {
      params: new HttpParams({
        fromObject: params
      })
    })
  }
}
