import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  API_URL = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) {
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.API_URL + '/detail/' + id);
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(this.API_URL + '/detail/' + id);
  }

  saveNewEmployee(newEmployee: Employee): Observable<void> {
    return this.http.post<void>(this.API_URL + '/create', newEmployee);
  }

  editEmployee(employeeEdit: Employee): Observable<void> {
    return this.http.patch<void>(this.API_URL + '/update/' + employeeEdit.id, employeeEdit);
  }

  findAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API_URL + '/list');
  }
}
