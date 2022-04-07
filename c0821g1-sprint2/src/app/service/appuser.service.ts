import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppUser} from '../model/user/app-user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppuserService {
  API_URL = 'http://localhost:8080/api/appuser';
  constructor(private http: HttpClient) { }

  saveAppUser(newAppUser: AppUser,
              employeeCode: string): Observable<void> {
    return this.http.post<void>(this.API_URL + '/create/' + employeeCode, newAppUser);
  }
}
