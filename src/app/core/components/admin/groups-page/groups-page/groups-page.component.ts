import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, switchMap, take} from 'rxjs/operators';

import {CreateGroupComponent} from '../create-group/create-group.component';
import {AdminGroupsService} from '../../services';
import {IGroupData, IPaginator} from '../../interfaces';


@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {
  getGroups: IGroupData;
  form: FormGroup;
  length: number;
  pageSize = 50;
  pageIndex = 0;
  subject = new Subject<any>();
  cities = [
    {name: 'Всі', value: ''},
    {name: 'Львів', value: 'Львів'},
    {name: 'Київ', value: 'Київ'}
  ];

  constructor(private dialog: MatDialog,
              private adminGroupsService: AdminGroupsService,
              private router: Router,
              private route: ActivatedRoute) {
    this.subject.pipe(
      debounceTime(500)
    ).subscribe(() => this.getFilteredGroups());
  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl(''),
      city: new FormControl(''),
    });
    this.getFilteredGroups();
  }

  create() {
    this.dialog.open(CreateGroupComponent, {
      disableClose: true
    }).afterClosed().subscribe((value) => value && this.ngOnInit());
  }

  getFilteredGroups(event?: Partial<IPaginator>) {
    if (event) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    } else {
      this.pageIndex = 0;
    }

    this.getGroups = null;

    const keys = Object.keys(this.form.value);
    keys.forEach(value => {
      if (!this.form.value[value]) {
        delete this.form.value[value];
      }
    });

    this.router.navigate(['/admin/adminPanel/groups'], {
      queryParams: {
        ...this.form.value,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      }
    });

    this.route.queryParams.pipe(
      switchMap(value => {
        return this.adminGroupsService.getAll(value);
      }),
      take(1),
    ).subscribe(value => {
      this.length = value.data.count;
      this.getGroups = value.data;
    });
  }

  reset() {
    this.ngOnInit();
  }
}
