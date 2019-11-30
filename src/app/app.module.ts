import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {SharedModule} from './shared/modules';

import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {QuestionModule} from './core/components/questions/question.module';
import {HomePageComponent} from './core/components/home-page/home-page.component';
import {UserModule} from './core/components/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    QuestionModule,
    HttpClientModule,
    UserModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
