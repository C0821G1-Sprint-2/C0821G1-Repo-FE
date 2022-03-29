// @ts-ignore
import { Component, OnInit } from '@angular/core';
import {Financial} from "../../../model/financial";

// @ts-ignore
@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {
  financial: Financial;
  constructor() { }

  ngOnInit(): void {
  }

}
