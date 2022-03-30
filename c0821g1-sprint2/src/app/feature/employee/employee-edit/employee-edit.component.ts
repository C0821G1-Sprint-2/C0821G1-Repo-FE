import {Component, Inject, OnInit} from '@angular/core';
import {Employee} from '../../../model/employee';
import {EmployeePosition} from '../../../model/employee-position';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../../service/employee.service';
import {EmployeePositionService} from '../../../service/employee-position.service';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  validateCode: string;
  employeePositionList: Array<EmployeePosition>;
  employeeEdit: Employee;
  private selectedImage: any;
  loading = false;
  employee: Employee;
  employeeEditForm = new FormGroup({
    employeeCode: new FormControl('', [Validators.required, Validators.pattern('[N][V][-]\\d{4}')]),
    employeeName: new FormControl(''),
    employeeDateOfBirth: new FormControl('', [Validators.required]),
    employeeAddress: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    employeePhone: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
    employeeGender: new FormControl(),
    employeePosition: new FormControl('', Validators.required),
    employeeImage: new FormControl('')
  });

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private employeePositionService: EmployeePositionService,
              private activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.employeePositionService.findAllEmployeePosition().subscribe(value => {
      this.employeePositionList = value;
      console.log(this.employeePositionList);

      const employeeEditId = this.activatedRoute.snapshot.params.id;
      this.employeeService.findById(employeeEditId).subscribe(value2 => {
        this.employeeEdit = value2;
        console.log(this.employeeEdit);
        this.employeeEditForm.patchValue(
          this.employeeEdit
        );
      });
    });
  }

  get employeeImage() {
    return this.employeeEditForm.get('employeeImage');
  }
  editEmployee() {
    const editEmployee = Object.assign({}, this.employeeEditForm.value);
    editEmployee.employeeId = this.employeeEdit.id;
    editEmployee.employeeDeleteFlag = this.employeeEdit.deleteFlag;
    this.employeeService.editEmployee(editEmployee).subscribe(value => {
        this.callToast();
      },
      error => {
        console.log(error);
        this.validateCode = error.error.code;
        alert(this.validateCode);
      }, () => {
        this.router.navigateByUrl('/employee/list');
      });
  }

  private callToast() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Chỉnh sửa thành công!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const nameImg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.loading = true;
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.employeeEditForm.patchValue({employeeImage: url});
          this.employee.image = url;
          this.loading = false;
        });
      })
    ).subscribe();
  }

  checkMinAge(abstractControl: AbstractControl): any {
    const dateOfBirth = abstractControl.value;
    const yearOfBirth = dateOfBirth.substr(0, 4);
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth >= 18 ? null : {under18: true};
  }
}
