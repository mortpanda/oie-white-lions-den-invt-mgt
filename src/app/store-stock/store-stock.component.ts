import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaConfigService } from 'app/shared/okta/okta-config.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { OktaGetTokenService } from 'app/shared/okta/okta-get-token.service';
import { StoreList, StoreItems } from 'app/shared/store-list/store-list';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'app/shared/data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { StoreDetailsComponent } from 'app/store-details/store-details.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-store-stock',
  templateUrl: './store-stock.component.html',
  styleUrls: ['./store-stock.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StoreStockComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  private authService = new OktaAuth(this.OktaSDKAuthService.config);
  StoreItems = StoreItems;
  StoreListColumns: string[] = ['name', 'address', 'tel'];

  constructor(
    public OktaGetTokenService: OktaGetTokenService,
    public OktaConfigService: OktaConfigService,
    private OktaSDKAuthService: OktaSDKAuthService,
    public StoreDetailsComponent: StoreDetailsComponent,
    public DataService: DataService,
    public dialog: MatDialog,
  ) { }

  strUserSession: Boolean;
  async ngOnInit() {
    // console.log(this.StoreItems)
    // localStorage.setItem('orderList1','');

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

        await this.OktaGetTokenService.GetAccessToken();
        this.GetStoreList();


    }
  }

  arrStoreList = [];
  async GetStoreList() {
    for (let i = 0; i < this.StoreItems.length; i++) {
      // console.log(this.StoreItems[i].name);
      this.arrStoreList.push({
        name: this.StoreItems[i].name,
        location: this.StoreItems[i].location,
      })

    }
    // console.log(this.arrStoreList)
  }

  itemRow;
  OpenStore(row): void {
    let dialogRef = this.dialog.open(StoreDetailsComponent, {
       width: '800px', height: 'auto',
      data: { row },
    });

    dialogRef.afterClosed().subscribe(result => { row = result; });
    this.itemRow = row;
    // console.log(this.itemRow)
    this.DataService.changeMessage(this.itemRow);
  }
}