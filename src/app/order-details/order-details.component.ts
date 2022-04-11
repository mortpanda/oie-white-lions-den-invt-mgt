import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/shared/data-service/data.service';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';




@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit {
  // google maps zoom level
  zoom: number = 5;
  selectedMessage: any;
  constructor(
    public DataService: DataService,
  ) { }

  arrOrderDetails;
  arrOrderItems = [];
  arrayOfItems = [];
  itemCountTotal = 0;
  SubTotal = 0;
  GrandTotal = 0;
  lat;
  lng;
  async ngOnInit() {
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));

    this.arrOrderDetails = this.selectedMessage;
    this.arrOrderItems = this.arrOrderDetails.orderInfo;
    this.SubTotal = this.arrOrderDetails.itemPrice * this.arrOrderDetails.itemCount;
    this.GrandTotal = this.SubTotal;
    this.itemCountTotal = this.arrOrderDetails.itemCount;
    console.log(this.arrOrderDetails)


    // for (let i in this.arrOrderItems) {
    //   // console.log(this.arrOrderItems[i]);
    //   this.arrayOfItems.push(this.arrOrderItems[i])
    //   this.itemCountTotal = this.itemCountTotal + this.arrOrderItems[i].itemCount;
    //   this.SubTotal = this.arrOrderItems[i].itemPrice * this.arrOrderItems[i].itemCount;
    //   this.GrandTotal = this.GrandTotal + this.SubTotal;
    //   // console.log(this.SubTotal)
    // }


    this.lat = this.arrOrderDetails.currentLoc.lat;
    this.lng = this.arrOrderDetails.currentLoc.long;




  }

}
