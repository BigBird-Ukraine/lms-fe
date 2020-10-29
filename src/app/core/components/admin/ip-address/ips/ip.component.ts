import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {IIp} from '../../interfaces';
import {CreateIpComponent} from '../create-ip/create-ip.component';
import {AdminIpService} from '../../services';

@Component({
  selector: 'app-ips',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.scss']
})
export class IpComponent implements OnInit {

  ips: IIp[] = [];

  constructor(private adminIpService: AdminIpService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.adminIpService.getIps().subscribe(res => this.ips = res);
  }

  deleteIp(id: string) {
    this.adminIpService.deleteIp(id).subscribe(() => this.ngOnInit());
  }

  create() {
    this.dialog.open(CreateIpComponent, {
      width: '80%',
      disableClose: true
    }).afterClosed().subscribe(() => this.ngOnInit());
  }
}
