import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Equipment} from '../model/equipment';


@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  API_URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }
  findById(id: number): Observable<Equipment> {
    return this.httpClient.get<Equipment>(this.API_URL + '/equipment/find-by-id/' + id);
  }

  equipmentListBody(page: number): Observable<any>{
    return this.httpClient.get<any>(this.API_URL + '/equipment/list?&page=' + page);
    
  findAllEquipment(page, equipment): Observable<any> {
    return this.httpClient.get(this.API_URL + '/equipment/equipment-list/?page=' + page + '&keyword=' + equipment);
  }

  getEquipmentById(equipmentId): Observable<any> {
    return this.httpClient.get(this.API_URL + '/equipment/find/' + equipmentId);
  }

  deleteEquipment(equipmentId): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/equipment/delete-equipment/' + equipmentId);
  }
}
