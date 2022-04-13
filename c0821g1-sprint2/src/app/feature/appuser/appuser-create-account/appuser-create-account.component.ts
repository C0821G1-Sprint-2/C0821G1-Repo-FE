import {Component, OnInit} from '@angular/core';
import {Employee} from '../../../model/employee';
import {EmployeeService} from '../../../service/employee.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppuserService} from '../../../service/appuser.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

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
  errorMessageCodeExist: string;
  errorMessageAppUserExist: string;
  errorMessageUsernameExist: string;


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


  private callToast() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Đăng kí thành công!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  saveAppUser() {
    const newAppUser = Object.assign({}, this.accountForm.value);
    this.appuserService.saveAppUser(newAppUser, this.code).subscribe(value => {
        this.callToast();
        console.log(this.code);
        this.router.navigateByUrl('/employee/list');
      }, error => {
        this.validateCode = error.error.code;
        if (this.validateCode === 'Mã nhân viên không tồn tại') {
          this.errorMessageAppUserExist = '';
          this.errorMessageUsernameExist = '';
          this.errorMessageCodeExist = this.validateCode;
        } else if (this.validateCode === 'Nhân viên này đã có tài khoản') {
          this.errorMessageCodeExist = '';
          this.errorMessageUsernameExist = '';
          this.errorMessageAppUserExist = this.validateCode;
        } else if (this.validateCode === 'Tên tài khoản đã tồn tại') {
          this.errorMessageCodeExist = '';
          this.errorMessageAppUserExist = '';
          this.errorMessageUsernameExist = this.validateCode;
        }
      }
    );
  }
}
