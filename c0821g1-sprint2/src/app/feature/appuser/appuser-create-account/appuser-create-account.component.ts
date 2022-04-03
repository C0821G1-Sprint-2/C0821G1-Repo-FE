import {Component, OnInit} from '@angular/core';
import {Employee} from '../../../model/employee';
import {EmployeeService} from '../../../service/employee.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppuserService} from '../../../service/appuser.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-appuser-create-account',
  templateUrl: './appuser-create-account.component.html',
  styleUrls: ['./appuser-create-account.component.css']
})
export class AppuserCreateAccountComponent implements OnInit {
  accountForm: FormGroup;
  employeeList: Employee[];
  id: string;
  code: string;
  validateCode: string;

  constructor(private employeeService: EmployeeService,
              private appuserService: AppuserService,
              private router: Router) {
    this.accountForm = new FormGroup({

      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.employeeService.getAllEmployee().subscribe(value => {
      this.employeeList = value;
      console.log(value);
    });
  }

  ngOnInit(): void {
  }


  name() {

  }

  saveAppUser() {
    const newAppUser = Object.assign({}, this.accountForm.value);
    this.appuserService.saveAppUser(newAppUser, this.code).subscribe(value => {
      alert('tạo thành công');
      console.log(this.code);
      this.router.navigateByUrl('/employee/list');
    }, error => {
      this.validateCode = error.error.code;
      alert(this.validateCode);
    });
  }
}
