import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Params, Router} from '@angular/router';

import {IFullModule, IModule, IModuleStatistics} from '../interfaces';
import {commonAdminPath} from '../../../../shared/api';


@Injectable({
  providedIn: 'root'
})
export class AdminModuleService {
  public modules: IModule[];

  moduleUrl = `${commonAdminPath}/modules`;

  constructor(private http: HttpClient, private route: Router) {
  }

  addModule(module): Observable<IModule> {
    return this.http.post<IModule>(`${this.moduleUrl}`, module);
  }

  getAll(params: Params): Observable<any> {
    return this.http.get(`${this.moduleUrl}`, {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  getAllCropped() {
    return this.http.get<IFullModule>(`${this.moduleUrl}` + '/all-cropped');
  }

  getOneFullModule(id: string): Observable<IFullModule> {
    return this.http.get<IFullModule>(`${this.moduleUrl}/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.moduleUrl}/${id}`).subscribe(res => {
      alert('Success');
      this.navigate('/admin/adminPanel/modules');
    });
  }

  getModulesStatics(): Observable<IModuleStatistics[]> {
    return this.http.get<IModuleStatistics[]>(`${this.moduleUrl}/statics`);
  }


  getModulesByCourse(id: string): Observable<IModule[]> {
    return this.http.get<Partial<IModule[]>>(`${this.moduleUrl}/by_course?course_id=${id}`);
  }

  updateLessonList(id: string, list: { lessons_list: string[] }): Observable<any> {
    return this.http.patch(`${this.moduleUrl}/${id}/lesson`, list);
  }

  editModule(moduleInfo: IModule) {
    return this.http.patch<IModule>(`${this.moduleUrl}/${moduleInfo._id}`, moduleInfo);
  }

  navigate(value: string) {
    this.route.navigate([value]);
  }
}
