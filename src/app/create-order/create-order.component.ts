import { Component, OnInit } from '@angular/core';
import { OktaGetTokenService } from 'app/shared/okta/okta-get-token.service';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { OktaConfigService } from 'app/shared/okta/okta-config.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { DataService } from 'app/shared/data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StoreList, StoreItems } from 'app/shared/store-list/store-list';
import { ProductStock, ProductItems } from 'app/shared/product-stock/product-stock';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { timeStamp } from 'console';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateOrderComponent implements OnInit {
  private authService = new OktaAuth(this.OktaSDKAuthService.config);
  selectedMessage: any;

  StoreItems = StoreItems;
  ProductItems = ProductItems;

  orderForm: FormGroup;

  constructor(
    public OktaGetTokenService: OktaGetTokenService,
    public OktaConfigService: OktaConfigService,
    private OktaSDKAuthService: OktaSDKAuthService,
    public DataService: DataService,
    public dialog: MatDialog,
    public fb: FormBuilder,
  ) {
    this.orderForm = this.fb.group({
      orderNo: this.randomOrderNumber
    });
  }




  strUserSession: Boolean;
  ProductToOrder;
  randomOrderNumber;
  async ngOnInit() {
    this.randomOrderNumber = await Math.random().toFixed(5).replace(/\d\./, '');





    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));
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
        await window.location.replace(this.OktaConfigService.strPostLogoutURL);
      case true:
        this.dialog.closeAll()
        // User is logged in
        this.OktaGetTokenService.GetAccessToken()
        this.ProductToOrder = await this.selectedMessage;
        break;
    }
    console.log(this.ProductToOrder)
  }


  arrSelectedItem;
  selectedItemName;
  selectedItemCode;
  selectedItemCat;
  async ProductChange(event: MatSelectChange) {
    // console.log(event.value)
    // console.log(this.ProductItems)
    for (let i = 0; i < this.ProductItems.length; i++) {
      switch (this.ProductItems[i].itemcode) {
        case (event.value): {
          console.log(this.ProductItems[i].itemcode);
          this.arrSelectedItem = this.ProductItems[i];
          break;
        }
        default:

      }

    }
    console.log(this.arrSelectedItem);
    this.selectedItemName = this.arrSelectedItem.name;
    this.selectedItemCode = this.arrSelectedItem.itemcode;
    this.selectedItemCat = this.arrSelectedItem.category;
  }

}
