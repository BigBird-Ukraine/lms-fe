import {Component, OnInit} from '@angular/core';
import {GroupsService} from '../../../services/groups';
import {ActivatedRoute, Router} from '@angular/router';
import {IGroup} from '../../../interface';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {

  groupsList: Partial<IGroup>[];
  isShowGroup = false;
  btnStatus = false;

  constructor(private groupsService: GroupsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        res => {
          this.groupsList = res.myGroupsResolverService.groups_id;
        });
  }

  openAttendance(value) {
    this.router.navigate([value]);
    this.btnStatus = !this.btnStatus;
  }
}
