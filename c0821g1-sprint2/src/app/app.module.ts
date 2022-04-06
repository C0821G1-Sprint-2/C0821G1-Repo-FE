
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {SecurityModule} from './feature/security/security.module';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {APP_BASE_HREF} from '@angular/common';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import { AppuserCreateAccountComponent } from './feature/appuser/appuser-create-account/appuser-create-account.component';
import {EquipmentModule} from './feature/equipment/equipment.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import {EmployeeModule} from './feature/employee/employee.module';
import { BodyComponent } from './shared/body/body.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    AppuserCreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EquipmentModule,
    BrowserAnimationsModule,
    MatButtonModule,

    SecurityModule,

    EmployeeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)

  ],
  // providers: [authInterceptorProviders, CookieService],
  providers: [
    authInterceptorProviders,
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
