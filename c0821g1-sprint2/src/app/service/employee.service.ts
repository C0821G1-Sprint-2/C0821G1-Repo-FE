import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  API_URL = 'http://localhost:8080/api/employee';

  constructor(private httpClient: HttpClient) {
  }

  findById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(this.API_URL + '/detail/' + id);
  }

  getEmployee(id: number): Observable<any> {
    return this.httpClient.get(this.API_URL + '/detail/' + id);
  }

  saveNewEmployee(newEmployee: Employee): Observable<void> {
    return this.httpClient.post<void>(this.API_URL + '/create', newEmployee);
  }

  editEmployee(employeeEdit: Employee): Observable<void> {
    return this.httpClient.patch<void>(this.API_URL + '/update/' + employeeEdit.id, employeeEdit);
  }

  findAllEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.API_URL + '/list');
  }
  findAllEmployeeByKeyword(page, keyword): Observable<any> {
    return this.httpClient.get(this.API_URL + '/-list/?page=' + page + '&keyword=' + keyword);
  }
}
