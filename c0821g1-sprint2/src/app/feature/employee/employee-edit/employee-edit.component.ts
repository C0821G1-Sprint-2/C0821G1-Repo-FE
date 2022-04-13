import {Component, Inject, OnInit} from '@angular/core';
import {Employee} from '../../../model/employee';
import {EmployeePosition} from '../../../model/employee-position';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EmployeeService} from '../../../service/employee.service';
import {EmployeePositionService} from '../../../service/employee-position.service';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import {UploadService} from '../../../service/upload.service';
import {NgxSpinnerService} from 'ngx-bootstrap-spinner';

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
  idEdit: number;
  employeeEditForm: FormGroup;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private employeePositionService: EmployeePositionService,
              private activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(UploadService) private uploadService: UploadService,
              private snipper: NgxSpinnerService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idEdit = +paramMap.get('id');
      console.log('===>' + this.idEdit )
      const employee = this.getEmployee(this.idEdit);
      console.log('===>' +employee)
    });
  }

  ngOnInit(): void {
    this.getAllEmployeePosition();
  }

  getEmployee(id: number) {
    return this.employeeService.findById(id).subscribe(employee => {
      this.employeeEditForm = new FormGroup({
        id: new FormControl(employee.id),
        code: new FormControl(employee.code, [Validators.required, Validators.pattern('[N][V][-]\\d{3}')]),
        name: new FormControl(employee.name, [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$')]),
        dateOfBirth: new FormControl(employee.dateOfBirth, [Validators.required, this.checkMinAge, this.checkMaxAge]),
        gender: new FormControl(employee.gender),
        address: new FormControl(employee.address, [Validators.required, Validators.maxLength(40)]),
        phone: new FormControl(employee.phone, [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$'), Validators.minLength(10), Validators.maxLength(12)]),
        image: new FormControl(employee.image),
        employeePosition: new FormGroup({
          id: new FormControl(employee.employeePosition.id,[Validators.required])
        })
      })
    })
  }

  getAllEmployeePosition() {
    this.employeePositionService.findAllEmployeePosition().subscribe(value => {
        this.employeePositionList = value;
      }
    );
  }

  get employeeImage() {
    return this.employeeEditForm.get('employeeImage');
  }


  updateEmployee(id: number) {
    const employee = this.employeeEditForm.value;
    this.employeeService.editEmployee(id, employee).subscribe(() => {
      this.snipper.show()
      this.router.navigate(['/employee/list']);
      this.callToast();
    }, error => {

    },
      () => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.snipper.hide();
        }, 10000)
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
          this.employeeEditForm.patchValue({image: url});
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
  checkMaxAge(abstractControl: AbstractControl): any {
    const dateOfBirth = abstractControl.value;
    const yearOfBirth = dateOfBirth.substr(0, 4);
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth < 100 ? null : {under100: true};
  }
}
