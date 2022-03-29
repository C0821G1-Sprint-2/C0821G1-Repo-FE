import {Component, Inject, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EquipmentType} from '../../../model/equipment-type';
import {Supplier} from '../../../model/supplier';
import {Equipment} from '../../../model/equipment';
import {EquipmentService} from '../../../service/equipment.service';
import {Router} from '@angular/router';
import {EquipmentTypeService} from '../../../service/equipment-type.service';
import {SupplierService} from '../../../service/supplier.service';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {UploadFireService} from '../../../service/upload-file-image/upload-fire.service';


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

  constructor(private equipmentService: EquipmentService,
              private router: Router,
              private equipmentTypeService: EquipmentTypeService,
              private supplierService: SupplierService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(UploadFireService) private uploadFileService: UploadFireService) {
    this.equipmentForm = new FormGroup({
      code: new FormControl(),
      name: new FormControl(),
      price: new FormControl(),
      expired: new FormControl(),
      image: new FormControl(),
      equipmentType: new FormControl(),
      supplier: new FormControl(),
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
    //
    // setTimeout(() => {
    //   this.callToast(),
    //     this.router.navigateByUrl('/equipment/list');
    // }, 10);

    this.callToast(),
      this.router.navigateByUrl('/equipment/list');

    const name = this.selectImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          console.log(url);
          this.equipmentForm.patchValue({image: url});
          // const newEquipment = Object.assign({}, this.equipmentForm.value);
          const newEquipment = this.equipmentForm.value;
          console.log('==========>' + newEquipment);


          this.equipmentService.saveNewEquipment(newEquipment).subscribe(value => {
          }, error => {
            console.log('errorrrrrr');
          });
        });
      })
    ).subscribe();
  }

  private callToast() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Thêm mới thành công!',
      showConfirmButton: false,
      timer: 2000
    });
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


