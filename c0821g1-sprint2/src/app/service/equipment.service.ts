import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Equipment} from '../model/equipment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  API_URL = 'http://localhost:8080/equipment';
  constructor(private http: HttpClient) { }

  findAll(): Observable<Equipment[]>{
    return this.http.get<Equipment[]>(this.API_URL + '/list');
  }
  saveNewEquipment(equipment: Equipment): Observable<void> {
    return this.http.post<void>(this.API_URL + '/add', equipment);
  }
  editEquipment(equipmentEdit: Equipment): Observable<void> {
    return this.http.patch<void>(this.API_URL + '/edit/' + equipmentEdit.id, equipmentEdit);
  }
  getEquipmentById(equipmentId): Observable<any> {
    return this.http.get(this.API_URL + '/find/' + equipmentId);
  }
}
