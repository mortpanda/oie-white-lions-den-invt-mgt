import { Component, OnInit } from '@angular/core';
import {DataService} from 'app/shared/data-service/data.service';
import { Subject, BehaviorSubject, Observable,ReplaySubject } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inventory-popup',
  templateUrl: './inventory-popup.component.html',
  styleUrls: ['./inventory-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InventoryPopupComponent implements OnInit {
  selectedMessage:any;
  constructor(
    public DataService:DataService,
    public dialog: MatDialog,
  ) { }

  arrProductItem;
  async ngOnInit() {
    this.DataService.currentMessage.subscribe(message => (this.selectedMessage = message));

    console.log(this.selectedMessage)

    this.arrProductItem=this.selectedMessage;

  }


  
  OrderItem(){
    
    console.log(this.arrProductItem)
    
  }

  
}
