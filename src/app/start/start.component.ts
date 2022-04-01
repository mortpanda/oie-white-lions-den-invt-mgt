import { Component, OnInit } from '@angular/core';
import {OktaGetTokenService} from 'app/shared/okta/okta-get-token.service';
import { ViewEncapsulation } from '@angular/core';
import {AppList, appItems} from 'app/shared/app-list/app-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StartComponent implements OnInit {
  appItems = appItems;
  constructor(
    public OktaGetTokenService:OktaGetTokenService,
  ) { }

  async ngOnInit() {
    this.OktaGetTokenService.GetAccessToken()
  }

}
