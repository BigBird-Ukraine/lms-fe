import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './core/components/home-page/home-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},

      {path: 'lessons', loadChildren: () => import('src/app/core/components/lessons/lesson.module').then(l => l.LessonModule)},
      {path: 'questions', loadChildren: () => import('src/app/core/components/questions/question.module').then(q => q.QuestionModule)},
      {path: 'test', loadChildren: () => import('src/app/core/components/tests/tests.module').then(t => t.TestsModule)},
      {path: 'user', loadChildren: () => import('src/app/core/components/user/user.module').then(u => u.UserModule)},
      {path: 'groups', loadChildren: () => import('src/app/core/components/groups/groups.module').then(g => g.GroupsModule)},
      {path: 'my-courses', loadChildren: () => import('src/app/core/components/courses/courses.module').then(c => c.CoursesModule)},
      {path: 'rooms', loadChildren: () => import('src/app/core/components/rooms/rooms.module').then(r => r.RoomsModule)}
    ]
  },
  {path: 'admin', loadChildren: () => import('src/app/core/components/admin/admin.module').then(a => a.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
