import {EmployeePosition} from './employee-position';
import {AppUser} from './user/app-user';

export interface Employee {
  id: number;
  code: string;
  address: string;
  dateOfBirth: string;
  deleteFlag: boolean;
  gender: string;
  image: string;
  name: string;
  phone: string;
  employeePosition: EmployeePosition;
  appUser: AppUser;
}
