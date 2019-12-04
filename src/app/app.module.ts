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

@NgModule({
  entryComponents:[
  ],
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    MyQuestionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    QuestionModule,
    HttpClientModule,
    UserModule,
    MatSnackBarModule
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
