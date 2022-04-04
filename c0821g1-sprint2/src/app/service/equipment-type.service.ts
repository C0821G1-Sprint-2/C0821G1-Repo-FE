import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EquipmentType} from '../model/equipment-type';

@Injectable({
  providedIn: 'root'
})
export class EquipmentTypeService {
  API_URL = 'http://localhost:8080/equipmentType/list';
  constructor(private httpClient: HttpClient) { }
  findAllEquipmentType(): Observable<EquipmentType[]>{
    return this.httpClient.get<EquipmentType[]>(this.API_URL);
  }
}
