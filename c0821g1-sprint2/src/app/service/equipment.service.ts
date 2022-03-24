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
}
