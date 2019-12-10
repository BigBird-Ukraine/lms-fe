import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {SharedModule} from './shared/modules';
import {CustomSnackbarService} from "./shared/services/custom-snackbar.service";

import {TokenInterceptor} from "./shared/interceptor/token.interceptor";
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {QuestionModule} from './core/components/questions/question.module';
import {HomePageComponent} from './core/components/home-page/home-page.component';
import {UserModule} from './core/components/user/user.module';

import {
  MatSnackBarContainer,
  MatSnackBarModule
} from "@angular/material/snack-bar";
import { MyQuestionsComponent } from './core/components/questions/my-questions/my-questions.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import {AdminModule} from './core/components/admin/admin.module';
import {CreateGroupComponent} from './shared/components/templates/create-group/create-group.component';
import {MatCardModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CourseLayoutComponent} from './shared/components/templates/course-layout/course-layout.component';
import {MatAutocompleteModule} from '@angular/material';
import {FilterPipe} from './shared/pipe/filter.pipe';

@NgModule({
  entryComponents: [
    CreateGroupComponent,
    CourseLayoutComponent
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
    CourseLayoutComponent,
    FilterPipe
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    QuestionModule,
    HttpClientModule,
    UserModule,
    MatSnackBarModule,
    AdminModule,
    MatAutocompleteModule
    MatCardModule
  ],
  exports: [],
  bootstrap: [AppComponent],
  providers: [
    MatSnackBarContainer,
    CustomSnackbarService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   multi: true,
    //   useClass: TokenInterceptor
    // }
  ],
})


export class AppModule {
}
