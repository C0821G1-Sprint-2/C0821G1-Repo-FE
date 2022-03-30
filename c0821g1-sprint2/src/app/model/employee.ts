import {EmployeePosition} from './employee-position';
export interface Employee {
  id?: number;
  code?: string;
  name?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  phone?: string;
  image?: string;
  deleteFlag?: string;
  employeePosition?: EmployeePosition;
}
