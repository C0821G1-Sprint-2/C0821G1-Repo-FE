import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../../model/employee';
import {EmployeePosition} from '../../../model/employee-position';
import {EmployeeService} from '../../../service/employee.service';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employeeCreateForm: FormGroup;
  employeePositionList: Employee[];
  selectedImage: any = null;
  url: string;
  id: string;
  file: string;
  employeeList: Array<Employee>;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.employeeCreateForm = new FormGroup({
      employeeCode: new FormControl('', [Validators.required, Validators.pattern('[N][V][-]\\d{4}')]),
      employeeName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      employeeDateOfBirth: new FormControl('', [Validators.required]),
      employeeGender: new FormControl('Nam'),
      employeeAddress: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      employeePhone: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
      employeeImage: new FormControl(''),
      employeePosition: new FormControl('', Validators.required)
    });
    this.employeeService.findAllEmployee().subscribe(value => {
      this.employeePositionList = value;
      console.log(this.employeePositionList);
    });
    this.employeeService.findAllEmployee().subscribe(value => {
      this.employeeList = value;
      console.log(this.employeeList);
    });
  }

  saveNewEmployee() {
    const name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.employeeCreateForm.patchValue({employeeImage: url});
          const newEmployee = Object.assign({}, this.employeeCreateForm.value);
          console.log(newEmployee);
          this.employeeService.saveNewEmployee(newEmployee).subscribe(value => {
            this.callToast();
            console.log('them moi thanh cong');
            console.log(value);
          }, error => {
          }, () => {
            this.callToast(),
              this.router.navigateByUrl('/employee/list');
          });
        });
      })
    ).subscribe();
  }

  ngOnInit(): void {
  }

  private callToast() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Thêm mới thành công!',
      showConfirmButton: false,
      timer: 2000
    });
  }
}
