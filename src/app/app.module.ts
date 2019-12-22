import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {
  MatSnackBarContainer,
  MatSnackBarModule
} from '@angular/material/snack-bar';
import {FlexModule} from '@angular/flex-layout';

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
import {CreateGroupComponent, ModuleLayoutComponent, CourseLayoutComponent} from './shared/components/templates';
import {FilterPipe} from './shared/pipe';
import { ConfirmLayoutComponent } from './shared/components/confirm-layout/confirm-layout.component';
import {UpdateUserComponent} from './core/components/admin/users-page/update-user/update-user.component';

@NgModule({
  entryComponents: [
    CreateGroupComponent,
    CourseLayoutComponent,
    ModuleLayoutComponent,
    ConfirmLayoutComponent,
    UpdateUserComponent
  ],
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    MyQuestionsComponent,
    FooterComponent,
    HeaderComponent,
    AdminLayoutComponent,
    CreateGroupComponent,
    FilterPipe,
    CourseLayoutComponent,
    ModuleLayoutComponent,
    ConfirmLayoutComponent
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
    FlexModule
  ],
  exports: [],
  bootstrap: [AppComponent],
  providers: [
    MatSnackBarContainer,
    CustomSnackbarService
  ],
})


export class AppModule {
}
