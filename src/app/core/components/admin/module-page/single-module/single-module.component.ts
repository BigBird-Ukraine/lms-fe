import {Component, OnInit} from '@angular/core';
import {AdminModuleService} from '../../services';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {IModule} from '../../interfaces';
import {EditModuleComponent} from '../edit-module/edit-module.component';
import {AddLessonComponent} from '../add-lesson/add-lesson.component';
import {ILesson} from '../../interfaces';

@Component({
  selector: 'app-single-module',
  templateUrl: './single-module.component.html',
  styleUrls: ['./single-module.component.scss']
})
export class SingleModuleComponent implements OnInit {
  module: any;

  constructor(private moduleService: AdminModuleService,
              private route: ActivatedRoute,
              private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      res => (this.module = res.singleModuleResolverService.data));
  }

  deleteModule(id: string) {
    this.moduleService.delete(id);
  }

  editModule() {
    this.dialog.open(EditModuleComponent, {
      width: '95%',
      data: this.module,
      disableClose: true
    }).afterClosed().subscribe((moduleInfo: IModule) => {
      if (moduleInfo) {
        this.moduleService.editModule(moduleInfo).subscribe(updatedModule => {
          this.module = updatedModule;
        });
      }
    });
  }

  openForm() {
    this.dialog.open(AddLessonComponent, {
      width: '50%',
      disableClose: true,
      data: this.module.lessons_list
    }).afterClosed().subscribe((lessonList: Partial<ILesson>[]) => {
      if (lessonList) {
        const result: Partial<ILesson>[] = [];
        lessonList.forEach(lesson => result.push(lesson));
        this.module.lessons_list = result;
        this.moduleService.updateLessonList(this.module._id, {lessons_list: result.map(value => value._id)}).subscribe();
      }
    });
  }
}
