import {Equipment} from './equipment';
import {Customer} from './customer';

export class Cart {
  id: number;
  code: string;
  purchaseDate: string;
  quantity: number;
  totalMoney: number;
  equipment: Equipment;
  customer: Customer;

  constructor() {
  }
}
