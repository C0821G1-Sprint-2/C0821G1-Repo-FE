import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDto} from '../model/user/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  updateUser(userDTO: UserDto): Observable<any> {
    return this.httpClient.put<any>(this.API_URL + '/api/employee/changePassword', {
      currentPassword: userDTO.currentPassword,
      newPassword: userDTO.newPassword,
      confirmPassword: userDTO.confirmPassword,
      id: userDTO.id,
    });
  }
}
