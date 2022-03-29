import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-employee-change-password',
  templateUrl: './employee-change-password.component.html',
  styleUrls: ['./employee-change-password.component.css']
})
export class EmployeeChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  id: number;
  // employeeEdit: Employee;

  constructor() { }

  ngOnInit(): void {
  }

}
