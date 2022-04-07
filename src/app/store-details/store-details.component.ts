import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/shared/data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { ProductStock, ProductItems } from 'app/shared/product-stock/product-stock';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StoreDetailsComponent implements OnInit {

  zoom: number = 15;
  selectedMessage: any;
  ProductItems = ProductItems;
  constructor(
    public DataService: DataService,
  ) { }
  StockColumns: string[] = ['name', 'count'];
  arrStoreDetails;
  arrStoreStock=[];
  lat;
  lng;

  arrProctList;
  async ngOnInit() {
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));

    this.arrStoreDetails = this.selectedMessage;
    this.lat = this.arrStoreDetails.location.lat;
    this.lng = this.arrStoreDetails.location.long;
    console.log(this.arrStoreDetails.name)
    this.GetStoreProducts();

  }

  
  GetStoreProducts() {
    for (let i = 0; i < this.ProductItems.length; i++) {
      
      switch (this.ProductItems[i].store){
        case this.arrStoreDetails.name:{
          // console.log(this.ProductItems[i].name + " " + this.ProductItems[i].stockCount )
          this.arrStoreStock.push({
            productName:this.ProductItems[i].name,
            productCount:this.ProductItems[i].stockCount,
          })
          break;
        }
        default:
          break;
      }
    }
    console.log(this.arrStoreStock)
  }

}
