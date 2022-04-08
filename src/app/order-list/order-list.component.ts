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
import { OrderDetailsComponent } from 'app/order-details/order-details.component';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderListComponent implements OnInit {
  private authService = new OktaAuth(this.OktaSDKAuthService.config);
  displayedColumns: string[] = ['orderID', 'orderStatus', 'manu', 'destShop', 'eta'];
  OrderItems = OrderItems;
  tableDataSource;

  constructor(
    public OktaGetTokenService: OktaGetTokenService,
    public OktaConfigService: OktaConfigService,
    private OktaSDKAuthService: OktaSDKAuthService,
    public DataService: DataService,
    public OrderDetailsComponent: OrderDetailsComponent,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  strUserSession: Boolean;
  async ngOnInit() {
    await this.authService.token.getUserInfo()
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
        await window.location.replace(this.OktaConfigService.strPostLogoutURL);
      case true:
        this.tableDataSource = JSON.parse(localStorage.getItem('orderList'));
        await this.OktaGetTokenService.GetAccessToken()

    }
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  itemRow;
  openProduct(row): void {
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      // width: '800px', height: 'auto',
      data: { row },
    });

    dialogRef.afterClosed().subscribe(result => { row = result; });
    this.itemRow = row;
    this.DataService.changeMessage(this.itemRow);
  }

  SetDefault() {
    localStorage.removeItem('orderList');
    this.router.navigate(['/start']);

  }

}
