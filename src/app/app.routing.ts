import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from 'app/landing/landing.component';
import {StartComponent} from 'app/start/start.component';
import {InventoryListComponent} from 'app/inventory-list/inventory-list.component';
import {OrderListComponent} from 'app/order-list/order-list.component';
import {CreateOrderComponent} from 'app/create-order/create-order.component';
import {StoreStockComponent} from 'app/store-stock/store-stock.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'start', component: StartComponent },
  { path: 'inventory', component: InventoryListComponent },
  { path: 'orderlist', component: OrderListComponent },
  { path: 'create-order', component: CreateOrderComponent },
  { path: 'stores', component: StoreStockComponent },
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
