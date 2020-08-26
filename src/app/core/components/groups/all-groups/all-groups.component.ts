import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {GroupsService} from '../../../services/groups';
import {IFullGroup, IGroup} from '../../../interface';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent implements OnInit {

  groupsList: IGroup[];
  groupInfo: IGroup;
  isShowGroup = false;


  constructor(private groupsService: GroupsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.groupsService.getAllGroups().subscribe((groups: IFullGroup) => {
      this.groupsList = groups.data.groups;
    });
  }

  showGroup(id: string) {
    this.isShowGroup = !this.isShowGroup;
    this.groupInfo = this.groupsList.find((group: IGroup) => group._id = id);

    this.router.navigate([`${id}`], {relativeTo: this.activatedRoute});
  }
}
