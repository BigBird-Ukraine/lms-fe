import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {
  MatSnackBarContainer,
  MatSnackBarModule
} from '@angular/material/snack-bar';
import {_MatMenuDirectivesModule, MatCardModule, MatMenuModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/modules';
import {CustomSnackbarService} from './shared/services';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {QuestionModule} from './core/components/questions/question.module';
import {HomePageComponent} from './core/components/home-page/home-page.component';
import {UserModule} from './core/components/user/user.module';
import {MyQuestionsComponent} from './core/components/questions/my-questions/my-questions.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {AdminModule} from './core/components/admin/admin.module';
import {ModuleLayoutComponent, CourseLayoutComponent} from './shared/components/templates';
import {FilterPipe} from './shared/pipe';
import {ChangeRoleUserComponent} from './core/components/admin/users-page/change-role-user/change-role-user.component';
import {ConfirmLayoutComponent} from './shared/components/confirm-layout/confirm-layout.component';
import {LessonsModule} from './core/components/lessons/lessons.module';
import {UpdateProfileComponent} from './core/components/admin/users-page/update-profile/update-profile.component';
import {getUkrainianPaginatorIntl} from './shared/services/matPaginator.service';
import {DeleteComponent} from './shared/components/delete/delete.component';

@NgModule({
  entryComponents: [
    CourseLayoutComponent,
    ModuleLayoutComponent,
    ConfirmLayoutComponent,
    ChangeRoleUserComponent,
    UpdateProfileComponent,
    DeleteComponent
  ],
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    MyQuestionsComponent,
    FooterComponent,
    HeaderComponent,
    AdminLayoutComponent,
    FilterPipe,
    CourseLayoutComponent,
    ModuleLayoutComponent,
    ConfirmLayoutComponent,
    DeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    QuestionModule,
    HttpClientModule,
    UserModule,
    AdminModule,
    MatSnackBarModule,
    AdminModule,
    FlexModule,
    MatAutocompleteModule,
    MatCardModule,
    LessonsModule,
    MatProgressSpinnerModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
  ],
  exports: [],
  bootstrap: [AppComponent],
  providers: [
    MatSnackBarContainer,
    CustomSnackbarService,
    {provide: MatPaginatorIntl, useValue: getUkrainianPaginatorIntl()}
  ],
})


export class AppModule {
}
