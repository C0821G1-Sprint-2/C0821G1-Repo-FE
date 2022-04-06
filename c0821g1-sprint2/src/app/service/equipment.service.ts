import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Equipment} from '../model/equipment';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  API_URL = 'http://localhost:8080/api/equipment';

  constructor(private httpClient: HttpClient) {
  }

  // findAll(): Observable<Equipment[]> {
  //   return this.httpClient.get<Equipment[]>(this.API_URL + '/list');
  // }

  saveNewEquipment(equipment: Equipment): Observable<void> {
    return this.httpClient.post<void>(this.API_URL + '/add', equipment);
  }

  editEquipment(equipmentEdit: Equipment): Observable<void> {
    return this.httpClient.patch<void>(this.API_URL + '/edit/' + equipmentEdit.id, equipmentEdit);
  }

  getEquipmentById(equipmentId): Observable<any> {
    return this.httpClient.get(this.API_URL + '/find/' + equipmentId);
  }

  findById(id: number): Observable<Equipment> {
    return this.httpClient.get<Equipment>(this.API_URL + '/find/' + id);
  }

  equipmentListBody(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/list?&page=' + page);
  }

  findAllEquipment(page, equipment): Observable<any> {
    return this.httpClient.get(this.API_URL + '/equipment-list/?page=' + page + '&keyword=' + equipment);
  }

  deleteEquipment(equipmentId): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/delete-equipment/' + equipmentId);
  }
}
