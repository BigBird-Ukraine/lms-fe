import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GroupModel} from '../../../interface';
import {config} from '../../../../shared/config';

@Injectable({
  providedIn: 'root'
})
export class AdminGroupsService {

  constructor(private httpClient: HttpClient) {
  }

  save(group): Observable<GroupModel> {
    return this.httpClient.post<GroupModel>(`${config.adminUrl}/api/groups`, group)
  }
}
