import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EquipmentModule} from './feature/equipment/equipment.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
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
    SidebarComponent,
    BodyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EquipmentModule,
    BrowserAnimationsModule,
    MatButtonModule,
    EmployeeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  // providers: [authInterceptorProviders, CookieService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
