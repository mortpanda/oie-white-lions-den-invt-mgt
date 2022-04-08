import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/shared/data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { ProductStock, ProductItems } from 'app/shared/product-stock/product-stock';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { InventoryPopupComponent } from 'app/inventory-popup/inventory-popup.component';

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
    public dialog: MatDialog,
    public InventoryPopupComponent: InventoryPopupComponent,
    
  ) { }
  StockColumns: string[] = ['name', 'itemcode','count'];
  arrStoreDetails;
  arrStoreStock = [];
  lat;
  lng;

  arrProctList;
  async ngOnInit() {
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));

    // console.log(this.selectedMessage);

    this.arrStoreDetails = this.selectedMessage;
    this.lat = this.arrStoreDetails.location.lat;
    this.lng = this.arrStoreDetails.location.long;
    console.log(this.arrStoreDetails.name)
    this.GetStoreProducts();

  }

  itemRow;
  OpenItem(row): void {
    let dialogRef = this.dialog.open(InventoryPopupComponent, {
      width: 'auto', height: 'auto',
      data: { row },
    });

    dialogRef.afterClosed().subscribe(result => { row = result; });
    // console.log('Row clicked: ', row);
    this.itemRow = row;
    console.log(this.itemRow);
    this.DataService.changeMessage(this.itemRow);
  }

  GetStoreProducts() {
    for (let i = 0; i < this.ProductItems.length; i++) {

      switch (this.ProductItems[i].store) {
        case this.arrStoreDetails.name: {
          // console.log(this.ProductItems[i].name + " " + this.ProductItems[i].stockCount )
          this.arrStoreStock.push({
            name: this.ProductItems[i].name,
            stockCount: this.ProductItems[i].stockCount,
            itemcode:this.ProductItems[i].itemcode,
            desc:this.ProductItems[i].desc,
            manu:this.ProductItems[i].manu,
            itemPrice:this.ProductItems[i].itemPrice,
            designer:this.ProductItems[i].designer,
            imgPath:this.ProductItems[i].imgPath,
            store:this.ProductItems[i].store,

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

