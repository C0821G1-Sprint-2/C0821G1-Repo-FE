import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Employee} from '../../../model/employee';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../../service/employee.service';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-employee-change-password',
  templateUrl: './employee-change-password.component.html',
  styleUrls: ['./employee-change-password.component.css']
})
export class EmployeeChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  id: number;
  employeeEdit: Employee;

  constructor(private userService: UserService,
              private router: Router,
              private employeeService: EmployeeService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
