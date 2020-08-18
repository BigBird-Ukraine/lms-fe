import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {AdminUsersService} from '../../services';
import {IUser} from '../../interfaces';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})

export class AddUsersComponent implements OnInit {
  filteredUsers: IUser[] = [];
  pageSize = 50;
  pageIndex = 1;
  surname = '';
  subject = new Subject<any>();
  form: FormGroup;

  constructor(private adminUsersService: AdminUsersService,
              private dialogRef: MatDialogRef<AddUsersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IUser[]) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      surname: new FormControl('')
    });
    this.subject.pipe(
      debounceTime(200)
    ).subscribe(() => {
      const keys = Object.keys(this.form.value);
      keys.forEach(value => {
        if (!this.form.value[value]) {
          delete this.form.value[value];
        }
      });
      const queryParams = {
        pageSize: this.pageSize * this.pageIndex,
        ...this.form.value
      };
      this.surname = this.form.get('surname').value;
      this.adminUsersService.getAll(queryParams).subscribe(value => {
        this.filteredUsers = value.data.users;
        this.data.forEach(userInGroup => {
          this.filteredUsers = this.filteredUsers.filter(userFromAll => userFromAll._id !== userInGroup._id);
        });
      });
    });
    this.subject.next();
  }

  drop(event: CdkDragDrop<IUser[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dblclickMove(itemName: string, ...targets: string[]) {
    const strings = itemName.split(' ');
    const target = [...this[targets[1]]] as IUser[];
    const index = target.findIndex(value => value.surname === strings[0]);
    this[targets[0]] = [
      ...this[targets[1]].splice(index, 1),
      ...this[targets[0]]
    ];
  }

  scroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight + 2) {
      this.pageIndex++;
      this.subject.next();
    }
  }

}
