import { Component, OnInit } from '@angular/core';
import {AdminCityService} from '../../services/admin-city.service';

import {AddCityAdminComponent} from '../add-city-admin/add-city-admin.component';
import {MatDialog} from '@angular/material';
import {ICity} from '../../interfaces';

@Component({
  selector: 'app-cities-admin',
  templateUrl: './cities-admin.component.html',
  styleUrls: ['./cities-admin.component.scss']
})
export class CitiesAdminComponent implements OnInit {
  cities: ICity[] = [];

  constructor(private adminCityService: AdminCityService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.adminCityService.getCities().subscribe(cities => this.cities = cities);
  }

  create() {
    this.dialog.open(AddCityAdminComponent, {
      disableClose: true
    }).afterClosed().subscribe(() => this.ngOnInit());
  }

  deleteCity(id: string) {
    this.adminCityService.deleteCity(id).subscribe(() => this.ngOnInit());
  }
}
