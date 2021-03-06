import {Component, Inject, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EquipmentType} from '../../../model/equipment-type';
import {Supplier} from '../../../model/supplier';
import {Equipment} from '../../../model/equipment';
import {EquipmentService} from '../../../service/equipment.service';
import {Router} from '@angular/router';
import {EquipmentTypeService} from '../../../service/equipment-type.service';
import {SupplierService} from '../../../service/supplier.service';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
// @ts-ignore
import {AngularFireStorage} from '@angular/fire/storage';
import {UploadFireService} from '../../../service/upload-file-image/upload-fire.service';
import validate = WebAssembly.validate;


@Component({
  selector: 'app-equipment-create',
  templateUrl: './equipment-create.component.html',
  styleUrls: ['./equipment-create.component.css']
})
export class EquipmentCreateComponent implements OnInit {

  equipmentList: Array<Equipment>;
  equipmentTypeList: Array<EquipmentType>;
  supplierList: Array<Supplier>;
  url: string;
  id: string;
  file: string;
  equipmentForm: FormGroup;
  selectImage: any;
  validateCode: boolean;
  validateDay: boolean;
  prices: any;
  checkDay: boolean;

  constructor(private equipmentService: EquipmentService,
              private router: Router,
              private equipmentTypeService: EquipmentTypeService,
              private supplierService: SupplierService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(UploadFireService) private uploadFileService: UploadFireService) {
    this.equipmentForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.pattern('^[V][T][-]\\d{3}$')]),
      name: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      price: new FormControl('', [Validators.required, Validators.pattern('^\\d{4,9}$')]),
      expired: new FormControl('', Validators.required),
      image: new FormControl(),
      equipmentType: new FormControl('', [Validators.required]),
      supplier: new FormControl('', [Validators.required]),
    });
    this.supplierService.findAllSupplier().subscribe(value => {
      this.supplierList = value;
      console.log(this.supplierList);
    });
    this.equipmentTypeService.findAllEquipmentType().subscribe(value => {
      this.equipmentTypeList = value;
      console.log(this.equipmentTypeList);
    });
  }

  ngOnInit(): void {
    this.uploadFileService.getImageDetailList();
  }

  get equipmentImage() {
    return this.equipmentForm.get('equipmentImage');
  }

  saveNewEquipment() {

    setTimeout(() => {
      this.callToast(),
        this.router.navigateByUrl('/equipment/list');
    }, 20);

    const name = this.selectImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.equipmentForm.patchValue({image: url});
          const newEquipment = Object.assign({}, this.equipmentForm.value);
          console.log('==========>' + newEquipment);
          this.equipmentService.saveNewEquipment(newEquipment).subscribe(value => {
          }, error => {
            // console.log(error);
            this.validateCode = false;
          });
        });
      })
    ).subscribe();

  }

  private callToast() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Th??m m???i th??nh c??ng!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  check(expired) {
    this.equipmentService.checkDate(expired).subscribe(value => {

      console.log('Dong' + value);

      this.checkDay = !!value;
    })
  }

  showPreview(event: any) {
    this.selectImage = event.target.files[0];
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
}


