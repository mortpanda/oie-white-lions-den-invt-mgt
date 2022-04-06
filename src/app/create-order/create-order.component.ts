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
import { FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule } from "@angular/forms";
import { StoreList, StoreItems } from 'app/shared/store-list/store-list';
import { ProductStock, ProductItems } from 'app/shared/product-stock/product-stock';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';

import { OrderQuantity, ItemCount } from 'app/shared/order-quantity/order-quantity';
import { OrderList, OrderItems } from 'app/shared/order-list/order-list';
import { RouterModule, Routes } from '@angular/router';


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
  ItemCount = ItemCount;

  orderForm: FormGroup;
  itemToOrder;

  arrSelectedItem;
  selectedItemName;
  selectedItemCode;
  selectedItemCat;
  selectedItemPrice;
  SelectedItemManu;
  strUserSession: Boolean;
  ProductToOrder;
  randomOrderNumber;

  ItemPrice;
  GrandTotal;
  epochDate;

  OrderItems = OrderItems;

  factoryLocation = {
    lat: 55.3925554,
    long: 9.938649,
  };
  

  constructor(
    public OktaGetTokenService: OktaGetTokenService,
    public OktaConfigService: OktaConfigService,
    private OktaSDKAuthService: OktaSDKAuthService,
    public DataService: DataService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private router: Router,
  ) {

    // this.orderNo=new FormControl('',[Validators.required]);
    this.orderForm = this.fb.group({
      orderNo: this.randomOrderNumber,
      store: '',
      itemCode: '',
    });


  }

  arrNewOrder;
  newOrderNumber: Number;
  newOrderItemCode;
  newOrderDestShop;
  tableDataSourceFromDisk;
  onSubmit() {


    this.newOrderNumber = Number(this.orderForm.get("orderNo").value);
    this.newOrderItemCode = this.orderForm.get("itemCode").value;
    this.newOrderDestShop = this.orderForm.get("store").value;

    // console.log(this.orderForm.get("store").value)
    // console.log(this.selectedItemName);
    // console.log(this.SelectedItemManu);
    // console.log(this.selectedItemCat);
    // console.log(this.selectedItemCode);
    // console.log(this.selectedItemPrice);

    localStorage.removeItem('orderList');

    this.AddMonths(3)

    if (localStorage.getItem('orderList') == null) {
      // this.tableDataSourceFromDisk = JSON.parse(localStorage.getItem('orderList'));
      // this.tableDataSource = this.tableDataSourceFromDisk;
      
      //localStorage.setItem('orderList', JSON.stringify(this.OrderItems));
      this.arrNewOrder = this.OrderItems;
    }
    else {
      
      //  localStorage.setItem('orderList', JSON.stringify(this.OrderItems));
      this.tableDataSourceFromDisk = JSON.parse(localStorage.getItem('orderList'));
      this.arrNewOrder  = this.tableDataSourceFromDisk;
      // this.tableDataSource = this.tableDataSourceFromDisk;
    }
    
    // this.arrNewOrder = this.OrderItems;
    this.arrNewOrder.push({
      orderID: this.newOrderNumber,
      manu: this.SelectedItemManu,
      itemCode: this.newOrderItemCode,
      itemCount: this.orderStockCount,
      itemPrice: this.selectedItemPrice,
      destShop: this.newOrderDestShop,
      eta: this.epochDate,
      currentLoc: this.factoryLocation,
      orderStatus:'発送準備中',
    })
    console.log(this.arrNewOrder);

    
    
    localStorage.setItem('orderList',JSON.stringify(this.arrNewOrder));
    this.router.navigate(['/orderlist']);


  }

  
  AddMonths(months) {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    this.epochDate = date.getTime() /1000;
    console.log(this.epochDate )
    // return date
  }


  async ngOnInit() {
    this.dialog.closeAll()

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
        // this.dialog.closeAll()
        // User is logged in
        this.OktaGetTokenService.GetAccessToken()
        this.ProductToOrder = await this.selectedMessage;
        // this.itemToOrder=this.ProductToOrder.itemcode;
        this.itemToOrder = this.ProductToOrder.itemcode;
        this.GetItemDetails(this.itemToOrder);


        break;
    }
    // console.log(this.ProductToOrder)
  }


  GetItemDetails(strItemCode) {
    for (let i = 0; i < this.ProductItems.length; i++) {
      switch (this.ProductItems[i].itemcode) {
        case strItemCode: {
          console.log(this.ProductItems[i]);
          this.selectedItemName = this.ProductItems[i].name;
          this.selectedItemCode = this.ProductItems[i].itemcode;
          this.selectedItemCat = this.ProductItems[i].category;
          this.selectedItemPrice = this.ProductItems[i].itemPrice;
          this.SelectedItemManu = this.ProductItems[i].manu;
          break;
        }
        default:
          break;
      }
    }

  }


  async ProductChange(event: MatSelectChange) {
    // console.log(event.value)
    // console.log(this.ProductItems)
    for (let i = 0; i < this.ProductItems.length; i++) {
      switch (this.ProductItems[i].itemcode) {
        case (event.value): {
          // console.log(this.ProductItems[i].itemcode);
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
    this.selectedItemPrice = this.arrSelectedItem.itemPrice;
    this.SelectedItemManu = this.arrSelectedItem.manu;
  }

  orderStockCount;
  async itemCountChange(event: MatSelectChange) {
    this.orderStockCount = event.value;
    console.log(this.orderStockCount);
    this.GrandTotal = this.selectedItemPrice * this.orderStockCount;
  }



}
