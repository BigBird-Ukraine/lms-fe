import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
  MatSnackBarContainer,
  MatSnackBarModule
} from '@angular/material/snack-bar';
import {_MatMenuDirectivesModule, MatDialogModule, MatIconModule, MatMenuModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule, SharedModule} from './shared/modules';
import {AuthGuardService, CustomSnackbarService} from './shared/services';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './core/components/home-page/home-page.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {FilterPipe} from './shared/pipe';
import {ConfirmLayoutComponent} from './shared/components/confirm-layout/confirm-layout.component';
import {getUkrainianPaginatorIntl} from './shared/services/matPaginator.service';
import {DeleteComponent} from './shared/components/delete/delete.component';
import {MyGroupResolverService, MyGroupsResolverService} from './core/resolvers';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthUserComponent} from './core/components/auth/auth-user/auth-user.component';
import {RegistrationComponent} from './core/components/auth/registration/registration.component';
import {AuthModule} from './core/components/auth/auth.module';
import {AdminInterceptor} from './core/components/admin/admin.interceptor';

const mat = [
  MaterialModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  _MatMenuDirectivesModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatDialogModule
];

@NgModule({
  entryComponents: [
    ConfirmLayoutComponent,
    DeleteComponent,

    AuthUserComponent,
    RegistrationComponent
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    MainLayoutComponent,
    FilterPipe,
    ConfirmLayoutComponent,
    DeleteComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexModule,
    AuthModule,
    SharedModule,

    ...mat
  ],
  bootstrap: [AppComponent],
  providers: [
    MatSnackBarContainer,
    CustomSnackbarService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AdminInterceptor
    },
    {provide: MatPaginatorIntl, useValue: getUkrainianPaginatorIntl()},
    MyGroupsResolverService,
    MyGroupResolverService
  ],
})


export class AppModule {
}
