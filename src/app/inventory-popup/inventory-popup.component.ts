import { Component, OnInit } from '@angular/core';
import {DataService} from 'app/shared/data-service/data.service';
import { Subject, BehaviorSubject, Observable,ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-inventory-popup',
  templateUrl: './inventory-popup.component.html',
  styleUrls: ['./inventory-popup.component.css']
})
export class InventoryPopupComponent implements OnInit {
  selectedMessage:any;
  constructor(
    public DataService:DataService,
  ) { }

  testMsg;
  async ngOnInit() {
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));

    console.log(this.selectedMessage)
  }

}
