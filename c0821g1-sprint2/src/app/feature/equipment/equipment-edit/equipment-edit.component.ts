import {Component, Inject, OnInit} from '@angular/core';
import {EquipmentType} from '../../../model/equipment-type';
import {Supplier} from '../../../model/supplier';
import {Equipment} from '../../../model/equipment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EquipmentService} from '../../../service/equipment.service';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {EquipmentTypeService} from '../../../service/equipment-type.service';
import {SupplierService} from '../../../service/supplier.service';
// @ts-ignore

import {AngularFireStorage} from '@angular/fire/storage';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import {compareSegments} from '@angular/compiler-cli/ngcc/src/sourcemaps/segment_marker';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.css']
})
export class EquipmentEditComponent implements OnInit {

  equipmentTypeList: Array<EquipmentType>;
  supplierList: Array<Supplier>;
  private selectImage: any;
  loading = false;
  equipmentEdit: Equipment;
  equipment: Equipment;
  prices: any;

  equipmentForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.pattern('^[V][T][-]\\d{4}$')]),
    name: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    price: new FormControl('', [Validators.required, Validators.pattern('^\\d{4,9}$')]),
    expired: new FormControl('', Validators.required),
    image: new FormControl(),
    equipmentType: new FormControl('', Validators.required),
    supplier: new FormControl('', Validators.required),
  });
  private validateCode: any;

  constructor(private equipmentService: EquipmentService,
              private router: Router,
              private equipmentTypeService: EquipmentTypeService,
              private supplierService: SupplierService,
              private activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.equipmentTypeService.findAllEquipmentType().subscribe(value => {
      this.equipmentTypeList = value;
      console.log(this.equipmentTypeList + 'ddddđ11');
      this.supplierService.findAllSupplier().subscribe(value1 => {
        this.supplierList = value1;
        console.log(this.supplierList + 'dsdsdsđs22222');
        const equipmentEditId = this.activatedRoute.snapshot.params.id;
        this.equipmentService.findById(equipmentEditId).subscribe(value2 => {
          this.equipmentEdit = value2;
          console.log('ddddd=>' + value2);
          this.equipmentForm.patchValue(this.equipmentEdit);
        });
      });
    });
  }

  editEquipment() {
    console.log('ddddongggg');
    const editEquipment = Object.assign({}, this.equipmentForm.value);
    editEquipment.id = this.equipmentEdit.id;
    editEquipment.deleteFlag = this.equipmentEdit.deleteFlag;
    this.equipmentService.editEquipment(editEquipment).subscribe(value => {
        this.callToast();
      },
      error => {
        console.log(error);
      }, () => {
        this.router.navigateByUrl('/equipment/list');
      });
  }

  private callToast() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Sửa mới thành công!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  showPreview(event: any) {
    this.selectImage = event.target.files[0];
    const nameImg = this.selectImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.loading = true;
    this.storage.upload(nameImg, this.selectImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.equipmentForm.patchValue({image: url});
          this.equipment.image = url;
          this.loading = false;
        });
      })
    ).subscribe();
  }

  compareFneT(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

  compareFnS(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }
}
