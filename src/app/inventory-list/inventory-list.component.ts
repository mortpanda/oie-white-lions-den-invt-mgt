import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaConfigService } from 'app/shared/okta/okta-config.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth } from '@okta/okta-auth-js'
import { ProductStock, ProductItems } from 'app/shared/product-stock/product-stock';
import {OktaGetTokenService} from 'app/shared/okta/okta-get-token.service';

const ELEMENT_DATA = ProductItems;

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InventoryListComponent implements OnInit {
  private authService = new OktaAuth(this.OktaSDKAuthService.config);

  
  dataSource = ELEMENT_DATA;
  // displayedColumns: string[] = ['name', 'desc', 'manu', 'itemcode'];

  displayedColumns: string[] = ['name','manu','desc','itemcode'];
  
  constructor(
    public OktaGetTokenService:OktaGetTokenService,
    public OktaConfigService: OktaConfigService,
    private OktaSDKAuthService: OktaSDKAuthService
  ) { }

  strUserSession: Boolean;

  async ngOnInit() {

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
      // await window.location.replace(this.OktaConfigService.strPostLogoutURL);
      case true:
        // User is logged in
        this.OktaGetTokenService.GetAccessToken()
        break;
    }
  }

}
