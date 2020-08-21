import {Component, OnInit} from '@angular/core';
import {AdminStatisticsService} from '../../services';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit {

  constructor(private adminStatisticsService: AdminStatisticsService) {
  }

  ngOnInit() {
  }


}
