import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getDateWithoutTimeZone(dateZ: string) {
    const dTimezone = new Date();
    const offset = dTimezone.getTimezoneOffset() / 60;
    const date = new Date(Date.parse(dateZ));
    date.setHours(date.getHours() + offset);
    return date;
  }

}
