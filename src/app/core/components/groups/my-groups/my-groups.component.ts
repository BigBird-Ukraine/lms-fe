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

  myGroups: Partial<IGroup>[];

  constructor(private groupsService: GroupsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data
      .subscribe(
        res => {
          this.myGroups = res.myGroupsResolverService[0].groups;
        });
  }

  navigate(value) {
    this.router.navigate([value]);
  }
}
