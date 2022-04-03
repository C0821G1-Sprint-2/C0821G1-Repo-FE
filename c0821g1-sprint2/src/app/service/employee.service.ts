import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private API_URL = 'http://localhost:8080/api/employee';

  constructor(private httpClient: HttpClient) {
  }

  getAllEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.API_URL + '/list-select');
  }

  findByCode(code: string): Observable<Employee> {
    return this.httpClient.get<Employee>(this.API_URL + '/detail/' + code);
  }
}
