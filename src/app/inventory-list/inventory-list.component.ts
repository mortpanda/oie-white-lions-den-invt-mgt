import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaConfigService } from 'app/shared/okta/okta-config.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { ProductStock, ProductItems } from 'app/shared/product-stock/product-stock';
import { OktaGetTokenService } from 'app/shared/okta/okta-get-token.service';
import 'rxjs/add/operator/map';
import { InventoryPopupComponent } from 'app/inventory-popup/inventory-popup.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import {DataService} from 'app/shared/data-service/data.service';
import { Subject, BehaviorSubject, Observable,ReplaySubject } from 'rxjs';

import {MatTableDataSource} from '@angular/material/table';


const ELEMENT_DATA = ProductItems;

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InventoryListComponent implements OnInit {
  private authService = new OktaAuth(this.OktaSDKAuthService.config);


  dataSource = new MatTableDataSource(ELEMENT_DATA);
  // displayedColumns: string[] = ['name', 'desc', 'manu', 'itemcode'];

  displayedColumns: string[] = ['name', 'category', 'designer','manu',  'stockCount','itemcode','itemPrice'];

  constructor(
    public OktaGetTokenService: OktaGetTokenService,
    public OktaConfigService: OktaConfigService,
    private OktaSDKAuthService: OktaSDKAuthService,

    public InventoryPopupComponent: InventoryPopupComponent,
    public dialog: MatDialog,
    public DataService:DataService,
    
  ) { }


  
  strUserSession: Boolean;

  async ngOnInit() {
    
    this.authService.token.getUserInfo()
      .then(function (user) {
        console.log(user)
      })
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in

          return exists
        } else {
          // not logged in
          return exists
        }
      });
    switch (this.strUserSession == true) {
      case false:
      // await window.location.replace(this.OktaConfigService.strPostLogoutURL);
      case true:
        // User is logged in
        this.OktaGetTokenService.GetAccessToken()
        break;
    }
  }

itemRow;
  openProduct(row): void {
    let dialogRef = this.dialog.open(InventoryPopupComponent, {
      width: 'auto', height: 'auto',
      data: { row },
    });

    dialogRef.afterClosed().subscribe(result => { row = result; });
    // console.log('Row clicked: ', row);
    this.itemRow = row;
    // console.log(this.itemRow);
    this.DataService.changeMessage(this.itemRow);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   

}
