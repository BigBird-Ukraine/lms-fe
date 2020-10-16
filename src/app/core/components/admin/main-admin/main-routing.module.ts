import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainAdminComponent} from './main-admin/main-admin.component';
import {AuthAdminGuard} from '../authAdmin.guard';


const routes: Routes = [
  {
    path: '', canActivate: [AuthAdminGuard], canActivateChild: [AuthAdminGuard], component: MainAdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/core/components/admin/statistics-page/statistics.module').then(s => s.StatisticsModule)
      },
      {
        path: 'groups',
        loadChildren: () => import('src/app/core/components/admin/groups-page/groups.module').then(g => g.GroupsModule)
      },
      {
        path: 'questions',
        loadChildren: () => import('src/app/core/components/admin/questions-page/questions.module').then(q => q.QuestionsModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('src/app/core/components/admin/courses-page/courses.module').then(c => c.CoursesModule)
      },
      {
        path: 'modules',
        loadChildren: () => import('src/app/core/components/admin/module-page/module.module').then(m => m.ModuleModule)
      },
      {
        path: 'lessons',
        loadChildren: () => import('src/app/core/components/admin/lessons-page/lesson.module').then(l => l.LessonModule)
      },
      {
        path: 'users',
        loadChildren: () => import('src/app/core/components/admin/users-page/users.module').then(u => u.UsersModule)
      },
      {
        path: 'rooms',
        loadChildren: () => import('src/app/core/components/admin/rooms-page/room.module').then(r => r.RoomModule)
      },
      {
        path: 'cities',
        loadChildren: () => import('src/app/core/components/admin/cities-admin/cities.module').then(c => c.CitiesModule)
      },
      {
        path: 'apis',
        loadChildren: () => import('src/app/core/components/admin/api-address/api-address.module').then(a => a.ApiAddressModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
