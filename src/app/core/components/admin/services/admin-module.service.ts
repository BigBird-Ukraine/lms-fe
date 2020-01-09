import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {IModule} from '../interfaces';
import {config} from '../../../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class AdminModuleService {

  constructor(private http: HttpClient) {
  }

  addModule(module): Observable<IModule> {
    return this.http.post<IModule>(`${config.apiAdminUrl}/modules`, module);
  }

}
