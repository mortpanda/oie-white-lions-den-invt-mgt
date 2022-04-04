import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaConfigService } from 'app/shared/okta/okta-config.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { OktaGetTokenService } from 'app/shared/okta/okta-get-token.service';

import { OrderList, OrderItems } from 'app/shared/order-list/order-list';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { DataService } from 'app/shared/data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import {OrderDetailsComponent} from 'app/order-details/order-details.component';
// const ELEMENT_DATA = OrderItems;


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderListComponent implements OnInit {
  private authService = new OktaAuth(this.OktaSDKAuthService.config);
  displayedColumns: string[] = ['orderID','orderStatus','manu','destShop','eta'];
  OrderItems = OrderItems;

  constructor(
    public OktaGetTokenService: OktaGetTokenService,
    public OktaConfigService: OktaConfigService,
    private OktaSDKAuthService: OktaSDKAuthService,

    public DataService:DataService,
    public OrderDetailsComponent:OrderDetailsComponent,
    public dialog: MatDialog,
  ) { }

   
  // displayedColumns: string[] = ['orderID', 'manu', 'orderTotal','manu',  'destShop','eta','orderStatus'];


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
        await this.OktaGetTokenService.GetAccessToken()
        await localStorage.setItem('orderList', JSON.stringify(this.OrderItems));
        await this.LoadOrderTable();
        
        break;
    }
  }

  itemRow;
  openProduct(row): void {
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      // width: '800px', height: 'auto',
      data: { row },
    });

    dialogRef.afterClosed().subscribe(result => { row = result; });
    // console.log('Row clicked: ', row);
    this.itemRow = row;
    // console.log(this.itemRow);
    this.DataService.changeMessage(this.itemRow);
  }

  tableDataSourceFromDisk;
  tableDataSource;
  async LoadOrderTable() {

    // this.tableDataSource = new MatTableDataSource(localStorage.getItem('orderList'));
    this.tableDataSourceFromDisk = JSON.parse(localStorage.getItem('orderList'));
    // ELEMENT_DATA = this.tableDataSource;
    this.tableDataSource = this.tableDataSourceFromDisk;

  }

}
