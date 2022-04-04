import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../../model/employee';
import {EmployeePosition} from '../../../model/employee-position';
import {EmployeeService} from '../../../service/employee.service';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import Swal from 'sweetalert2';
import {UploadService} from '../../../service/upload.service';
import {EmployeePositionService} from '../../../service/employee-position.service';


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employeeCreateForm: FormGroup;
  employeePositionList: EmployeePosition[];
  selectedImage: any = null;
  url: string;
  id: string;
  file: string;
  employeeList: Array<Employee>;
  loading = false;
  employee: Employee;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(UploadService) private uploadService: UploadService,
              private employeePositionService: EmployeePositionService) {
    this.employeeCreateForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.pattern('[N][V][-]\\d{4}')]),
      name: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$')]),
      dateOfBirth: new FormControl('', [Validators.required, this.checkMinAge]),
      gender: new FormControl('Nam'),
      address: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$')]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^(090|091)[0-9]+$'), Validators.maxLength(12), Validators.minLength(10)]),
      image: new FormControl(''),
      employeePosition: new FormGroup({
        id: new FormControl('', [Validators.required])
      })
    });
    this.employeeService.findAllEmployee().subscribe(value => {
      this.employeeList = value;
    });
    this.employeeService.findAllEmployee().subscribe(value => {
      this.employeeList = value;
      console.log(this.employeeList);
    });
  }


  get idPosition() {
    return this.employeeCreateForm.get('idPosition');
  }

  get code() {
    return this.employeeCreateForm.get('code');
  }

  get dateOfBirth() {
    return this.employeeCreateForm.get('dateOfBirth');
  }

  get gender() {
    return this.employeeCreateForm.get('gender');
  }

  get address() {
    return this.employeeCreateForm.get('address');
  }

  get phone() {
    return this.employeeCreateForm.get('phone');
  }


  saveNewEmployee() {
    const name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.employeeCreateForm.patchValue({image: url});
          const newEmployee = Object.assign({}, this.employeeCreateForm.value);
          console.log(newEmployee);
          this.employeeService.saveNewEmployee(newEmployee).subscribe(value => {
            this.callToast();
            console.log('them moi thanh cong');
            console.log(value);
          }, error => {
          }, () => {
            this.callToast();
            this.router.navigateByUrl('/employee/list');
          });
        });
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.uploadService.getImageDetailList();
    this.getAllEmployeePosition();
  }

  get image() {
    return this.employeeCreateForm.get('image');
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

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  getAllEmployeePosition() {
    this.employeePositionService.findAllEmployeePosition().subscribe(value => {
        this.employeePositionList = value;
        console.log(this.employeePositionList);
      }
    );
  }

  checkMinAge(abstractControl: AbstractControl): any {
    const dateOfBirth = abstractControl.value;
    const yearOfBirth = dateOfBirth.substr(0, 4);
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth >= 18 ? null : {under18: true};
  }
}
