import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminStatisticsService {
  displayPage = 0;

  constructor() {
  }

  setDisplayPage() {
    this.displayPage++;
  }

  reset() {
    this.displayPage = 0;
  }
}
