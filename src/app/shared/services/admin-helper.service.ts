import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {config} from '../config';

@Injectable({
  providedIn: 'root'
})
export class AdminHelperService {

  constructor(private http: HttpClient) {
  }

  getModules(): Observable<any[]> {
    return this.http.get<any[]>(`${config.apiAdminUrl}/modules`);
  }

}
