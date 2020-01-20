import {Component, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {debounceTime} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {IModule} from '../../interfaces';
import {AdminModuleService} from '../../services';

@Component({
  selector: 'app-add-modules',
  templateUrl: './add-modules.component.html',
  styleUrls: ['./add-modules.component.scss']
})
export class AddModulesComponent implements OnInit {
  filteredModules: IModule[] = [];
  pageSize: number = 50;
  pageIndex: number = 1;
  label: string = '';
  subject = new Subject<any>();
  form: FormGroup;

  constructor(private adminModuleService: AdminModuleService,
              private dialogRef: MatDialogRef<AddModulesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IModule[]) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      label: new FormControl('')
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
      this.label = this.form.get('label').value;
      this.adminModuleService.getAll(queryParams).subscribe(value => {
        this.filteredModules = value.data.modules;
        this.data.forEach(value1 => {
          this.filteredModules = this.filteredModules.filter(value2 => value2._id !== value1._id)
        })
      });
    });
    this.subject.next();
  }

  drop(event: CdkDragDrop<IModule[], any>) {
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
    const target = [...this[targets[1]]] as IModule[];
    const index = target.findIndex(value => value.label === itemName[0]);
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
