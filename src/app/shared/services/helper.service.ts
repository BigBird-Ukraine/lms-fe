import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IIp} from '../../core/interface';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient) {
  }

  getDateWithoutTimeZone(dateZ: string) {
    const dTimezone = new Date();
    const offset = dTimezone.getTimezoneOffset() / 60;
    const date = new Date(Date.parse(dateZ));
    date.setHours(date.getHours() + offset);
    return date;
  }

  public getIPAddress(): Observable<Partial<IIp>> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.get<Partial<IIp>>('https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=json', options);
  }


}
