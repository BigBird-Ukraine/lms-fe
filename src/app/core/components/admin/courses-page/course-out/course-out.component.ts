import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {switchMap, take} from 'rxjs/operators';

import {ICourse, IModule,} from '../../interfaces';
import {AdminCoursesService} from '../../services';
import {CustomSnackbarService} from '../../../../../shared/services';
import {DeleteComponent} from '../../../../../shared/components/delete/delete.component';
import {AddModulesComponent} from '../add-modules/add-modules.component';
import {CourseUpdateComponent} from '../course-update/course-update.component';

@Component({
  selector: 'app-course-out',
  templateUrl: './course-out.component.html',
  styleUrls: ['./course-out.component.scss']
})
export class CourseOutComponent implements OnInit {
  @Input() coursesData: ICourse[];
  moduleList: IModule[] = [];

  constructor(private dialog: MatDialog,
              private adminCoursesService: AdminCoursesService,
              private customSnackbarService: CustomSnackbarService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  updateProfile(course: ICourse) {
    this.dialog.open(CourseUpdateComponent, {
      data: course
    }).afterClosed().subscribe((value) => {
      if (value) {
        this.route.queryParams.pipe(
          switchMap(value => {
            return this.adminCoursesService.findCourseByParams(value)
          }),
          take(1),
        ).subscribe(value => {
          this.coursesData = value.data.courses
        })
      }
    })
  }

  delete(course: ICourse) {
    this.dialog.open(DeleteComponent, {
      data: course.label,
      disableClose: true
    }).afterClosed().subscribe(value => {
      if (value) {
        const index: number = this.coursesData.indexOf(course);
        this.adminCoursesService.deleteCourse(course._id).subscribe(() => {
          this.customSnackbarService.open('Курс видалений');
          this.coursesData.splice(index, 1);
        });
      }
    });
  }

  addModules(course: ICourse) {
    this.moduleList = course.modules_list;
    this.dialog.open(AddModulesComponent, {
      data: this.moduleList,
      disableClose: true
    }).afterClosed().subscribe((value: IModule[]) => {

      if (value) {
        const result: IModule[] = [];
        value.forEach(value1 => result.push(value1));
        course.modules_list = result;
        this.adminCoursesService.updateModuleList(course._id, {modules_list: course.modules_list}).subscribe();
        course.updated_at = new Date().toDateString();
      }
    });
  }
}
