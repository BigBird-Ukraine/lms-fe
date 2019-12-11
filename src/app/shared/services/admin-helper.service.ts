import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminHelperService {

  constructor(private http: HttpClient) {
  }

  getModules(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3002/modules');
  }

}
