import { Component, OnInit } from '@angular/core';
import {DataService} from 'app/shared/data-service/data.service';
import { Subject, BehaviorSubject, Observable,ReplaySubject } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailsComponent implements OnInit {
  selectedMessage:any;
  constructor(
    public DataService:DataService,
  ) { }

  arrOrderDetails;
  async ngOnInit() {
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));

    // console.log(this.selectedMessage)

    this.arrOrderDetails=this.selectedMessage;
    console.log(this.arrOrderDetails)

  }

}
