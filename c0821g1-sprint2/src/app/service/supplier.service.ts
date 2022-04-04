import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Supplier} from '../model/supplier';
import {EquipmentType} from '../model/equipment-type';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  API_URL = 'http://localhost:8080/supplier/list';
  constructor(private httpClient: HttpClient) { }
  findAllSupplier(): Observable<Supplier[]>{
    return this.httpClient.get<Supplier[]>(this.API_URL);
  }
}
